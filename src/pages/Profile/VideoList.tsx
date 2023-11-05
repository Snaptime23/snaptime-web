import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { ListVideoResult, listUserVideos } from '../../api/listVideo.ts';
import { useUserInfo } from '../../hooks/useUserInfo.ts';
import { VideoCover } from './VideoCover.tsx';
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

const VideoList: FC = () => {
  const userInfo = useUserInfo();
  const { data, isLoading } = useQuery({
    queryKey: ['profile-page-video-list', userInfo?.user_id],
    queryFn: async (): Promise<VideoData> => {
      const videos = await listUserVideos(userInfo);
      return transformData(videos);
    },
  });

  return (
    <div>
      {isLoading && <div className="m-auto w-fit py-2">Loading...</div>}
      {data && (
        <div className={`${styles['grid-container']} w-full flex-1`}>
          {data.map((video, index) => {
            return (
              <VideoCover
                videoTitle={video.title}
                videoId={video.videoId}
                key={index}
                coverUrl={video.coverUrl}
                playbackUrl={video.playbackUrl}
              ></VideoCover>
            );
          })}
        </div>
      )}
      <div className="m-auto w-fit py-2 opacity-60">The End 👀</div>
    </div>
  );
};

export { VideoList };
