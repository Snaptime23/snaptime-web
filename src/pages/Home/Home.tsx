import { FC } from 'react';
import { InfiniteScroller } from '../../components/InfiniteScroller/InfiniteScroller.tsx';
import { CommentOverlay } from './CommentOverlay.tsx';

const Home: FC = () => {
  console.log('[rerender] Home');

  return (
    <div
      style={{
        transition: 'padding-inline-end 0.3s cubic-bezier(0, 0.5, 0.2, 1)',
      }}
      className="pe-0 md:pe-[calc(100vw-660px)] lg:pe-[600px]"
    >
      <InfiniteScroller className="w-full"></InfiniteScroller>
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
