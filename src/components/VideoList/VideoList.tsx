import { useQuery } from '@tanstack/react-query';
import { FC, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { ListVideoResult, listUserVideos } from '../../api/listVideo.ts';
import { VideoCover } from '../../pages/Profile/VideoCover.tsx';
import styles from './VideoList.module.scss';

const transformData = (data: ListVideoResult) => {
  return data.map((video) => ({
    title: video.title,
    videoId: video.video_id,
    playbackUrl: video.play_url,
    coverUrl: video.cover_url,
    favoriteCount: video.favorite_count,
    commentCount: video.comment_count,
    isEncoding: video.is_encoding,
  }));
};

type VideoData = ReturnType<typeof transformData>;

const VideoList: FC<{ userId: string }> = (props) => {
  const { data, isLoading } = useQuery({
    queryKey: ['profile-page-video-list', props.userId],
    queryFn: async (): Promise<VideoData> => {
      const videos = await listUserVideos(props.userId);
      return transformData(videos);
    },
  });
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  return (
    <div>
      <div className={`${styles['grid-container']} w-full flex-1`}>
        {isLoading || !data
          ? Array.from({ length: 12 }).map((_, index) => <Skeleton key={index} className="aspect-[9/16] w-full" />)
          : data.map((video, index) => {
              return (
                <VideoCover
                  videoTitle={video.title}
                  videoId={video.videoId}
                  key={index}
                  coverUrl={video.coverUrl}
                  playbackUrl={video.playbackUrl}
                  playing={playingIndex === index}
                  onPlay={() => {
                    setPlayingIndex(index);
                  }}
                  onPause={() => {
                    setPlayingIndex(null);
                  }}
                ></VideoCover>
              );
            })}
      </div>
      <div className="m-auto w-fit py-2 opacity-60">The End 👀</div>
    </div>
  );
};

export { VideoList };
