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
      {Array.from({ length: 100 }).map((_, index) => {
        return (
          <p key={index}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur distinctio illum nesciunt, eligendi
            rerum corrupti dignissimos modi quis, provident, maxime possimus. Deleniti incidunt suscipit eaque dolore
            et. Repellendus, eos itaque.
          </p>
        );
      })}
    </div>
  );
};

export { About };
