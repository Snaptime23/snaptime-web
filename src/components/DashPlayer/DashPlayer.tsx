import dashjs from 'dashjs';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

interface DashPlayerProps {
  onPlayerCreated?: (player: unknown) => void;
  src: string;
  className?: string;
}

const DashPlayer = forwardRef<HTMLVideoElement, DashPlayerProps>(function DashPlayer(props, ref) {
  const playerRef = useRef<dashjs.MediaPlayerClass | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  useImperativeHandle(
    ref,
    () => {
      if (!videoRef.current) throw new Error('Video element not found');
      return videoRef.current;
    },
    []
  );

  useEffect(() => {
    if (playerRef.current) return;
    playerRef.current = dashjs.MediaPlayer().create();
    props.onPlayerCreated?.(playerRef.current);
  }, [props]);

  useEffect(() => {
    if (!playerRef.current || !videoRef.current) return;
    playerRef.current.initialize(videoRef.current, props.src, false);
    playerRef.current.attachView(videoRef.current);
    return () => {
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [props.src]);

  return <video ref={videoRef} playsInline controls className={props.className} loop muted></video>;
});

export { DashPlayer };
