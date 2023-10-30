import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useMediaQuery } from 'usehooks-ts';
import { TabBarHorizontal, TabBarVertical } from './components/TabBar/TabBar.tsx';
import { About } from './pages/About.tsx';
import { Counter } from './pages/Counter.tsx';
import { Home } from './pages/Home/Home.tsx';

const AppMain: FC = () => {
  console.log('[rerender] AppMain');
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/counter" element={<Counter />} />
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
};

const App: FC = () => {
  const isMobile = useMediaQuery('(max-width: 540px)');
  return (
    <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'}`}>
      <div className={`fixed z-50 ${isMobile ? 'bottom-0 left-0 w-screen' : 'left-0 top-0 h-[100dvh]'}`}>
        {isMobile ? <TabBarHorizontal></TabBarHorizontal> : <TabBarVertical></TabBarVertical>}
      </div>
      <main className={`flex-1 overflow-x-clip ${isMobile ? 'pb-[56]' : 'ps-[60px]'}`}>
        <AppMain></AppMain>
      </main>
    </div>
  );
};

export default App;
