import { FC, useEffect, useRef } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';

const Section: FC<{
  id: number;
  title: string;
  onContentInvisible?: () => void;
  onContentVisible?: () => void;
  className?: string;
}> = (props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {
    threshold: [0.25],
  });
  const isVisible = !!entry?.isIntersecting;

  useEffect(() => {
    console.log(`Render Section ${props.id}`, { isVisible });
    if (isVisible) {
      props.onContentVisible?.();
    } else {
      props.onContentInvisible?.();
    }
  }, [isVisible, props]);

  return (
    <div
      className={
        'flex h-full snap-center snap-always flex-col justify-center border-2 border-dashed border-blue-400' +
        ' ' +
        props.className
      }
      ref={ref}
    >
      <video
        src="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_5MB.mp4"
        autoPlay
        muted
        controls
        className="flex-1 object-cover"
        playsInline
      ></video>
      <div className="mx-auto py-2">{props.title}</div>
    </div>
  );
};

export { Section };
