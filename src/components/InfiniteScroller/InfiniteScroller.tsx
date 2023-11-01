import { CSSProperties, FC, useEffect, useRef } from 'react';
import { IoChevronDownSharp, IoChevronUpSharp } from 'react-icons/io5';
import { useOnGlobalKeyDown } from '../../hooks/useOnGlobalKeyDown.ts';
import styles from './InfiniteScroller.module.scss';
import { ScrollContent } from './ScrollContent.tsx';

const InfiniteScroller: FC<{ className?: string; styles?: CSSProperties }> = (props) => {
  const videoScrollerRef = useRef<HTMLDivElement>(null);

  useOnGlobalKeyDown((e) => {
    console.log(e);
    if (!videoScrollerRef.current) return;
    if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
    videoScrollerRef.current.scrollTo({
      top:
        e.key === 'ArrowUp'
          ? videoScrollerRef.current.scrollTop - (window.innerHeight * 1.3 + 40)
          : videoScrollerRef.current.scrollTop + window.innerHeight * 1.3 + 40,
      behavior: 'smooth',
    });
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
    <div className={props.className + ' ' + 'relative h-[100dvh] pb-[56px] sm:pb-0'} style={props.styles}>
      <div className={`h-full w-full overflow-scroll ${styles.snapped}`} ref={videoScrollerRef}>
        <ScrollContent></ScrollContent>
      </div>
      <div className="fixed bottom-[56px] right-0 mb-4 me-4 flex flex-col gap-6 sm:bottom-0">
        <IoChevronUpSharp size={32}></IoChevronUpSharp>
        <IoChevronDownSharp size={32}></IoChevronDownSharp>
      </div>
    </div>
  );
};

export { InfiniteScroller };
