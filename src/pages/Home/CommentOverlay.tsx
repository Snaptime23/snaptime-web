import { Button, IconButton, TextField, Typography } from '@mui/material';
import React, { CSSProperties, FC, useEffect, useRef, useState } from 'react';
import { IoHeartOutline, IoHeartSharp, IoShareSocialSharp, IoStar, IoStarOutline } from 'react-icons/io5';
import { baseUrl } from '../../api/config.ts';
import { CommentVideos } from '../../components/CommentsVideos/CommentsVideos.tsx';
import { useUserInfo } from '../../hooks/useUserInfo.ts';
import { useEmitter, useListenEvent } from '../../store/emitter/emitter.ts';
import { store, useAppDispatch } from '../../store/index.ts';
import { login } from '../../store/slices/loginState.ts';
import { Message } from '../../utils/common.ts';
import styles from './CommentOverlay.module.scss';

// 评论区域最小宽度 400px, 最大宽度 600px
// viewport 小于 sm 时评论区隐藏, 大于 lg 时评论区宽度固定
// 在 sm 和 lg 之间时视频宽度固定, 评论区大小变化
const CommentOverlay: FC<{ style?: CSSProperties; className?: string }> = (props) => {
  // const [videoId, setVideoId] = useState('');
  // const [rootId, setRootId] = useState('');
  const [isComment, setComments] = useState(false);
  return (
    <div
      style={{
        ...props.style,
      }}
      className={`${styles['comment-overlay-container']} ${props.className}`}
    >
      <div
        style={{
          ...props.style,
        }}
        className={`${styles['comment-overlay']} ${props.className}`}
      >
        <VideoInfo></VideoInfo>
        <Operation></Operation>
        <CommentVideos isCommentHandel={setComments}></CommentVideos>
      </div>
      <WriteComment isComment={isComment}></WriteComment>
    </div>
  );
};

const VideoInfo: FC = () => {
  // 为了检查是否出现省略号获取的父容器节点
  const titleLabelContainer = useRef<HTMLDivElement>(null);
  // 展开更多按钮的显示状态
  const [isOverflowed, setIsOverflowed] = useState(false);
  // 收起更多按钮的显示状态
  const [isShowMoreLabel, setIsShowMoreLabel] = useState(false);
  // 父容器类名
  const [showMoreParentClassName, setshowMoreParentClassName] = useState(
    'w-[76%] overflow-hidden text-ellipsis whitespace-nowrap'
  );
  const [videoLabel] = useState(['Game', 'Music', 'Video', 'Web', 'Golang', 'Qiniu', '七牛云', '犇犇牛科技']);
  useEffect(() => {
    const handleResize = () => {
      if (titleLabelContainer.current) {
        const isContentOverflowed = titleLabelContainer.current.clientWidth < titleLabelContainer.current.scrollWidth;
        setIsOverflowed(isContentOverflowed);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [titleLabelContainer]);
  const showMoreLabel = () => {
    setshowMoreParentClassName('w-[76%] whitespace-pre-wrap break-words');
    setIsOverflowed(false);
    setIsShowMoreLabel(true);
  };
  const showLessLabel = () => {
    setshowMoreParentClassName('w-[76%] overflow-hidden text-ellipsis whitespace-nowrap');
    setIsOverflowed(true);
    setIsShowMoreLabel(false);
  };
  return (
    <div className="ml-[18px] mr-[18px] mt-[10px] flex select-none flex-col gap-3 rounded-2xl bg-slate-200/[0.5] p-4">
      <div className="flex w-full flex-row items-center">
        <div className="flex min-w-0 flex-1 flex-row items-center justify-start gap-3">
          <img src="/mock/avatar.png" className="h-12 w-12 rounded-full object-cover"></img>
          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="cursor-pointer select-text overflow-hidden text-ellipsis whitespace-nowrap break-all text-lg font-semibold text-black transition-colors hover:text-pink-800">
              犇犇牛科技
            </div>
            <span className="-mt-[2px] select-text overflow-hidden text-ellipsis whitespace-nowrap text-sm text-black">
              其实地上本没有路，走的人多了，也便成了路。
            </span>
          </div>
        </div>
        <button className="rounded-lg bg-pink-600 px-5 py-[5px] font-medium text-white transition-colors hover:bg-pink-500 active:bg-pink-700">
          关注
        </button>
      </div>
      <div className="relative flex flex-col gap-2 px-[4px] pl-[4px] text-black">
        <div ref={titleLabelContainer} className={showMoreParentClassName}>
          <span className="mr-[5px] font-semibold">123</span>
          {videoLabel.map((label, index) => {
            return (
              <a key={index} className="mr-[6px] cursor-pointer whitespace-nowrap break-words hover:underline">
                {'#' + label}
              </a>
            );
          })}
          {isOverflowed && (
            <button
              className="rounded-2x absolute right-0 top-[-3px] mt-[2px] h-full bg-slate-100/[0.5] text-sm font-medium"
              onClick={showMoreLabel}
            >
              展开
            </button>
          )}
        </div>
        {
          // 如果有展开按钮，则显示展开按钮
          isShowMoreLabel && (
            <div className="mt-[-10px]">
              <button className="rounded-2x mt-2 bg-slate-100/[0.5] text-sm font-medium" onClick={showLessLabel}>
                收起
              </button>
            </div>
          )
        }
      </div>
    </div>
  );
};

const Operation: FC = () => {
  const emitter = useEmitter();
  const [isLike, setIsLike] = useState(false);
  const [isStar, setIsStar] = useState(false);
  const [currentOrigin, setLocalUrl] = useState('');
  const [videoId, setVideoId] = useState<string>('-');

  useListenEvent('activeVideoChange', (data) => {
    setVideoId(data.videoId);
  });

  useEffect(() => {
    // 获取当前teb的地址
    let url = window.location.origin;
    setLocalUrl(url);
  }, []);
  const copyLocalurl = () => {
    // 复制当前地址
    try {
      navigator.clipboard.writeText(currentOrigin + '/share/' + videoId).catch((e) => {
        console.debug(e);
      });
      emitter.emit('openSnackbar', { message: '复制成功', severity: 'success' });
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
      <div className="mx-[18px] flex select-none flex-row items-center justify-between gap-6 p-4 text-black">
        <div className="flex flex-row gap-6">
          <div className="flex flex-row items-center justify-center gap-2">
            <IconButton
              className="!bg-slate-100"
              onClick={() => {
                setIsLike(!isLike);
              }}
            >
              {
                // 如果已经点赞，则显示实心的心
                isLike ? (
                  <IoHeartSharp size={24} color={'#C93B76'}></IoHeartSharp>
                ) : (
                  <IoHeartOutline size={24} color={'#000000'}></IoHeartOutline>
                )
              }
            </IconButton>
            <span className="w-8">{isLike ? 337 : 336}</span>
          </div>
          <div className="flex flex-row items-center justify-center gap-2">
            <IconButton
              className="!bg-slate-100"
              onClick={() => {
                setIsStar(!isStar);
              }}
            >
              {
                // 如果已经收藏，则显示实心的星星
                isStar ? (
                  <IoStar className="cursor-pointer" size={24} color={'#f6c123'}></IoStar>
                ) : (
                  <IoStarOutline
                    className="cursor-pointer"
                    size={24}
                    color={'#000000'}
                    onClick={() => {
                      setIsStar(!isStar);
                    }}
                  ></IoStarOutline>
                )
              }
            </IconButton>
            <span className="w-[100px] whitespace-nowrap">38.3 K</span>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center gap-2" onClick={copyLocalurl}>
          <IconButton className="!bg-slate-100">
            <IoShareSocialSharp size={24} color={'#000000'}></IoShareSocialSharp>
          </IconButton>
          <span className="pe-2">分享</span>
        </div>
      </div>
      <div className="mx-[34px] flex items-center justify-between rounded-xl border-[1px] bg-slate-200/[0.5] py-[2px] pl-4 pr-[2px] text-black">
        <div className="my-[4px] line-clamp-1 overflow-hidden whitespace-nowrap text-sm font-medium text-black">
          <Typography variant="body2" className="overflow-ellipsis">
            {currentOrigin + '/share/' + videoId}
          </Typography>
        </div>
        <button
          className="h-full min-w-[60px] rounded-lg bg-slate-100/[0.5] px-4 text-sm font-medium transition-colors hover:bg-white active:bg-slate-50"
          onClick={copyLocalurl}
        >
          复制
        </button>
      </div>
    </>
  );
};

const WriteComment: FC<{ isComment: boolean }> = ({ isComment }) => {
  const [comment, setComment] = useState('');
  let videoId = '';
  useListenEvent('activeVideoChange', (data) => {
    if ('videoId' in data) {
      videoId = data.videoId;
    }
  });
  const dispatch = useAppDispatch();
  const checkLogin = () => {
    dispatch(login());
  };
  const userInfo = useUserInfo();
  const createCommnet = () => {
    const authState = store.getState().auth;
    fetch(`${baseUrl}/api/comment/create`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authState.authKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ['video_id']: videoId,
        ['action_type']: 0,
        ['content']: comment,
        ['root_id']: '',
        ['parent_id']: '',
      }),
    }).catch((e) => {
      console.debug(e);
    });
  };
  const setCommentHandel = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };
  return (
    <div className="absolute bottom-0 w-full">
      {userInfo ? (
        <div className="flex flex-row items-center gap-2 border-t-[1px] bg-white px-4 py-2">
          <TextField
            focused={isComment ? true : false}
            className="flex-1"
            placeholder="请友好发言~"
            title="发射评论"
            label="发射评论"
            onChange={setCommentHandel}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                createCommnet();
              }
            }}
          />
          <Button disableElevation variant="contained" className="h-[56px] !px-8" onClick={createCommnet}>
            评论
          </Button>
        </div>
      ) : (
        <Button
          className="w-full"
          variant="contained"
          disableElevation
          sx={{
            borderRadius: 0,
            paddingBlock: 2,
          }}
          onClick={checkLogin}
        >
          登录以发表评论
        </Button>
      )}
    </div>
  );
};

export { CommentOverlay };
