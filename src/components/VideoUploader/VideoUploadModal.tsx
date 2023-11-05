import { Box, Typography } from '@mui/material';
import { forwardRef } from 'react';
import { VideoUploader } from './VideoUploader.tsx';

const VideoUploadModal = forwardRef<
  HTMLDivElement,
  {
    onSuccess?: (data: { videoId: string; videoTitle: string }) => void;
  }
>(function VideoUploadModal(props, ref) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="mx-4 w-[800px] overflow-clip rounded-lg" ref={ref} tabIndex={-1}>
        <Box
          sx={{
            width: '100%',
            bgcolor: 'background.paper',
            padding: 3,
          }}
        >
          <div className="flex flex-col">
            <Typography variant="h6" component="h2">
              Upload Video
            </Typography>
            <Typography variant="caption" component="h2">
              Drag video to upload
            </Typography>
            <div className="h-3"></div>
            <VideoUploader onSuccess={props.onSuccess}></VideoUploader>
          </div>
        </Box>
      </div>
    </div>
  );
});

export { VideoUploadModal };
