import { FC, useEffect, useRef } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';

const Section: FC<{
  id: number;
  title: string;
  onContentInvisible?: () => void;
  onContentVisible?: () => void;
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
    <div className="flex h-full snap-center snap-always border-2 border-dashed border-blue-400 text-4xl" ref={ref}>
      <div className="m-auto">{props.title}</div>
    </div>
  );
};

export { Section };
