import { FC, useState } from 'react';
import { IoPencil } from 'react-icons/io5';
import { useUserInfo } from '../../hooks/useUserInfo.ts';
import styles from './Profile.module.scss';
// import { useAppDispatch, useAppSelector } from '../../store/index.ts';

const mock = Array.from({ length: 100 }).map((_) => {
  return '/mock/avatar.png';
});

const Profile: FC = () => {
  const [typeBarStyle, setTypeBar] = useState(
    'relative left-[0%] h-[6px] w-[33%] bg-red-400 transition-all duration-300'
  );
  const chooseTypeBar = (type: string) => {
    return () => {
      console.log(type);
      if (type == 'videos') {
        setTypeBar('relative left-[0%] h-[6px] w-[33%] bg-red-400 transition-all duration-300');
      } else if (type == 'favorites') {
        console.log('here');
        setTypeBar('relative left-[33.5%] h-[6px] w-[33%] bg-red-400 transition-all duration-300');
      } else {
        setTypeBar('relative left-[67%] h-[6px] w-[33%] bg-red-400 transition-all duration-300');
      }
    };
  };

  const userInfo = useUserInfo();

  // const count = useAppSelector((state) => state.counter.value);
  // const dispatch = useAppDispatch();

  return (
    <div className="h-[100dvh] overflow-y-auto">
      <div className="mx-auto flex max-w-6xl flex-col">
        <div className="flex w-full flex-row items-center gap-3 p-[15px] pt-[100px] sm:pt-[180px]">
          <img
            src="/mock/avatar.png"
            alt="avatar"
            className="aspect-square h-[120px] rounded-full object-cover sm:h-[150px]"
          />
          <div className="flex h-full flex-col justify-center overflow-hidden">
            <div className="select-text overflow-hidden text-ellipsis whitespace-nowrap break-all text-3xl font-bold">
              {!userInfo ? 'Not Logged In' : userInfo.user_name}
            </div>
            <div className="ms-[2px] line-clamp-2 select-text text-ellipsis break-all text-lg font-medium">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores quo nesciunt voluptate beatae,
              voluptatem, rem architecto illum corrupti ratione animi perferendis vitae inventore ea blanditiis
              explicabo similique itaque dolore corporis.
            </div>
            <button className="border-white-500 mt-[10px] flex w-fit flex-row items-center justify-center gap-2 rounded-md border-2 px-3 py-1">
              <IoPencil className="pt-[1px]" size={22}></IoPencil>
              <span className="text-xl">Edit Profile</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-1 p-4">
          <div className="flex flex-row gap-3 text-lg">
            <span>
              <span className="font-bold">192</span> Following
            </span>
            <span>
              <span className="font-bold">233</span> Followers
            </span>
            <span>
              <span className="font-bold">128</span> Likes
            </span>
          </div>
          <div>
            <span>No bio yet.</span>
          </div>
        </div>
        <div className="flex flex-1 select-none flex-col overflow-x-clip">
          <div className="sticky top-0 h-fit bg-white dark:bg-[#242424]">
            <div className="flex flex-row items-center justify-around">
              <button className="w-full bg-transparent py-2" onClick={chooseTypeBar('videos')}>
                Videos
              </button>
              <button className="w-full bg-transparent py-2" onClick={chooseTypeBar('favorites')}>
                Favorites
              </button>
              <button className="w-full bg-transparent py-2" onClick={chooseTypeBar('likes')}>
                Likes
              </button>
            </div>
            <div className={typeBarStyle}></div>
          </div>
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
            <div className="m-auto w-fit py-2 opacity-60">The End 👀</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Profile };
