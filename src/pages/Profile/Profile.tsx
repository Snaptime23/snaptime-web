import { FC, useCallback, useEffect, useState } from 'react';
import { VideoList } from '../../components/VideoList/VideoList.tsx';
import { useUserInfo } from '../../hooks/useUserInfo.ts';
import { UserProfile } from './UserProfile.tsx';
// import { useAppDispatch, useAppSelector } from '../../store/index.ts';

const Profile: FC = () => {
  const userInfo = useUserInfo();

  // const count = useAppSelector((state) => state.counter.value);
  // const dispatch = useAppDispatch();

  const [selectedTab, setSelectedTab] = useState<'videos' | 'favorites' | 'likes'>('videos');
  useEffect(() => {
    console.log(selectedTab);
  }, [selectedTab]);

  return (
    <div className="relative h-[100dvh] overflow-y-auto">
      <div className="absolute left-0 top-0 -z-10 h-[300px] w-full bg-gradient-to-b from-pink-100 to-transparent"></div>
      <div className="mx-auto flex max-w-6xl flex-col">
        <UserProfile userInfo={userInfo}></UserProfile>
        <div className="flex flex-1 select-none flex-col overflow-x-clip">
          <StickyHeader selectedTab={selectedTab} onSelectedTabChange={setSelectedTab}></StickyHeader>
          <div className="w-full pb-[56px] sm:pb-0">
            <VideoList userId={userInfo?.user_id ?? ''}></VideoList>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Profile };

const StickyHeader: FC<{
  selectedTab?: 'videos' | 'favorites' | 'likes';
  onSelectedTabChange?: (tab: 'videos' | 'favorites' | 'likes') => void;
}> = (props) => {
  const [typeBarStyle, setTypeBar] = useState(
    'relative left-[0%] h-[6px] w-[33%] bg-red-400 transition-all duration-300'
  );

  const chooseTypeBar = useCallback(
    (type: string) => {
      console.log(type);
      if (type == 'videos') {
        props.onSelectedTabChange?.('videos');
        setTypeBar('relative left-[0%] h-[6px] w-[33%] bg-red-400 transition-all duration-300');
      } else if (type == 'favorites') {
        console.log('here');
        props.onSelectedTabChange?.('favorites');
        setTypeBar('relative left-[33.5%] h-[6px] w-[33%] bg-red-400 transition-all duration-300');
      } else {
        props.onSelectedTabChange?.('likes');
        setTypeBar('relative left-[67%] h-[6px] w-[33%] bg-red-400 transition-all duration-300');
      }
    },
    [props]
  );

  useEffect(() => {
    if (props.selectedTab == 'videos') {
      chooseTypeBar('videos');
    } else if (props.selectedTab == 'favorites') {
      chooseTypeBar('favorites');
    } else {
      chooseTypeBar('likes');
    }
  }, [chooseTypeBar, props.selectedTab]);

  return (
    <div className="sticky top-0 z-50 h-fit bg-white dark:bg-[#242424]">
      <div className="flex flex-row items-center justify-around">
        <button
          className="w-full bg-transparent py-2"
          onClick={() => {
            chooseTypeBar('videos');
          }}
        >
          Videos
        </button>
        <button
          className="w-full bg-transparent py-2"
          onClick={() => {
            chooseTypeBar('favorites');
          }}
        >
          Favorites
        </button>
        <button
          className="w-full bg-transparent py-2"
          onClick={() => {
            chooseTypeBar('likes');
          }}
        >
          Likes
        </button>
      </div>
      <div className={typeBarStyle}></div>
    </div>
  );
};
