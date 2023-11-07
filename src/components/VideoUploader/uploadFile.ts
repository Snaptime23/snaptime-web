import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getVideoUploadToken } from '../../api/videoUpload/getToken.ts';

const useUploadFile = () => {
  const navigate = useNavigate();

  const uploadFile = useCallback(
    async (
      file: File,
      callbacks?: {
        onStart?: (data: { videoId: string }) => void;
        onProgress?: (progress: number | null) => void;
        onComplete?: () => void;
        onFailed?: () => void;
      }
    ): Promise<void> => {
      callbacks?.onProgress?.(null);

      const tokenData = await getVideoUploadToken(
        {
          fileExtension: file.name.split('.').pop() ?? '',
        },
        {
          onRedirectLogin: () => navigate('/login'),
        }
      ).catch((e) => {
        console.debug(e);
        callbacks?.onFailed?.();
        throw e;
      });

      callbacks?.onStart?.({ videoId: tokenData.videoId });

      return new Promise<void>((resolve, reject) => {
        const formData = new FormData();
        formData.append('key', tokenData.resourceKey);
        formData.append('token', tokenData.token);
        formData.append('file', file as Blob);

        const xhr = new XMLHttpRequest();
        xhr.upload.onprogress = function (event) {
          if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            console.debug(`upload progress ${percentComplete}%`);
            callbacks?.onProgress?.(percentComplete);
          }
        };

        xhr.onload = function () {
          if (xhr.status === 200) {
            console.debug('upload complete');
            callbacks?.onComplete?.();
            try {
              const json = JSON.parse(xhr.responseText) as { code: number };
              if (json.code === 401) {
                navigate('/login');
              }
            } catch {
              // do nothing
            }
            resolve();
          } else if (xhr.status === 401) {
            console.debug('upload failed');
            callbacks?.onFailed?.();
            navigate('/login');
          } else {
            console.debug('upload failed');
            callbacks?.onFailed?.();
            reject(new Error('Upload failed'));
          }
        };

        xhr.onerror = function () {
          console.debug('upload error');
          callbacks?.onFailed?.();
          reject(new Error('Upload error'));
        };

        xhr.open('POST', 'https://upload-cn-east-2.qiniup.com/');
        xhr.send(formData);
      });
    },
    [navigate]
  );
  return uploadFile;
};
export { useUploadFile };
