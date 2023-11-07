import { Chat, Favorite, Share, Star } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useMediaQuery } from 'usehooks-ts';
import { Message } from '../../utils/common.ts';
import { CommentVideos } from '../CommentsVideos/CommentsVideos.tsx';
import styles from './MobileOperation.module.scss';

const MobileOperation: FC<{
  isOverfloweHiddenHandel: (isOverfloweHidden: boolean) => void;
}> = ({ isOverfloweHiddenHandel }) => {
  const isMobile = useMediaQuery('(max-width: 540px)');
  const [commentBottom, setCommentBottomInView] = useState(-window.innerHeight * 0.7);
  const hiddenComment = () => {
    setCommentBottomInView(-window.innerHeight * 0.7);
    isOverfloweHiddenHandel(false);
  };
  const showComment = () => {
    console.debug('show');
    setCommentBottomInView(0);
    isOverfloweHiddenHandel(true);
  };
  const [isLiked, setIsLiked] = useState(false);
  const likeVideo = () => {
    console.debug('like');
    setIsLiked(!isLiked);
  };
  const [isCollected, setIsCollected] = useState(false);
  const collectVideo = () => {
    console.debug('collect');
    setIsCollected(!isCollected);
  };
  const [localUrl, setLocalUrl] = useState('');
  useEffect(() => {
    // 获取当前teb的地址
    let url = window.location.href;
    setLocalUrl(url);
  }, []);
  const copyLocalurl = () => {
    // 复制当前地址
    try {
      navigator.clipboard.writeText(localUrl).catch((e) => {
        console.debug(e);
      });
      Message({ message: 'copy success', duration: 2000 }).catch((e) => {
        console.debug(e);
      });
    } catch (e) {
      if (e instanceof Error) {
        Message({ message: e.message, duration: 2000 }).catch((e) => {
          console.debug(e);
        });
      }
    }
  };
  return (
    <>
      {isMobile ? (
        <div className="absolute bottom-12 right-0 z-[100] mb-4 me-4 flex flex-col items-center gap-4 sm:bottom-0">
          <div className="mb-1 flex flex-col items-center justify-center text-black">
            <img src="/mock/avatar.png" alt="avatar" className="relative top-[-8px] h-[46px] w-[46px] rounded-full" />
          </div>
          <IconButton
            onClick={likeVideo}
            className={`!transition-colors !ease-[cubic-bezier(0,1,0,5,1)] ${
              isLiked ? '!text-pink-500' : '!text-white'
            }`}
            color="inherit"
          >
            <Favorite className="!text-[46px]" />
          </IconButton>
          <IconButton
            onClick={collectVideo}
            className={`!relative top-[-7px] !transition-colors !ease-[cubic-bezier(0,1,0,5,1)] ${
              isCollected ? '!text-yellow-300' : '!text-white'
            }`}
            color="inherit"
          >
            <Star className="!text-[48px]" />
          </IconButton>
          <IconButton onClick={showComment} color="inherit">
            <Chat className="!text-[40px]" />
          </IconButton>
          <IconButton onClick={copyLocalurl} color="inherit">
            <Share className="!text-[40px]" />
          </IconButton>
        </div>
      ) : null}
      {!isMobile ? null : (
        <>
          <div
            className={
              'absolute bottom-0 left-0 z-[101] h-[0dvh] w-full overflow-y-auto overscroll-contain rounded-tl-2xl rounded-tr-2xl bg-white bg-gradient-to-t to-transparent transition-all duration-700'
            }
            style={{
              bottom: commentBottom,
              height: window.innerHeight * 0.7 + commentBottom,
            }}
          >
            <div className="sticky top-0 z-[2] flex w-[100%] flex-row items-center justify-between bg-transparent bg-white">
              <div className="flex h-[70px] items-center justify-center pl-8 text-xl font-bold text-black">
                Comments
              </div>
              <button
                className={`${styles['close-button']} bg-transparent pb-[15px] pl-[100px] pr-[15px] pt-[15px]`}
                onClick={hiddenComment}
              >
                <div
                  className={`${styles['button-div']} flex h-[40px] w-[40px] items-center justify-center rounded-full bg-slate-200`}
                >
                  <IoClose color={'#000000'} size={30}></IoClose>
                </div>
              </button>
            </div>
            <CommentVideos></CommentVideos>
          </div>
        </>
      )}
    </>
  );
};

export { MobileOperation };
