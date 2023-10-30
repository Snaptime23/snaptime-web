import { FC, useRef } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';

const Section: FC<{ title: string }> = (props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {
    threshold: [0.25],
  });
  const isVisible = !!entry?.isIntersecting;

  console.log(`Render Section ${props.title}`, { isVisible });

  return (
    <div className="flex h-full snap-center snap-always border-2 border-dashed border-blue-400 text-4xl" ref={ref}>
      <div className="m-auto">{props.title}</div>
    </div>
  );
};

export { Section };
