import { FC } from 'react';
import { InfiniteScroller } from '../../components/InfiniteScroller/InfiniteScroller.tsx';
import { useCommentOverlayWidth } from '../../hooks/useCommnetOverlayWidth.ts';
import { CommentOverlay } from './CommentOverlay.tsx';

const Home: FC = () => {
  console.log('[rerender] Home');
  const commentOverlayProps = useCommentOverlayWidth();

  return (
    <div
      style={{
        paddingInlineEnd: commentOverlayProps.hidden ? 0 : commentOverlayProps.width,
        transition: 'padding-inline-end 0.3s cubic-bezier(0, 0.5, 0.2, 1)',
      }}
    >
      <InfiniteScroller className="w-full"></InfiniteScroller>
      <CommentOverlay
        width={commentOverlayProps.width}
        style={{
          right: commentOverlayProps.hidden ? -commentOverlayProps.width : 0,
          transition: 'right 0.3s cubic-bezier(0, 0.5, 0.2, 1), width 0.3s cubic-bezier(0, 0.5, 0.2, 1)',
        }}
      ></CommentOverlay>
    </div>
  );
};

export { Home };
