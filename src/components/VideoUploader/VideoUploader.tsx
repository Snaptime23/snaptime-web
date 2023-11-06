import { LinearProgress } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { FC, forwardRef, useCallback, useEffect, useState } from 'react';
import { useCompleteMeta } from '../../api/videoUpload/completeMeta.ts';
import { DragAndDropArea } from './DragAndDropArea.tsx';
import { UploadVideoFormData, VideoUploaderForm } from './VideoUploaderForm.tsx';
import { useUploadFile } from './uploadFile.ts';

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
  const [snackBarMessage, setSnackBarMessage] = useState<string | null>(null);
  const completeMeta = useCompleteMeta();
  const uploadFile = useUploadFile();

  const openSnackBar = useCallback((message: string) => {
    setSnackBarMessage(message);
    setSnackBarOpen(false);
    setSnackBarOpen(true);
  }, []);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      console.log(acceptedFiles);
      if (acceptedFiles.length !== 1) {
        console.warn('invalid file count');
        openSnackBar('Invalid file count');
        return;
      }
      const file = acceptedFiles[0];
      const fileExt = file.name.split('.').pop() ?? '';
      if (!['mp4', 'mov', 'avi', 'mkv'].includes(fileExt)) {
        console.warn('valid file extension');
        openSnackBar('Unsupported file type .' + fileExt);
        return;
      }
      setFile(file);
    },
    [openSnackBar]
  );

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
            openSnackBar('Failed to post video');
            setUploadState('failed');
          },
        }
      );
    },
    [completeMeta, file, openSnackBar, props, videoId]
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
        setSnackBarMessage('Failed to upload video');
        setSnackBarOpen(false);
        setSnackBarOpen(true);
      },
    });
  }, [file, uploadFile]);

  return (
    <>
      <div className="w-full">
        <div
          className="flex flex-col items-center justify-center rounded-[4px] border-2 border-slate-200 bg-slate-100
          dark:border-slate-800 dark:bg-slate-900"
          style={{
            height: file ? '100px' : '400px',
          }}
        >
          <DragAndDropArea onDrop={onDrop} droppedFileName={file?.name}></DragAndDropArea>
        </div>
        {fileBlobUrl && (
          <>
            {uploadState !== 'failed' && (
              <LinearProgress
                value={uploadProgress ?? undefined}
                variant={uploadProgress ? 'determinate' : 'indeterminate'}
                className="mt-[-4px] rounded-b-[4px]"
              ></LinearProgress>
            )}
            <video src={fileBlobUrl} controls className="mt-4 max-h-[400px] w-full rounded-[4px]"></video>
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
        autoHideDuration={5000}
        onClose={() => {
          setSnackBarOpen(false);
        }}
      >
        <Alert severity="error">{snackBarMessage}</Alert>
      </Snackbar>
    </>
  );
};

export { VideoUploader };
