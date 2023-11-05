import { FC } from 'react';
import { InfiniteVideoScroller } from '../../components/InfiniteVideoScroller/InfiniteVideoScroller.tsx';
import { CommentOverlay } from './CommentOverlay.tsx';

const Home: FC = () => {
  return (
    <div
      style={{
        transition: 'padding-inline-end 0.3s cubic-bezier(0, 0.5, 0.2, 1)',
      }}
      className="pe-0 md:pe-[calc(100vw-660px)] lg:pe-[600px]"
    >
      <InfiniteVideoScroller className="w-full"></InfiniteVideoScroller>
      <CommentOverlay
        className="-right-[400px] w-[400px] md:right-0 md:w-[calc(100vw-660px)] lg:w-[600px]"
        style={{
          transition: 'right 0.3s cubic-bezier(0, 0.5, 0.2, 1), width 0.3s cubic-bezier(0, 0.5, 0.2, 1)',
        }}
      ></CommentOverlay>
    </div>
  );
};

export { Home };
