import { Button, TextField } from '@mui/material';
import React, { CSSProperties, FC, useEffect, useRef, useState } from 'react';
import {
  IoHeartOutline,
  IoHeartSharp,
  IoMusicalNotesOutline,
  IoShareSocialSharp,
  IoStar,
  IoStarOutline,
} from 'react-icons/io5';
import { baseUrl } from '../../api/config.ts';
import { CommentVideos } from '../../components/CommentsVideos/CommentsVideos.tsx';
import { useUserInfo } from '../../hooks/useUserInfo.ts';
import { useListenEvent } from '../../store/emitter/emitter.ts';
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
            <div className="cursor-pointer select-text overflow-hidden text-ellipsis whitespace-nowrap break-all text-lg font-semibold text-black hover:text-black hover:underline">
              Lorem ipsum dolor sit, amet consectetur
            </div>
            <span className="-mt-[2px] select-text overflow-hidden text-ellipsis whitespace-nowrap text-sm text-black">
              非常非常非常非常長的個人介紹
            </span>
          </div>
        </div>
        <button className="rounded-xl bg-pink-600 px-4 py-[5px] text-lg font-medium text-white">Follow</button>
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
              className="rounded-2x absolute right-0 top-[-3px] bg-slate-100/[0.5] font-medium"
              onClick={showMoreLabel}
            >
              More
            </button>
          )}
        </div>
        {
          // 如果有展开按钮，则显示展开按钮
          isShowMoreLabel && (
            <div className="mt-[-10px]">
              <button className="rounded-2x bg-slate-100/[0.5] font-medium" onClick={showLessLabel}>
                Less
              </button>
            </div>
          )
        }
        <div className="flex flex-row items-center">
          <IoMusicalNotesOutline className="relative top-[1px]" size={24}></IoMusicalNotesOutline>
          <a className="ml-2 h-full cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap text-black hover:text-black">
            晴天的晴天的晴天 - 周周周周周傑倫
          </a>
        </div>
      </div>
    </div>
  );
};

const Operation: FC = () => {
  const [isLike, setIsLike] = useState(false);
  const [isStar, setIsStar] = useState(false);
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
        console.log(e);
      });
      Message({ message: 'copy success', duration: 2000 }).catch((e) => {
        console.log(e);
      });
    } catch (e) {
      if (e instanceof Error) {
        Message({ message: e.message, duration: 2000 }).catch((e) => {
          console.log(e);
        });
      }
    }
  };
  return (
    <>
      <div className="mx-[18px] flex select-none flex-row items-center justify-between gap-6 p-4 text-black">
        <div className="flex flex-row gap-6">
          <div className="flex flex-row items-center justify-center gap-2">
            <div className="rounded-full bg-slate-200/[0.5] p-[6px]">
              {
                // 如果已经点赞，则显示实心的心
                isLike ? (
                  <IoHeartSharp
                    className="cursor-pointer"
                    size={24}
                    color={'#FF0033'}
                    onClick={() => {
                      setIsLike(!isLike);
                    }}
                  ></IoHeartSharp>
                ) : (
                  <IoHeartOutline
                    className="cursor-pointer"
                    size={24}
                    color={'#000000'}
                    onClick={() => {
                      setIsLike(!isLike);
                    }}
                  ></IoHeartOutline>
                )
              }
            </div>
            <span>123K</span>
          </div>
          <div className="flex flex-row items-center justify-center gap-2">
            <div className="rounded-full bg-slate-200/[0.5] p-[6px]">
              {
                // 如果已经收藏，则显示实心的星星
                isStar ? (
                  <IoStar
                    className="cursor-pointer"
                    size={24}
                    color={'#FFCC33'}
                    onClick={() => {
                      setIsStar(!isStar);
                    }}
                  ></IoStar>
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
            </div>
            <span>2.2M</span>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center gap-2" onClick={copyLocalurl}>
          <div className="rounded-full bg-slate-200/[0.5] p-[6px]">
            <IoShareSocialSharp size={24} color={'#000000'}></IoShareSocialSharp>
          </div>
          <span className="pe-2">Share</span>
        </div>
      </div>
      <div className="mx-[34px] flex items-center justify-between rounded-xl border-[1px] bg-slate-200/[0.5] py-[2px] pl-4 pr-[2px] text-black">
        <div className="my-[4px] overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium text-black">
          {localUrl}
        </div>
        <button
          className="h-full rounded-lg bg-slate-100/[0.5] px-4 font-medium transition-colors hover:bg-white active:bg-slate-50"
          onClick={copyLocalurl}
        >
          Copy
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
      },
      body: JSON.stringify({
        ['video_id']: videoId,
        ['action_type']: 0,
        ['content']: comment,
        ['root_id']: '',
        ['parent_id']: '',
      }),
    }).catch((e) => {
      console.log(e);
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
          Log in to comment
        </Button>
      )}
    </div>
  );
};

export { CommentOverlay };
