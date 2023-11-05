import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import { FC, useState } from 'react';
import { TagsInput } from 'react-tag-input-component';
import './TagPicker.scss';

export interface UploadVideoFormData {
  title: string;
  description: string;
  tags: string[];
}
export type UploadHandler = (formData: UploadVideoFormData) => void | Promise<void>;

export const VideoUploaderForm: FC<{
  disabled?: boolean;
  onSubmit?: UploadHandler;
  uploading?: boolean;
  posting?: boolean;
}> = (props) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div className="flex flex-col gap-4">
      <TextField
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        disabled={props.disabled}
        label="Video Title"
        variant="outlined"
      />
      <TextField
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        disabled={props.disabled}
        multiline
        label="Video Description"
        variant="outlined"
        rows={4}
      />
      <TagsInput
        disabled={props.disabled}
        value={selectedTags}
        onChange={setSelectedTags}
        name="fruits"
        placeHolder="Enter Video Tags"
        classNames={{ input: '', tag: '' }}
      />
      <LoadingButton
        variant="contained"
        color="primary"
        disableElevation
        disabled={props.disabled === true || props.uploading === true || props.posting === true}
        onClick={() => {
          void props.onSubmit?.({
            title,
            description,
            tags: selectedTags,
          });
        }}
        loading={props.uploading === true}
      >
        Post
      </LoadingButton>
    </div>
  );
};
