import { FC, useState } from 'react';
import { Section } from './Section.tsx';

const ScrollContent: FC = () => {
  const [contents] = useState<number[]>(Array.from({ length: 10 }).map((_, index) => index));

  return (
    <>
      {contents.map((content, index) => {
        return (
          <div key={index} className="contents">
            <Section id={index} title={'Video ' + content.toString()} className="bg-gray-700 text-white"></Section>
            <div className="h-[40px] bg-black text-white"></div>
          </div>
        );
      })}
    </>
  );
};

export { ScrollContent };
