import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useMediaQuery } from 'usehooks-ts';
import { TabBarHorizontal, TabBarVertical } from './components/TabBar.tsx';
import { About } from './pages/About.tsx';
import { Counter } from './pages/Counter.tsx';
import { Home } from './pages/Home.tsx';

const AppMain: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/counter" element={<Counter />} />
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
};

const AppMobile: FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <AppMain></AppMain>
      </main>
      <TabBarHorizontal></TabBarHorizontal>
    </div>
  );
};

const AppDesktop: FC = () => {
  return (
    <div className="flex min-h-screen flex-row">
      <TabBarVertical></TabBarVertical>
      <main>
        <AppMain></AppMain>
      </main>
    </div>
  );
};

const App: FC = () => {
  const isMobile = useMediaQuery('(max-width: 400px)');
  return isMobile ? <AppMobile /> : <AppDesktop />;
};

export default App;
