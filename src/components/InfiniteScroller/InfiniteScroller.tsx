import { CSSProperties, FC, useEffect, useRef, useState } from 'react';
import { IoChevronDownSharp, IoChevronUpSharp } from 'react-icons/io5';
import { useOnGlobalKeyDown } from '../../hooks/useOnGlobalKeyDown.ts';
import { isSafari } from '../../utils/isSafari.ts';
import styles from './InfiniteScroller.module.scss';
import { ScrollContent, Video } from './ScrollContent.tsx';

const prevCount = 2;
const nextCount = 3;

const InfiniteScroller: FC<{ className?: string; styles?: CSSProperties }> = (props) => {
  const videoScrollerRef = useRef<HTMLDivElement>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);

  const [content, setContent] = useState<Video[]>(
    Array.from({ length: 1 + nextCount }).map((_, index) => ({ index }) satisfies Video)
  );

  const onVideoVisible = (id: number) => {
    setCurrentVideoIndex(id);
    console.log('visible', id);
  };

  const loadNewVideos = async () => {
    const lastId = content[content.length - 1].index;
    const newContent = Array.from({ length: 5 }).map((_, index) => ({ index: lastId + index + 1 }) satisfies Video);
    setContent((prev) => [...prev, ...newContent]);
  };

  const scrollToPrev = () => {
    if (!videoScrollerRef.current) return;
    videoScrollerRef.current.scrollTo({
      top: videoScrollerRef.current.scrollTop - (window.innerHeight * 1.3 + 40),
      behavior: 'smooth',
    });
  };

  const scrollToNext = () => {
    if (!videoScrollerRef.current) return;
    videoScrollerRef.current.scrollTo({
      top: videoScrollerRef.current.scrollTop + (window.innerHeight * 1.3 + 40),
      behavior: 'smooth',
    });
  };

  useOnGlobalKeyDown((e) => {
    console.log(e);
    if (!videoScrollerRef.current) return;
    if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
    e.key === 'ArrowUp' ? scrollToPrev() : scrollToNext();
  });

  useEffect(() => {
    // const videoScroller = videoScrollerRef.current;
    // const scrollEndHandler = (e: Event) => {
    //   console.log(e);
    //   const currentId = currentVideoIndex;
    //   let newStart = currentId - prevCount;
    //   if (newStart < 0) newStart = 0;
    //   const newEnd = currentId + nextCount;
    //   console.log(newStart, currentId, newEnd);
    //   if (content[content.length - 1].index === newEnd && content[0].index === newStart) return;
    //   const newContent = Array.from({ length: newEnd - newStart + 1 }).map(
    //     (_, index) => ({ index: newStart + index }) satisfies Video
    //   );
    //   console.log(newContent);
    //   setContent(newContent);
    // };
    const bodyPreventDefault = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
      e.preventDefault();
    };
    if (isSafari()) {
      // pass
    } else {
      // videoScroller?.addEventListener('scrollend', scrollEndHandler);
    }
    document.body.addEventListener('keydown', bodyPreventDefault, { passive: false });
    return () => {
      if (isSafari()) {
        // pass
      } else {
        // videoScroller?.removeEventListener('scrollend', scrollEndHandler);
      }
      document.body.removeEventListener('keydown', bodyPreventDefault);
    };
  }, [content, currentVideoIndex]);

  return (
    <div className={props.className + ' ' + 'h-[100dvh] pb-[56px] sm:pb-0'} style={props.styles}>
      <div className="relative h-full w-full">
        <div className={`h-full w-full overflow-scroll ${styles.snapped} ${styles.scroller}`} ref={videoScrollerRef}>
          <ScrollContent
            content={content}
            onVideoVisible={onVideoVisible}
            onLoadNewVideos={loadNewVideos}
            currentVideoIndex={currentVideoIndex}
          ></ScrollContent>
        </div>
        <div className="absolute bottom-0 right-0 z-50 mb-4 me-4 flex flex-col gap-4 sm:bottom-0">
          <button
            className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white bg-opacity-20
              backdrop-blur-lg transition-all ease-[cubic-bezier(0,1,0.4,1)] hover:bg-opacity-60 active:bg-opacity-20"
            onClick={scrollToPrev}
          >
            <div className="mb-1 text-black">
              <IoChevronUpSharp size={32}></IoChevronUpSharp>
            </div>
          </button>
          <button
            className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white
              bg-opacity-20 backdrop-blur-lg transition-all ease-[cubic-bezier(0,1,0.4,1)] hover:bg-opacity-60 active:bg-opacity-20"
            onClick={scrollToNext}
          >
            <div className="-mb-1 text-black">
              <IoChevronDownSharp size={32}></IoChevronDownSharp>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export { InfiniteScroller };
