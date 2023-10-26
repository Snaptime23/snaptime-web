import { FC } from 'react';
import { IoHome } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { Spacer } from '../utils/Spacer.tsx';
import { TabBarIcon } from './TabBarIcon.tsx';

const TabBarHorizontal: FC = () => {
  return (
    <nav className="debug-outline flex flex-row gap-2">
      <Link to="/" className="flex flex-1 flex-row justify-center">
        <TabBarIcon icon={<IoHome size={32} />} label="Home"></TabBarIcon>
      </Link>
      <Link to="/about" className="flex flex-1 flex-row justify-center">
        <TabBarIcon icon={<IoHome size={32} />} label="About"></TabBarIcon>
      </Link>
      <Link to="/counter" className="flex flex-1 flex-row justify-center">
        <TabBarIcon icon={<IoHome size={32} />} label="Counter"></TabBarIcon>
      </Link>
    </nav>
  );
};

const TabBarVertical: FC = () => {
  return (
    <nav className="debug-outline flex flex-col">
      <Link to="/" className="py-2">
        <TabBarIcon icon={<IoHome size={32} />} label="Home"></TabBarIcon>
      </Link>
      <Link to="/about" className="py-2">
        <TabBarIcon icon={<IoHome size={32} />} label="About"></TabBarIcon>
      </Link>
      <Spacer></Spacer>
      <Link to="/counter" className="py-2">
        <TabBarIcon icon={<IoHome size={32} />} label="Counter"></TabBarIcon>
      </Link>
    </nav>
  );
};

export { TabBarHorizontal, TabBarVertical };
