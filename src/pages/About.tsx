import { FC } from 'react';
import { useAppSelector } from '../store/index.ts';

const About: FC<{ className?: string }> = (props) => {
  const count = useAppSelector((state) => state.counter.value);
  return (
    <div>
      <div className={props.className}>About</div>
      <div>
        Count: <span>{count}</span>
      </div>
    </div>
  );
};

export { About };
