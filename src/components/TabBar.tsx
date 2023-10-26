import { FC } from 'react';
import { IoHome } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { Spacer } from '../utils/Spacer.tsx';
import { TabBarIcon } from './TabBarIcon.tsx';

const TabBarHorizontal: FC = () => {
  return (
    <nav className="debug-outline flex flex-row justify-between gap-2 px-4">
      <Link to="/">
        <TabBarIcon icon={<IoHome size={32} />} label="Home"></TabBarIcon>
      </Link>
      <Link to="/about">
        <TabBarIcon icon={<IoHome size={32} />} label="About"></TabBarIcon>
      </Link>
      <Link to="/counter">
        <TabBarIcon icon={<IoHome size={32} />} label="Counter"></TabBarIcon>
      </Link>
    </nav>
  );
};

const TabBarVertical: FC = () => {
  return (
    <nav className="debug-outline flex flex-col gap-2">
      <Link to="/">
        <TabBarIcon icon={<IoHome size={32} />} label="Home"></TabBarIcon>
      </Link>
      <Link to="/about">
        <TabBarIcon icon={<IoHome size={32} />} label="About"></TabBarIcon>
      </Link>
      <Spacer></Spacer>
      <Link to="/counter">
        <TabBarIcon icon={<IoHome size={32} />} label="Counter"></TabBarIcon>
      </Link>
    </nav>
  );
};

export { TabBarHorizontal, TabBarVertical };
