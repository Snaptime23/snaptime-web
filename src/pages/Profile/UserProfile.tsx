import { FC } from 'react';
import { IoPencil } from 'react-icons/io5';
import { UserInfo } from '../../hooks/useUserInfo.ts';

const UserProfile: FC<{ userInfo?: UserInfo }> = (props) => {
  return (
    <div>
      <div className="flex w-full flex-row items-center gap-3 p-[15px] pt-[100px] sm:pt-[180px]">
        <UserAvatar></UserAvatar>
        <div className="flex h-full flex-col justify-center overflow-hidden">
          <div className="select-text overflow-hidden text-ellipsis whitespace-nowrap break-all text-3xl font-bold">
            {!props.userInfo ? 'Not Logged In' : props.userInfo.user_name}
          </div>
          <div className="ms-[2px] line-clamp-2 select-text text-ellipsis break-all text-lg font-medium">
            其实地上本没有路，走的人多了，也便成了路。
          </div>
          <EditProfileButton></EditProfileButton>
        </div>
      </div>
      <UserDetails></UserDetails>
    </div>
  );
};

export { UserProfile };

const UserAvatar: FC = () => {
  return (
    <img
      src="/mock/avatar.png"
      alt="avatar"
      className="aspect-square h-[120px] rounded-full object-cover sm:h-[150px]"
    ></img>
  );
};

const EditProfileButton: FC = () => {
  return (
    <button className="border-white-500 mt-[10px] flex w-fit flex-row items-center justify-center gap-2 rounded-md border-2 px-3 py-1">
      <IoPencil className="pt-[1px]" size={20}></IoPencil>
      <span>编辑个人资料</span>
    </button>
  );
};

const UserDetails: FC = () => {
  return (
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
  );
};
