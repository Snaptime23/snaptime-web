import { CSSProperties, FC, useEffect, useRef, useState } from 'react';
import { IoMusicalNotesOutline } from 'react-icons/io5';
import styles from './CommentOverlay.module.scss';

const CommentOverlay: FC<{ style?: CSSProperties; width: number }> = (props) => {
  return (
    <div
      style={{
        width: props.width,
        ...props.style,
      }}
      className={`debug-outline bg-white ${styles['comment-overlay']}`}
    >
      <VideoInfo></VideoInfo>
      <div className="operation-container h-9 w-10"></div>
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
        <button className="h-[76%] w-[90px] rounded-2xl bg-red-500 text-lg font-medium">Follow</button>
      </div>
      <div className="relative flex flex-col gap-2 text-black">
        <div ref={titleLabelContainer} className={showMoreParentClassName}>
          <span className="mr-1 font-semibold">123</span>
          {videoLabel.map((label, index) => {
            return (
              <a key={index} className="mr-1 cursor-pointer px-1 hover:underline">
                {'#' + label}
              </a>
            );
          })}
          {isOverflowed && (
            <button className="rounded-2x absolute right-0 top-[-3px] text-lg font-medium" onClick={showMoreLabel}>
              more
            </button>
          )}
        </div>
        {
          // 如果有展开按钮，则显示展开按钮
          isShowMoreLabel && (
            <div className="mt-[-10px]">
              <button className="rounded-2x text-lg font-medium" onClick={showLessLabel}>
                less
              </button>
            </div>
          )
        }
        <div className="flex flex-row items-center">
          <IoMusicalNotesOutline className="relative top-[1px]" size={20}></IoMusicalNotesOutline>
          <span className="h-full w-[250px] overflow-hidden text-ellipsis whitespace-nowrap">
            这是一首很长很长很长很长很长长很长很长的歌
          </span>
        </div>
      </div>
    </div>
  );
};

export { CommentOverlay };
