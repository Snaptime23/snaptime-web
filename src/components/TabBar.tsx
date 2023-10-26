import { FC } from 'react';
import { Link } from 'react-router-dom';

const TabBarHorizontal: FC = () => {
  return (
    <nav className="flex flex-row gap-2">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/counter">Counter</Link>
    </nav>
  );
};

const TabBarVertical: FC = () => {
  return (
    <nav className="flex flex-col gap-2">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/counter">Counter</Link>
    </nav>
  );
};

export { TabBarHorizontal, TabBarVertical };
