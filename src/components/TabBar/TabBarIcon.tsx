import { AlertProps, Modal, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useQueryClient } from '@tanstack/react-query';
import { FC, ReactNode, forwardRef, useEffect, useState } from 'react';
import { BiVideoPlus } from 'react-icons/bi';
import { useLocation } from 'react-router-dom';
import { useUserInfo } from '../../hooks/useUserInfo.ts';
import { VideoUploadModal } from '../VideoUploader/VideoUploadModal.tsx';
import { useAlwaysUseDarkTabbar } from './useIsAlwaysDarkTabbar.ts';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const TabBarIcon: FC<{
  icon?: ReactNode;
  label?: string;
  align?: 'vertical' | 'horizontal';
  onClick?: () => void;
}> = (props) => {
  const alwaysDark = useAlwaysUseDarkTabbar();
  return (
    <div
      className={
        'flex items-center gap-[2px] text-pink-700 dark:text-pink-200' +
        ' ' +
        (props.align === 'horizontal' ? 'h-[60px] flex-row' : 'w-[60px] flex-col') +
        ' ' +
        (alwaysDark && '!text-pink-200')
      }
      onClick={props.onClick}
    >
      {props.icon}
      <div className="break-all text-center text-sm">{props.label}</div>
    </div>
  );
};

const NewVideoIconMobile: FC<{ onClick?: () => void }> = (props) => {
  return (
    <div className={'flex flex-col items-center'} onClick={props.onClick}>
      <div className="rounded-md bg-pink-600 px-[10px] py-[2px] text-white">
        <BiVideoPlus size={32}></BiVideoPlus>
      </div>
      {/* <div className="-mt-[2px] whitespace-nowrap text-[50%] text-xs text-white">New Snap</div> */}
    </div>
  );
};

const NewVideoIconDesktop: FC<{ onClick?: () => void }> = (props) => {
  const [snackBaropen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const location = useLocation();
  const alwaysDark = useAlwaysUseDarkTabbar();
  const queryClient = useQueryClient();
  const userInfo = useUserInfo();

  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };
  useEffect(() => {
    setModalOpen(false);
  }, [location]);

  return (
    <>
      <div
        className={'flex cursor-pointer select-none flex-col items-center justify-center'}
        onClick={() => {
          handleOpen();
          props.onClick?.();
        }}
      >
        <div className="flex h-[56px] w-[56px] flex-col items-center justify-center rounded-full bg-pink-600 text-white">
          <BiVideoPlus size={32}></BiVideoPlus>
        </div>
        <div className={`mt-[4px] text-sm text-pink-600 ${alwaysDark && '!text-pink-200'}`}>Upload</div>
      </div>
      <Modal open={modalOpen} onClose={handleClose}>
        <VideoUploadModal
          onSuccess={(data) => {
            console.log(data);
            handleClose();
            props.onClick?.();
            setSnackBarMessage(`Video '${data.videoTitle}' Uploaded Successfully`);
            setSnackBarOpen(true);
            setTimeout(() => {
              void queryClient.invalidateQueries({ queryKey: ['profile-page-video-list', userInfo?.user_id ?? ''] });
            }, 3000);
            setTimeout(() => {
              void queryClient.invalidateQueries({ queryKey: ['profile-page-video-list', userInfo?.user_id ?? ''] });
            }, 10000);
          }}
          onClose={handleClose}
        ></VideoUploadModal>
      </Modal>
      <Snackbar
        open={snackBaropen}
        autoHideDuration={5000}
        onClose={() => {
          setSnackBarOpen(false);
        }}
      >
        <Alert severity="success">{snackBarMessage}</Alert>
      </Snackbar>
    </>
  );
};

export { NewVideoIconDesktop, NewVideoIconMobile, TabBarIcon };
