import dashjs from 'dashjs';
import { FC, useEffect, useRef } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';
import { DashPlayer } from '../DashPlayer/DashPlayer.tsx';

const Section: FC<{
  id: number;
  title: string;
  onContentInvisible?: () => void;
  onContentVisible?: () => void;
  className?: string;
}> = (props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {
    threshold: [0.05, 0.5],
  });
  const isVisible = !!entry?.isIntersecting;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    console.log(`Render Section ${props.id} ${isVisible}, ${entry?.intersectionRatio}`, entry);
    if (!entry) return;
    if (entry.intersectionRatio > 0.3) {
      if (entry.intersectionRatio > 0.5) {
        console.log(`Render Section ${props.id} visible`);
        props.onContentVisible?.();
        void videoRef.current?.play();
      } else {
        console.log(`Render Section ${props.id} invisible`);
        props.onContentInvisible?.();
        videoRef.current?.pause();
      }
    } else {
      if (!entry.isIntersecting) {
        console.log(`Render Section ${props.id} fully invisible`);
        videoRef.current?.currentTime && (videoRef.current.currentTime = 0);
      } else {
        console.log(`Render Section ${props.id} visible a bit`);
      }
    }
  }, [entry, isVisible, props]);

  const supportMediaSource = dashjs.supportsMediaSource();

  return (
    <div
      className={
        'relative flex h-full snap-center snap-always flex-col justify-center border-2 border-dashed border-blue-400' +
        ' ' +
        props.className
      }
      ref={ref}
    >
      {supportMediaSource ? (
        <DashPlayer
          src="https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd"
          className="flex-1 object-contain"
          ref={videoRef}
        ></DashPlayer>
      ) : (
        <video
          src="https://test-videos.co.uk/vids/jellyfish/mp4/h264/1080/Jellyfish_1080_10s_1MB.mp4"
          muted
          loop
          className="flex-1 object-cover"
          playsInline
          ref={videoRef}
        />
      )}
      <div className="absolute flex h-full w-full flex-col items-center justify-center">{props.title}CD</div>
    </div>
  );
};

export { Section };
