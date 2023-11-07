import { Diamond, Piano, RamenDining, SportsEsports } from '@mui/icons-material';
import { FC } from 'react';
import { BiSolidLaugh } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useUserInfo } from '../../hooks/useUserInfo.ts';
import { useAppDispatch } from '../../store/index.ts';
import { login, logout } from '../../store/slices/loginState.ts';
import { Spacer } from '../../utils/Spacer.tsx';
import { Avatar } from '../Avatar/Avatar.tsx';
import { NewVideoIconDesktop, NewVideoIconMobile, TabBarIcon } from './TabBarIcon.tsx';
import { useAlwaysUseDarkTabbar } from './useIsAlwaysDarkTabbar.ts';

const TabBarHorizontal: FC = () => {
  const isAlwaysDark = useAlwaysUseDarkTabbar();
  const userInfo = useUserInfo();
  const dispatch = useAppDispatch();
  const checkLogin = () => {
    userInfo ? dispatch(logout()) : dispatch(login());
  };

  return (
    <nav
      className={`z-[200] h-[56px] w-full border-t-[1px] border-gray-400 border-opacity-30 bg-[#fafafa] transition-colors dark:bg-[#101010] ${
        isAlwaysDark && '!bg-[#101010]'
      }`}
    >
      <div className="mx-auto flex h-full w-full max-w-sm flex-row gap-2">
        <Link to="/" className="flex flex-1 flex-row items-center justify-center whitespace-nowrap">
          <TabBarIcon icon={<BiSolidLaugh size={28} />} label="浏览 Snaps"></TabBarIcon>
        </Link>
        {/* <Link to="/about" className="flex flex-1 flex-row items-center justify-center">
        <TabBarIcon icon={<IoHome size={28} />} label="About"></TabBarIcon>
      </Link> */}
        <Link to="/about" className="flex flex-1 flex-row items-center justify-center whitespace-nowrap">
          <NewVideoIconMobile></NewVideoIconMobile>
        </Link>
        {/* <Link to="/about" className="flex flex-1 flex-row items-center justify-center">
        <TabBarIcon icon={<IoHome size={28} />} label="About"></TabBarIcon>
      </Link> */}
        <Link to="/profile" className="flex flex-1 flex-row items-center justify-center">
          <div className="flex flex-1 flex-row items-center justify-center whitespace-nowrap">
            <TabBarIcon
              icon={<CgProfile size={28} />}
              label={userInfo ? '我的光印' : 'Login'}
              onClick={checkLogin}
            ></TabBarIcon>
          </div>
        </Link>
      </div>
    </nav>
  );
};

const TabBarVertical: FC = () => {
  const isAlwaysDark = useAlwaysUseDarkTabbar();
  const userInfo = useUserInfo();
  const dispatch = useAppDispatch();
  const checkLogin = () => {
    userInfo ? dispatch(logout()) : dispatch(login());
  };

  return (
    <nav
      className={`flex h-full w-[80px] flex-col gap-2 border-r-[1px] border-gray-400 border-opacity-30 bg-[#fafafa] py-4 transition-colors dark:bg-[#101010] ${
        isAlwaysDark && '!bg-[#101010]'
      }`}
    >
      <StyledLink to="/">
        <TabBarIcon icon={<BiSolidLaugh size={32} />} label="Snaps"></TabBarIcon>
      </StyledLink>
      <div className="my-4 h-[1px] w-full bg-slate-500 opacity-30"></div>
      <StyledLink to="/snaps/gaming">
        <TabBarIcon icon={<SportsEsports fontSize="large" />} label="游戏"></TabBarIcon>
      </StyledLink>
      <StyledLink to="/snaps/anime">
        <TabBarIcon icon={<BiSolidLaugh size={32} />} label="二次元"></TabBarIcon>
      </StyledLink>
      <StyledLink to="/snaps/music">
        <TabBarIcon icon={<Piano fontSize="large" />} label="音乐"></TabBarIcon>
      </StyledLink>
      <StyledLink to="/snaps/food">
        <TabBarIcon icon={<RamenDining fontSize="large" />} label="美食"></TabBarIcon>
      </StyledLink>
      <StyledLink to="/snaps/fashion">
        <TabBarIcon icon={<Diamond fontSize="large" />} label="时尚"></TabBarIcon>
      </StyledLink>
      <StyledLink to="/snaps/sports">
        <TabBarIcon icon={<BiSolidLaugh size={32} />} label="体育"></TabBarIcon>
      </StyledLink>

      <div className="my-4 h-[1px] w-full bg-slate-500 opacity-30"></div>
      <Spacer></Spacer>
      <div className="my-4 h-[1px] w-full bg-slate-500 opacity-30"></div>

      <div className="flex flex-row items-center justify-center">
        <NewVideoIconDesktop></NewVideoIconDesktop>
      </div>

      <StyledLink to="/profile">
        <div className="flex w-full cursor-pointer flex-row items-center justify-center p-[0.5rem]">
          <div className="flex flex-col items-center gap-1" onClick={checkLogin}>
            <Avatar size={56}></Avatar>
            <div
              className={`whitespace-nowrap text-sm text-pink-700 dark:text-pink-200 ${
                isAlwaysDark && '!text-pink-200'
              }`}
            >
              {userInfo ? userInfo.user_name : 'Login'}
            </div>
          </div>
        </div>
      </StyledLink>

      {/* <StyledLink to="/profile">
        <TabBarIcon icon={<CgProfile size={32} />} label="Profile"></TabBarIcon>
      </StyledLink> */}
    </nav>
  );
};

export { TabBarHorizontal, TabBarVertical };

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-block: 0.5rem;
`;
