import { FC, useState } from 'react';
import { IoPencil } from 'react-icons/io5';
import styles from './Profile.module.scss';
// import { useAppDispatch, useAppSelector } from '../../store/index.ts';
const mock = [
  '../../../public/mock/avatar.png',
  '../../../public/mock/avatar.png',
  '../../../public/mock/avatar.png',
  '../../../public/mock/avatar.png',
  '../../../public/mock/avatar.png',
  '../../../public/mock/avatar.png',
  '../../../public/mock/avatar.png',
  '../../../public/mock/avatar.png',
  '../../../public/mock/avatar.png',
  '../../../public/mock/avatar.png',
  '../../../public/mock/avatar.png',
  '../../../public/mock/avatar.png',
  '../../../public/mock/avatar.png',
  '../../../public/mock/avatar.png',
  '../../../public/mock/avatar.png',
  '../../../public/mock/avatar.png',
  '../../../public/mock/avatar.png',
  '../../../public/mock/avatar.png',
  '../../../public/mock/avatar.png',
  '../../../public/mock/avatar.png',
  '../../../public/mock/avatar.png',
  '../../../public/mock/avatar.png',
  '../../../public/mock/avatar.png',
  '../../../public/mock/avatar.png',
  '../../../public/mock/avatar.png',
  '../../../public/mock/avatar.png',
  '../../../public/mock/avatar.png',
  '../../../public/mock/avatar.png',
  '../../../public/mock/avatar.png',
  '../../../public/mock/avatar.png',
  '../../../public/mock/avatar.png',
];
const Profile: FC = () => {
  const [typeBarStyle, setTypeBar] = useState(
    'relative left-[0%] h-[3px] w-[33%] bg-red-400 transition-all duration-300'
  );
  const chooseTypeBar = (type: string) => {
    return () => {
      console.log(type);
      if (type == 'videos') {
        setTypeBar('relative left-[0%] h-[3px] w-[33%] bg-red-400 transition-all duration-300');
      } else if (type == 'favorites') {
        console.log('here');
        setTypeBar('relative left-[33.5%] h-[3px] w-[33%] bg-red-400 transition-all duration-300');
      } else {
        setTypeBar('relative left-[67%] h-[3px] w-[33%] bg-red-400 transition-all duration-300');
      }
    };
  };

  // const count = useAppSelector((state) => state.counter.value);
  // const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col overflow-y-auto px-0 sm:px-[20px]">
      <div className="m-[10px] flex h-[130px] w-full flex-row items-center gap-2 p-[5px]">
        <img src="/mock/avatar.png" alt="avatar" className="aspect-square h-[90%] rounded-full object-cover" />
        <div className="flex h-full flex-col justify-between overflow-hidden p-3">
          <div className="select-text overflow-hidden text-ellipsis whitespace-nowrap break-all text-3xl font-bold">
            LucausMartinLucausMartinLucausMartinLucausMartin
          </div>
          <div className="select-text overflow-hidden text-ellipsis whitespace-nowrap break-all p-[2px] text-lg font-medium">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores quo nesciunt voluptate beatae, voluptatem,
            rem architecto illum corrupti ratione animi perferendis vitae inventore ea blanditiis explicabo similique
            itaque dolore corporis.
          </div>
          <button className="outline-white-500 mt-[10px] flex w-[150px] flex-row items-center justify-center gap-2 rounded-md px-3 py-0 outline outline-2">
            <IoPencil className="pt-[1px]" size={22}></IoPencil>
            <span className="text-xl">Edit Profile</span>
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-1 p-4 text-lg">
        <div className="flex flex-row gap-3 text-lg">
          <span>0 Following</span>
          <span>0 Followers</span>
          <span>0 Likes</span>
        </div>
        <div>
          <span>No bio yet.</span>
        </div>
      </div>
      <div className="flex max-w-6xl flex-1 select-none flex-col overflow-x-hidden pt-3">
        <div className="flex flex-row items-center justify-around">
          <button className="w-full bg-transparent text-xl" onClick={chooseTypeBar('videos')}>
            Videos
          </button>
          <button className="w-full bg-transparent text-xl" onClick={chooseTypeBar('favorites')}>
            Favorites
          </button>
          <button className="w-full bg-transparent text-xl" onClick={chooseTypeBar('likes')}>
            Likes
          </button>
        </div>
        <div className={typeBarStyle}></div>
        <div className="w-full pb-[56px] sm:pb-0">
          <div className={`${styles['grid-container']} w-full flex-1`}>
            {mock.map((item, index) => {
              return (
                <div key={index} className="flex aspect-[9/16] justify-center overflow-clip bg-black">
                  <img src={item} className="object-fill" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export { Profile };
