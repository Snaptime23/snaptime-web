import { FC } from 'react';
import { BiSolidLaugh } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { IoHome } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useUserInfo } from '../../hooks/useUserInfo.ts';
import { Spacer } from '../../utils/Spacer.tsx';
import { Avatar } from '../Avatar/Avatar.tsx';
import { NewVideoIconDesktop, NewVideoIconMobile, TabBarIcon } from './TabBarIcon.tsx';
import { useAlwaysUseDarkTabbar } from './useIsAlwaysDarkTabbar.ts';

const TabBarHorizontal: FC = () => {
  const isAlwaysDark = useAlwaysUseDarkTabbar();

  return (
    <nav
      className={`z-[200] h-[56px] w-full border-t-[1px] border-gray-400 border-opacity-30 bg-[#fafafa] transition-colors dark:bg-[#101010] ${
        isAlwaysDark && '!bg-[#101010]'
      }`}
    >
      <div className="mx-auto flex h-full w-full max-w-sm flex-row gap-2">
        <Link to="/" className="flex flex-1 flex-row items-center justify-center">
          <TabBarIcon icon={<BiSolidLaugh size={28} />} label="Snaps"></TabBarIcon>
        </Link>
        {/* <Link to="/about" className="flex flex-1 flex-row items-center justify-center">
        <TabBarIcon icon={<IoHome size={28} />} label="About"></TabBarIcon>
      </Link> */}
        <Link to="/about" className="flex flex-1 flex-row items-center justify-center">
          <NewVideoIconMobile></NewVideoIconMobile>
        </Link>
        {/* <Link to="/about" className="flex flex-1 flex-row items-center justify-center">
        <TabBarIcon icon={<IoHome size={28} />} label="About"></TabBarIcon>
      </Link> */}
        <Link to="/profile" className="flex flex-1 flex-row items-center justify-center">
          <TabBarIcon icon={<CgProfile size={28} />} label="Profile"></TabBarIcon>
        </Link>
      </div>
    </nav>
  );
};

const TabBarVertical: FC = () => {
  const isAlwaysDark = useAlwaysUseDarkTabbar();
  const userInfo = useUserInfo();

  return (
    <nav
      className={`flex h-full w-[80px] flex-col gap-2 border-r-[1px] border-gray-400 border-opacity-30 bg-[#fafafa] py-4 transition-colors dark:bg-[#101010] ${
        isAlwaysDark && '!bg-[#101010]'
      }`}
    >
      <StyledLink to="/">
        <TabBarIcon icon={<BiSolidLaugh size={32} />} label="Snaps"></TabBarIcon>
      </StyledLink>
      <StyledLink to="/about">
        <TabBarIcon icon={<IoHome size={32} />} label="About"></TabBarIcon>
      </StyledLink>
      <StyledLink to="/test">
        <TabBarIcon icon={<IoHome size={32} />} label="Test"></TabBarIcon>
      </StyledLink>

      <Spacer></Spacer>

      <div className="flex flex-row items-center justify-center">
        <NewVideoIconDesktop></NewVideoIconDesktop>
      </div>

      <StyledLink to="/profile">
        <div className="flex flex-col items-center gap-1">
          <Avatar size={56}></Avatar>
          <div
            className={`whitespace-nowrap text-sm text-pink-700 dark:text-pink-200 ${isAlwaysDark && '!text-pink-200'}`}
          >
            {userInfo ? userInfo.user_name : 'Login'}
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
