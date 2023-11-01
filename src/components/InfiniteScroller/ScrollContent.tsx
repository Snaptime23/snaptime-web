import { FC, useState } from 'react';
import { Section } from './Section.tsx';

const ScrollContent: FC = () => {
  const [contents] = useState<number[]>(Array.from({ length: 10 }).map((_, index) => index));

  return (
    <>
      {contents.map((content, index) => {
        return (
          <div key={index} className="contents">
            <Section id={index} title={'Video ' + content.toString()}></Section>
            <div className="h-[40px]"></div>
          </div>
        );
      })}
    </>
  );
};

export { ScrollContent };
