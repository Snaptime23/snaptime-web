import { VolumeOff } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import { FC, useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';
import { useEmitter, useListenEvent } from '../../store/emitter/emitter.ts';
import { globalStore } from '../../store/globalStore.ts';

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
  const emitter = useEmitter();

  const [globalMuted, setGlobalMuted] = useState(globalStore.muted);

  useListenEvent('unmuteVideo', () => {
    setGlobalMuted(false);
    globalStore.muted = false;
  });

  useListenEvent('activeVideoChange', (data) => {
    if (!data) return;
    if ('videoId' in data) {
      if (data.uniqueDataId !== props.uniqueDataId) {
        videoRef.current?.pause();
        videoRef.current && (videoRef.current.currentTime = 0);
      }
    }
  });

  useEffect(() => {
    if (!entry) return;
    if (entry.intersectionRatio > 0.3) {
      // threshold 0.5
      if (entry.intersectionRatio > 0.5) {
        props.onContentVisible?.(props.uniqueDataId);
        void videoRef.current?.play().catch(() => undefined);
        emitter.emit('activeVideoChange', {
          videoId: props.videoId,
          uniqueDataId: props.uniqueDataId,
        });
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
  }, [emitter, entry, isVisible, props]);

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
        muted={globalMuted}
        loop
        playsInline
        className="object-fit z-20 h-full w-full flex-1"
        ref={videoRef}
      />
      <div className="absolute bottom-0 left-0 z-10 h-full w-full overflow-clip opacity-30">
        <img src={props.videoCoverUrl} className="h-full w-full scale-150 object-cover blur-md" />
      </div>
      <div className="absolute bottom-0 left-0 z-40 flex w-full flex-col bg-gradient-to-t from-black to-transparent px-6 pb-[30px] pr-[100px] pt-[100px] text-white sm:pb-[60px]">
        <Typography variant="h5">{!props.videoTitle ? 'No Title' : props.videoTitle}</Typography>
        <Typography className="line-clamp-3" variant="body2">
          {!props.videoDescription ? 'No description.' : props.videoDescription}
        </Typography>
      </div>
      {globalMuted && (
        <div className="absolute bottom-0 left-0 z-50 flex h-full w-full flex-col items-center justify-center bg-slate-900 bg-opacity-60 text-xl text-white">
          <IconButton
            className="flex !flex-col gap-2 !p-[500px]"
            color="inherit"
            onClick={() => {
              setGlobalMuted(false);
              globalStore.muted = false;
              emitter.emit('unmuteVideo', undefined);
            }}
          >
            <VolumeOff className="!text-[6rem]"></VolumeOff>
            <Typography className="whitespace-nowrap">点击取消静音</Typography>
          </IconButton>
        </div>
      )}
    </div>
  );
};

export { SnapVideo };
