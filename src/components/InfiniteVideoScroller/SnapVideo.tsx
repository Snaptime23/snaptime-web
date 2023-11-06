import { Typography } from '@mui/material';
import { FC, useEffect, useRef } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';

export interface SnapVideoProps {
  unloaded?: boolean;
  videoId: string;
  videoTitle?: string;
  videoDescription?: string;
  videoPlaybackUrl?: string;
  videoCoverUrl?: string;
  onContentInvisible?: () => void;
  onContentVisible?: (id: string) => void;
  uniqueDataId: string;
  className?: string;
}

const SnapVideo: FC<SnapVideoProps> = (props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {
    threshold: [0.05, 0.5],
  });
  const isVisible = !!entry?.isIntersecting;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!entry) return;
    if (entry.intersectionRatio > 0.3) {
      // threshold 0.5
      if (entry.intersectionRatio > 0.5) {
        props.onContentVisible?.(props.uniqueDataId);
        void videoRef.current?.play();
      } else {
        props.onContentInvisible?.();
        videoRef.current?.pause();
      }
    } else {
      // threshold 0.05
      if (!entry.isIntersecting) {
        videoRef.current && (videoRef.current.currentTime = 0);
      }
    }
  }, [entry, isVisible, props]);

  // const supportMediaSource = dashjs.supportsMediaSource();

  if (props.unloaded) return <div className="h-full w-full snap-center snap-always bg-slate-900"></div>;
  return (
    <div
      className={'relative flex h-full w-full snap-center snap-always flex-col justify-center' + ' ' + props.className}
      ref={ref}
    >
      {/* <DashPlayer
        src="https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd"
        className="flex-1 object-fit"
        ref={videoRef}
      ></DashPlayer> */}
      <video
        src={props.videoPlaybackUrl}
        muted
        loop
        playsInline
        className="object-fit z-20 h-full w-full flex-1"
        ref={videoRef}
      />
      <div className="absolute bottom-0 left-0 z-10 h-full w-full overflow-clip opacity-30">
        <img src={props.videoCoverUrl} className="h-full w-full scale-150 object-cover blur-md" />
      </div>
      <div className="absolute bottom-[56px] left-0 z-40 mb-8 flex w-full flex-col px-6 text-white sm:bottom-0">
        <Typography variant="h5">{!props.videoTitle ? 'No Title' : props.videoTitle}</Typography>
        <Typography variant="body2">{!props.videoDescription ? 'No description.' : props.videoDescription}</Typography>
      </div>
    </div>
  );
};

export { SnapVideo };
