import { Typography } from '@mui/material';
import { FC } from 'react';
import { useDropzone } from 'react-dropzone';
import { BiSolidVideos } from 'react-icons/bi';
import { FiUpload } from 'react-icons/fi';

const DragAndDropArea: FC<{ onDrop: (files: File[]) => void; droppedFileName?: string }> = (props) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: props.onDrop });
  return (
    <div
      {...getRootProps()}
      className="flex h-full w-full select-none flex-col items-center justify-center transition-colors"
      style={{
        backgroundColor: isDragActive ? '#cccccc' : 'inherit',
      }}
    >
      <input {...getInputProps()}></input>
      {props.droppedFileName ? (
        <>
          <BiSolidVideos size={48} className="mb-2 opacity-50"></BiSolidVideos>
          <Typography variant="subtitle2" className="opacity-50" component="div">
            {props.droppedFileName}
          </Typography>
        </>
      ) : (
        <>
          <FiUpload size={48} className="mb-2 opacity-50"></FiUpload>
          <Typography className="opacity-50" component="div">
            {isDragActive ? <p>Drop the video here ...</p> : <p>Drag and drop video here, or click to select files</p>}
          </Typography>
        </>
      )}
    </div>
  );
};

export { DragAndDropArea };
