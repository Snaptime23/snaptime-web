import { CSSProperties, FC, useEffect, useRef } from 'react';
import { IoChevronDownSharp, IoChevronUpSharp } from 'react-icons/io5';
import { useOnGlobalKeyDown } from '../../hooks/useOnGlobalKeyDown.ts';
import styles from './InfiniteScroller.module.scss';
import { ScrollContent } from './ScrollContent.tsx';

const InfiniteScroller: FC<{ className?: string; styles?: CSSProperties }> = (props) => {
  const videoScrollerRef = useRef<HTMLDivElement>(null);

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
    const videoScroller = videoScrollerRef.current;
    const scrollEndHandler = (e: Event) => {
      console.log(e);
    };
    const scrollHandler = (e: Event) => {
      console.debug(e);
    };
    const bodyPreventDefault = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
      e.preventDefault();
    };
    videoScroller?.addEventListener('scrollend', scrollEndHandler);
    videoScroller?.addEventListener('scroll', scrollHandler, { passive: true });
    document.body.addEventListener('keydown', bodyPreventDefault, { passive: false });
    return () => {
      videoScroller?.removeEventListener('scrollend', scrollEndHandler);
      videoScroller?.removeEventListener('scroll', scrollHandler);
      document.body.removeEventListener('keydown', bodyPreventDefault);
    };
  }, []);

  return (
    <div className={props.className + ' ' + 'h-[100dvh] pb-[56px] sm:pb-0'} style={props.styles}>
      <div className="relative h-full w-full">
        <div className={`h-full w-full overflow-scroll ${styles.snapped} ${styles.scroller}`} ref={videoScrollerRef}>
          <ScrollContent></ScrollContent>
        </div>
        <div className="absolute bottom-0 right-0 mb-4 me-4 flex flex-col gap-4 sm:bottom-0">
          <div
            className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white bg-opacity-20
              backdrop-blur-lg transition-all ease-[cubic-bezier(0,1,0.4,1)] hover:bg-opacity-60 active:bg-opacity-20"
            onClick={scrollToPrev}
          >
            <div className="mb-1 text-black">
              <IoChevronUpSharp size={32}></IoChevronUpSharp>
            </div>
          </div>
          <div
            className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white
              bg-opacity-20 backdrop-blur-lg transition-all ease-[cubic-bezier(0,1,0.4,1)] hover:bg-opacity-60 active:bg-opacity-20"
            onClick={scrollToNext}
          >
            <div className="-mb-1 text-black">
              <IoChevronDownSharp size={32}></IoChevronDownSharp>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { InfiniteScroller };
