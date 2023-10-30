import { CSSProperties, FC } from 'react';
import { IoChevronDownSharp, IoChevronUpSharp } from 'react-icons/io5';
import { ScrollContent } from './ScrollContent.tsx';

const InfiniteScroller: FC<{ className?: string; styles?: CSSProperties }> = (props) => {
  return (
    <div className={props.className + ' ' + 'relative h-[100dvh] pb-[56px] sm:pb-0'} style={props.styles}>
      <div className="h-full w-full snap-y snap-mandatory snap-always overflow-scroll">
        <ScrollContent></ScrollContent>
      </div>
      <div className="fixed bottom-[56px] right-0 mb-4 me-4 flex flex-col gap-6 sm:bottom-0">
        <IoChevronUpSharp size={32}></IoChevronUpSharp>
        <IoChevronDownSharp size={32}></IoChevronDownSharp>
      </div>
    </div>
  );
};

export { InfiniteScroller };
