import { FC } from 'react';
import { Section } from './Section.tsx';

const ScrollContent: FC = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => {
        return (
          <>
            <Section key={index} title={'Video ' + (index + 1).toString()}></Section>
            <div className="h-[40px]"></div>
          </>
        );
      })}
    </>
  );
};

export { ScrollContent };