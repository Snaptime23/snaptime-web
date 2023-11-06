import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login } from './components/Login/Login.tsx';
import { SpringTest } from './components/SpringTest/SpringTest.tsx';
import { TabBarHorizontal, TabBarVertical } from './components/TabBar/TabBar.tsx';
import { useIsMobile } from './hooks/useIsMobile.ts';
import { About } from './pages/About.tsx';
import { Home } from './pages/Home/Home.tsx';
import { Profile } from './pages/Profile/Profile.tsx';
import { useSelectLoginState } from './store/index.ts';

const AppMain: FC = () => {
  console.log('[rerender] AppMain');
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/test" element={<SpringTest />} />
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
};

const App: FC = () => {
  const loginState = useSelectLoginState();
  const isMobile = useIsMobile();
  return (
    <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'}`}>
      <div className={`fixed z-50 ${isMobile ? 'bottom-0 left-0 w-screen' : 'left-0 top-0 h-[100dvh]'}`}>
        {isMobile ? <TabBarHorizontal></TabBarHorizontal> : <TabBarVertical></TabBarVertical>}
      </div>
      <main className={`flex-1 overflow-x-clip ${isMobile ? 'pb-[56]' : 'ps-[80px]'}`}>
        <AppMain></AppMain>
      </main>
      {loginState.value && <Login></Login>}
    </div>
  );
};

export default App;
