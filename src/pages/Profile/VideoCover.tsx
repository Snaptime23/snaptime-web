import { VolumeOff, VolumeUp } from '@mui/icons-material';
import { IconButton, Tooltip, Typography } from '@mui/material';
import { FC, useEffect, useRef, useState } from 'react';

const VideoCover: FC<{
  coverUrl: string;
  videoId?: string;
  videoTitle?: string;
  playbackUrl?: string;
  playing?: boolean;
  isEncoding?: boolean;
  muted?: boolean;
  setMuted?: (muted: boolean) => void;
  onPlay?: () => void;
  onPause?: () => void;
}> = (props) => {
  const [played, setPlayed] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);
  const onClickVideo = (video: { videoId?: string; videoTitle?: string; playbackUrl?: string }) => {
    console.log(video);
  };
  const [hideImage, setHideImage] = useState(false);

  useEffect(() => {
    if (props.playing) {
      void ref.current?.play().catch(() => undefined);
      setPlayed(true);
    } else {
      ref.current?.pause();
      ref.current && (ref.current.currentTime = 0);
      // props.setMuted?.(true);
    }
  }, [props, props.playbackUrl, props.playing]);

  useEffect(() => {
    if (!ref.current) return;
    if (props.muted) {
      ref.current.muted = true;
    } else {
      ref.current.muted = false;
    }
  }, [props.muted]);

  if (props.isEncoding) {
    return (
      <Tooltip title={props.videoTitle + ' | ' + props.videoId}>
        <div className="relative flex aspect-[9/16] w-full flex-col items-end justify-between bg-gradient-to-br from-pink-600 to-pink-700 p-2 text-white">
          <img
            hidden={hideImage}
            src={props.coverUrl}
            className="absolute left-0 top-0 h-full w-full max-w-none object-cover"
            onError={() => {
              setHideImage(true);
            }}
          ></img>
          <div className="w-full">
            <Typography variant="body1" display="block">
              {props.videoTitle}
            </Typography>
          </div>
          <div className="z-50 text-right">
            <Typography variant="h6">转码中</Typography>
            <Typography variant="caption" display="block">
              视频正在转码
            </Typography>
          </div>
        </div>
      </Tooltip>
    );
  }

  return (
    <div className="flex aspect-[9/16] justify-center overflow-clip bg-gradient-to-br from-pink-600 to-pink-700">
      <Tooltip title={props.videoTitle + ' | ' + props.videoId}>
        <div
          className="relative h-full w-full cursor-pointer"
          onMouseEnter={() => {
            // console.log('enter');
            props.onPlay?.();
          }}
          onMouseLeave={() => {
            // console.log('leave');
            props.onPause?.();
          }}
          onClick={() => {
            onClickVideo({
              videoId: props.videoId,
              videoTitle: props.videoTitle,
              playbackUrl: props.playbackUrl,
            });
          }}
        >
          <img
            src={props.coverUrl}
            className="h-full w-full max-w-none object-cover"
            hidden={hideImage}
            onError={() => {
              setHideImage(true);
            }}
          ></img>
          {(!!props.playing || played) && props.playbackUrl && (
            <div className="absolute left-0 top-0 h-full w-full">
              <video
                ref={ref}
                autoPlay
                muted={props.muted ?? true}
                loop
                playsInline
                src={props.playbackUrl}
                className="x-pointer-events-none absolute left-0 top-0 h-full w-full object-cover"
              ></video>
              {props.playing && (
                // TODO: hidden
                <div className="absolute bottom-1 right-1">
                  <IconButton
                    color="primary"
                    onClick={() => {
                      props.setMuted?.(!props.muted);
                    }}
                  >
                    {props.muted ? <VolumeOff></VolumeOff> : <VolumeUp></VolumeUp>}
                  </IconButton>
                </div>
              )}
            </div>
          )}
        </div>
      </Tooltip>
    </div>
  );
};

export { VideoCover };
