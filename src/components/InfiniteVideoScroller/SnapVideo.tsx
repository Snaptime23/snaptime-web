import { PlayCircle, VolumeOff } from '@mui/icons-material';
import { IconButton, Slider, Typography } from '@mui/material';
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

function secondToTime(second: number) {
  const minutes = Math.floor(second / 60);
  const seconds = Math.floor(second % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

const SnapVideo: FC<SnapVideoProps> = (props) => {
  const emitter = useEmitter();
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {
    threshold: [0.05, 0.5],
  });
  const isVisible = !!entry?.isIntersecting;
  const videoRef = useRef<HTMLVideoElement>(null);

  const [videoDuration, setVideoDuration] = useState(0);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);

  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    videoRef.current?.addEventListener('loadedmetadata', () => {
      setVideoDuration(videoRef.current?.duration ?? 0);
      setVideoCurrentTime(videoRef.current?.currentTime ?? 0);
      videoRef.current?.addEventListener('timeupdate', () => {
        setVideoCurrentTime(videoRef.current?.currentTime ?? 0);
      });
    });
  }, [dragging]);

  const [globalMuted, setGlobalMuted] = useState(globalStore.muted);

  useListenEvent('muteVidoeChange', (data) => {
    if (data.muted) {
      setGlobalMuted(false);
      globalStore.muted = false;
    }
  });

  useListenEvent('activeVideoChange', (data) => {
    if (data.uniqueDataId !== props.uniqueDataId) {
      videoRef.current?.pause();
      videoRef.current && (videoRef.current.currentTime = 0);
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
        setPaused(false);
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
        onClick={(e) => {
          console.log(e);
          if (paused) {
            void videoRef.current?.play().catch(() => undefined);
          } else {
            videoRef.current?.pause();
          }
          setPaused(!paused);
        }}
      />
      <div className="absolute bottom-0 left-0 z-10 h-full w-full overflow-clip opacity-30">
        <img src={props.videoCoverUrl} className="h-full w-full scale-150 object-cover blur-md" />
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 z-40 flex w-full flex-col bg-gradient-to-t from-black to-transparent px-6 pb-[66px] pr-[80px] pt-[100px] text-white sm:pb-[70px]">
        <Typography variant="h5">{!props.videoTitle ? 'No Title' : props.videoTitle}</Typography>
        <Typography className="line-clamp-3" variant="body2">
          {!props.videoDescription ? 'No description.' : props.videoDescription}
        </Typography>
      </div>
      {globalMuted && (
        <div className="absolute bottom-0 left-0 z-50 flex h-full w-full flex-col items-center justify-center bg-slate-900 bg-opacity-60 text-xl text-white">
          <IconButton
            className="flex !flex-col gap-2 !p-[800px]"
            color="inherit"
            onClick={() => {
              setGlobalMuted(false);
              globalStore.muted = false;
              emitter.emit('muteVidoeChange', { muted: true });
            }}
          >
            <VolumeOff className="!text-[6rem]"></VolumeOff>
            <Typography className="whitespace-nowrap">点击取消静音</Typography>
          </IconButton>
        </div>
      )}
      <div className="absolute bottom-0 left-0 z-40 w-full pl-6 pr-[90px]">
        <Slider
          max={videoDuration}
          defaultValue={0}
          value={videoCurrentTime}
          step={0.01}
          valueLabelFormat={secondToTime}
          onChange={(_e, v) => {
            if (!videoRef.current) {
              return;
            }
            videoRef.current.currentTime = v as number;
            setVideoCurrentTime(v as number);
          }}
          onMouseDown={() => {
            videoRef.current?.pause();
            setDragging(true);
          }}
          onMouseUp={() => {
            void videoRef.current?.play().catch(() => undefined);
            setDragging(false);
          }}
          valueLabelDisplay="auto"
        />
      </div>
      {paused && (
        <div className="absolute bottom-0 left-0 z-50 flex h-full w-full flex-col items-center justify-center bg-slate-900 bg-opacity-60 text-xl text-white">
          <IconButton
            className="flex !flex-col gap-2 !p-[800px]"
            color="inherit"
            onClick={() => {
              void videoRef.current?.play().catch(() => undefined);
              setPaused(false);
            }}
          >
            <PlayCircle className="!text-[6rem]"></PlayCircle>
            <Typography className="whitespace-nowrap">点击继续播放</Typography>
          </IconButton>
        </div>
      )}
    </div>
  );
};

export { SnapVideo };
