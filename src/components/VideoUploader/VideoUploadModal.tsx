import { Close } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { forwardRef } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { VideoUploader } from './VideoUploader.tsx';

const VideoUploadModal = forwardRef<
  HTMLDivElement,
  {
    onSuccess?: (data: { videoId: string; videoTitle: string }) => void;
    onClose?: () => void;
  }
>(function VideoUploadModal(props, ref) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="mx-4 w-[800px] overflow-clip rounded-lg" ref={ref} tabIndex={-1}>
        <Box
          sx={{
            width: '100%',
            bgcolor: 'Background',
            padding: 3,
          }}
        >
          <div className="flex flex-col">
            <div className="flex flex-row justify-between">
              <Typography variant="h6" component="h2">
                Upload Video
              </Typography>
              <IconButton onClick={props.onClose}>
                <Close></Close>
              </IconButton>
            </div>
            <Typography variant="caption" component="h2">
              Drag video to upload
            </Typography>
            <div className="h-3"></div>
            <ErrorBoundary fallback={<div>Error Rendering Video Uploader</div>}>
              <VideoUploader onSuccess={props.onSuccess}></VideoUploader>
            </ErrorBoundary>
          </div>
        </Box>
      </div>
    </div>
  );
});

export { VideoUploadModal };
