import { CSSProperties, FC } from 'react';
import { IoChevronDownSharp, IoChevronUpSharp } from 'react-icons/io5';
import { FakeContent } from './FakeContent.tsx';

const InfiniteScroller: FC<{ className?: string; styles?: CSSProperties }> = (props) => {
  return (
    <div className={props.className + ' ' + 'relative'} style={props.styles}>
      <FakeContent></FakeContent>
      <div className="absolute bottom-0 right-0 mb-4 me-4 flex flex-col gap-6">
        <IoChevronUpSharp size={32}></IoChevronUpSharp>
        <IoChevronDownSharp size={32}></IoChevronDownSharp>
      </div>
    </div>
  );
};

export { InfiniteScroller };
