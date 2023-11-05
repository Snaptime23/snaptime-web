import { FC } from 'react';

const VideoCover: FC = () => {
  return (
    <div className="flex aspect-[9/16] justify-center overflow-clip bg-black">
      <img src={'/mock/avatar.png'} className="max-w-none object-fill" />;
    </div>
  );
};

export { VideoCover };
