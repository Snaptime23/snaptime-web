import { FC } from 'react';
import { VideoCover } from './VideoCover.tsx';
import styles from './VideoList.module.scss';

const mock = Array.from({ length: 100 }).map((_) => {
  return '/mock/avatar.png';
});

const VideoList: FC = () => {
  return (
    <div>
      <div className={`${styles['grid-container']} w-full flex-1`}>
        {mock.map((_, index) => {
          return <VideoCover key={index}></VideoCover>;
        })}
      </div>
      <div className="m-auto w-fit py-2 opacity-60">The End 👀</div>
    </div>
  );
};

export { VideoList };
