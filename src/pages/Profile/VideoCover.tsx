import { VolumeOff, VolumeUp } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { FC, useEffect, useRef, useState } from 'react';

const VideoCover: FC<{
  coverUrl: string;
  videoId?: string;
  videoTitle?: string;
  playbackUrl?: string;
  playing?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
}> = (props) => {
  const [muted, setMuted] = useState(true);
  const [played, setPlayed] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);
  const onClickVideo = (video: { videoId?: string; videoTitle?: string; playbackUrl?: string }) => {
    console.log(video);
  };

  useEffect(() => {
    if (props.playing) {
      void ref.current?.play();
      setPlayed(true);
    } else {
      ref.current?.pause();
      ref.current && (ref.current.currentTime = 0);
    }
  }, [props.playbackUrl, props.playing]);

  return (
    <div className="flex aspect-[9/16] justify-center overflow-clip bg-black">
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
          <img src={props.coverUrl} className="h-full w-full max-w-none object-cover"></img>
          {(!!props.playing || played) && props.playbackUrl && (
            <div className="absolute left-0 top-0 h-full w-full">
              <video
                ref={ref}
                autoPlay
                muted
                loop
                playsInline
                src={props.playbackUrl}
                className="pointer-events-none absolute left-0 top-0 h-full w-full object-cover"
              ></video>
              {props.playing && (
                // TODO: hidden
                <div className="absolute bottom-1 right-1 hidden">
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setMuted(!muted);
                      ref.current && (ref.current.muted = muted);
                    }}
                  >
                    {muted ? <VolumeOff></VolumeOff> : <VolumeUp></VolumeUp>}
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
