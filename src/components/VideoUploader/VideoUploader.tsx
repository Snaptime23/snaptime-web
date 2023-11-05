import { LinearProgress } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { FC, forwardRef, useCallback, useEffect, useState } from 'react';
import { completeMeta } from '../../api/videoUpload/completeMeta.ts';
import { DragAndDropArea } from './DragAndDropArea.tsx';
import { UploadVideoFormData, VideoUploaderForm } from './VideoUploaderForm.tsx';
import { uploadFile } from './uploadFile.ts';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type uploadState = 'not_selected' | 'uploading' | 'failed' | 'uploaded' | 'posting';

const VideoUploader: FC<{ onSuccess?: (data: { videoId: string; videoTitle: string }) => void }> = (props) => {
  const [snackBaropen, setSnackBarOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileBlobUrl, setFileBlobUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadState, setUploadState] = useState<uploadState>('not_selected' as const);
  const [videoId, setVideoId] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
    if (acceptedFiles.length !== 1) {
      console.warn('invalid file count');
      setSnackBarOpen(true);
      return;
    }
    const file = acceptedFiles[0];
    const fileExt = file.name.split('.').pop() ?? '';
    if (!['mp4', 'mov', 'avi', 'mkv'].includes(fileExt)) {
      console.warn('valid file extension');
      setSnackBarOpen(true);
      return;
    }
    setFile(file);
  }, []);

  const onSubmit = useCallback(
    (data: UploadVideoFormData) => {
      if (!file || !videoId) {
        return;
      }
      setUploadState('posting');
      void completeMeta(
        {
          description: data.description,
          title: data.title,
          video_id: videoId,
          video_tags: data.tags,
        },
        {
          onComplete: () => {
            props.onSuccess?.({
              videoId,
              videoTitle: data.title,
            });
          },
          onFailed: () => {
            setUploadState('failed');
          },
        }
      );
    },
    [file, props, videoId]
  );

  // blob url effect
  useEffect(() => {
    if (!file) {
      setFileBlobUrl(null);
      return;
    }
    setUploadState('uploading');
    const blobUrl = URL.createObjectURL(file);
    setFileBlobUrl(blobUrl);
    return () => {
      URL.revokeObjectURL(blobUrl);
    };
  }, [file]);

  // upload effect
  useEffect(() => {
    if (!file) {
      return;
    }
    void uploadFile(file, {
      onProgress: setUploadProgress,
      onStart: (data) => {
        console.log(data);
        setVideoId(data.videoId);
      },
      onComplete: () => {
        setUploadState('uploaded');
      },
      onFailed: () => {
        setUploadState('failed');
      },
    });
  }, [file]);

  return (
    <>
      <div className="w-full">
        <div
          className="flex flex-col items-center justify-center rounded-[4px] border-2 border-slate-200 bg-slate-100"
          style={{
            height: file ? '100px' : '400px',
          }}
        >
          <DragAndDropArea onDrop={onDrop} droppedFileName={file?.name}></DragAndDropArea>
        </div>
        {fileBlobUrl && (
          <>
            <LinearProgress
              value={uploadProgress ?? undefined}
              variant={uploadProgress ? 'determinate' : 'indeterminate'}
              className="mt-[-4px] rounded-b-[4px]"
            ></LinearProgress>
            <video src={fileBlobUrl} controls className="mt-4 rounded-[4px]">
              Your browser does not support the video tag.
            </video>
          </>
        )}
        {file && (
          <>
            <div className="mt-4">
              <VideoUploaderForm
                uploading={uploadState !== 'uploaded'}
                posting={uploadState === 'posting'}
                onSubmit={onSubmit}
              ></VideoUploaderForm>
            </div>
          </>
        )}
      </div>
      <Snackbar
        open={snackBaropen}
        autoHideDuration={3000}
        onClose={() => {
          setSnackBarOpen(false);
        }}
      >
        <Alert severity="error">Invalid video. Please only drop one video file.</Alert>
      </Snackbar>
    </>
  );
};

export { VideoUploader };