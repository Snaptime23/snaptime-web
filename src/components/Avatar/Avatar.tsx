import { FC } from 'react';

const Avatar: FC<{ className?: string; size?: number }> = (props) => {
  return (
    <img
      src="/mock/avatar.png"
      className={`aspect-square rounded-full object-cover ${props.className}`}
      style={{
        width: props.size,
        height: props.size,
      }}
    ></img>
  );
};

export { Avatar };
