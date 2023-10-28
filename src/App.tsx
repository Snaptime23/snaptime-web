import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useMediaQuery } from 'usehooks-ts';
import { TabBarHorizontal, TabBarVertical } from './components/TabBar/TabBar.tsx';
import { About } from './pages/About.tsx';
import { Counter } from './pages/Counter.tsx';
import { Home } from './pages/Home/Home.tsx';

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
    <div className="flex flex-col">
      <div className="fixed bottom-0 left-0 w-screen">
        <TabBarHorizontal></TabBarHorizontal>
      </div>
      <main className="flex-1 overflow-x-clip pb-[56px]">
        <AppMain></AppMain>
      </main>
    </div>
  );
};

const AppDesktop: FC = () => {
  return (
    <div className="flex flex-row">
      <div className="fixed left-0 top-0 h-[100dvh]">
        <TabBarVertical></TabBarVertical>
      </div>
      <main className="flex-1 overflow-x-clip ps-[60px]">
        <AppMain></AppMain>
      </main>
    </div>
  );
};

const App: FC = () => {
  const isMobile = useMediaQuery('(max-width: 540px)');
  return isMobile ? <AppMobile /> : <AppDesktop />;
};

export default App;
