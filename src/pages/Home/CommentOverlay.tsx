import { CSSProperties, FC } from 'react';
import styles from './CommentOverlay.module.scss';

const CommentOverlay: FC<{ style?: CSSProperties; width: number }> = (props) => {
  return (
    <div
      style={{
        width: props.width,
        ...props.style,
      }}
      className={`debug-outline ${styles['comment-overlay']}`}
    >
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, laborum quas, quisquam minus corrupti quidem
        architecto ullam quo rerum ratione, rem optio. Quidem maxime provident odit, ab non eaque placeat?
      </p>
    </div>
  );
};

export { CommentOverlay };
