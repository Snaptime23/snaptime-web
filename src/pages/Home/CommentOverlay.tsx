import { CSSProperties, FC, useEffect, useRef, useState } from 'react';
import {
  IoHeartOutline,
  IoHeartSharp,
  IoMusicalNotesOutline,
  IoShareSocialSharp,
  IoStar,
  IoStarOutline,
} from 'react-icons/io5';
import { Message } from '../../utils/common.ts';
import styles from './CommentOverlay.module.scss';

// 评论区域最小宽度 400px, 最大宽度 600px
// viewport 小于 sm 时评论区隐藏, 大于 lg 时评论区宽度固定
// 在 sm 和 lg 之间时视频宽度固定, 评论区大小变化
const CommentOverlay: FC<{ style?: CSSProperties; className?: string }> = (props) => {
  return (
    <div
      style={{
        ...props.style,
      }}
      className={`debug-outline bg-white ${styles['comment-overlay']} ${props.className}`}
    >
      <VideoInfo></VideoInfo>
      <Operation></Operation>
      <div className="comments-videos-container"></div>
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
  const [videoLabel] = useState(['123', '456', '789', '123', '456', '789', '123', '456', '789', '123', '456', '789']);
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
    <div className="ml-[10px] mr-[10px] mt-[10px] flex select-none flex-col gap-3 rounded-2xl bg-slate-200/[0.5] p-4">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center justify-center gap-3">
          <img src="/mock/avatar.png" className="h-10 w-10 rounded-full object-cover"></img>
          <div className="flex w-[180px] flex-col">
            <a className="cursor-pointer select-text overflow-hidden text-ellipsis whitespace-nowrap text-xl font-semibold text-black hover:text-black hover:underline">
              userNameuserNameuserNameuserNameusdandka范吉奥批发价-pjerNameuserName
            </a>
            <span className="select-text overflow-hidden text-ellipsis whitespace-nowrap text-black">
              biobiobiobiobiobiobiobiobiobiobiobiobiobiobiobio去恶趣味请问的biobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobio
            </span>
          </div>
        </div>
        <button className="h-[76%] w-[90px] rounded-2xl bg-red-500 text-lg font-medium text-white">Follow</button>
      </div>
      <div className="relative flex flex-col gap-2 text-black">
        <div ref={titleLabelContainer} className={showMoreParentClassName}>
          <span className="mr-[5px] text-xl font-semibold">123</span>
          {videoLabel.map((label, index) => {
            return (
              <a key={index} className="mr-[5px] cursor-pointer text-xl hover:underline">
                {'#' + label}
              </a>
            );
          })}
          {isOverflowed && (
            <button
              className="rounded-2x absolute right-0 top-[-3px] bg-slate-100/[0.5] text-lg font-medium"
              onClick={showMoreLabel}
            >
              more
            </button>
          )}
        </div>
        {
          // 如果有展开按钮，则显示展开按钮
          isShowMoreLabel && (
            <div className="mt-[-10px]">
              <button className="rounded-2x bg-slate-100/[0.5] text-lg font-medium" onClick={showLessLabel}>
                less
              </button>
            </div>
          )
        }
        <div className="flex flex-row items-center">
          <IoMusicalNotesOutline className="relative top-[1px]" size={20}></IoMusicalNotesOutline>
          <a className="ml-1 h-full cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap text-black hover:text-black">
            这是一首很长很长很长很长很长长很长很长的歌
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
      <div className="ml-[10px] mr-[10px] flex select-none flex-row items-center gap-3 p-4 text-black">
        <div className="flex flex-row items-center justify-center">
          <div className="rounded-full bg-slate-200/[0.5] p-1">
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
          <span className="ml-1">123K</span>
        </div>
        <div className="flex flex-row items-center justify-center">
          <div className="rounded-full bg-slate-200/[0.5] p-1">
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
          <span className="ml-1">2.2M</span>
        </div>
        <div className="rounded-full bg-slate-200/[0.5] p-1">
          <IoShareSocialSharp size={24} color={'#000000'}></IoShareSocialSharp>
        </div>
      </div>
      <div className="ml-[10px] mr-[10px] flex items-center justify-between rounded-lg bg-slate-200/[0.5] pb-1 pl-4 pr-4 pt-1 text-black">
        <span className="flex flex-1 items-center overflow-hidden text-ellipsis whitespace-nowrap leading-[37px] text-black">
          {localUrl}
        </span>
        <button className="ml-2 w-[85px] bg-slate-100/[0.5] text-lg font-medium" onClick={copyLocalurl}>
          Copy Link
        </button>
      </div>
    </>
  );
};

export { CommentOverlay };
