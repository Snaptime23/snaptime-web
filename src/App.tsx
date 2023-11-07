import { Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { FC, forwardRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login } from './components/Login/Login.tsx';
import { TabBarHorizontal, TabBarVertical } from './components/TabBar/TabBar.tsx';
import { useIsMobile } from './hooks/useIsMobile.ts';
import { Anime, Fasion, Food, Gaming, Home, Life, Music } from './pages/Home/Home.tsx';
import { Profile } from './pages/Profile/Profile.tsx';
import { useListenEvent } from './store/emitter/emitter.ts';
import { useSelectLoginState } from './store/index.ts';

const AppMain: FC = () => {
  console.log('[rerender] AppMain');

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/snaps/gaming" element={<Gaming />} />
      <Route path="/snaps/anime" element={<Anime />} />
      <Route path="/snaps/music" element={<Music />} />
      <Route path="/snaps/food" element={<Food />} />
      <Route path="/snaps/fashion" element={<Fasion />} />
      <Route path="/snaps/life" element={<Life />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
};

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const App: FC = () => {
  const [snackBaropen, setSnackBarOpen] = useState(false);
  const [snackBarSeverity, setSnackBarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('success');
  const [snackBarMessage, setSnackBarMessage] = useState('');

  const loginState = useSelectLoginState();
  const isMobile = useIsMobile();
  useListenEvent('openSnackbar', (data) => {
    setSnackBarSeverity(data.severity);
    setSnackBarMessage(data.message);
    setSnackBarOpen(true);
  });

  return (
    <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'}`}>
      <div className={`fixed z-50 ${isMobile ? 'bottom-0 left-0 w-screen' : 'left-0 top-0 h-[100dvh]'}`}>
        {isMobile ? <TabBarHorizontal></TabBarHorizontal> : <TabBarVertical></TabBarVertical>}
      </div>
      <main className={`flex-1 overflow-x-clip ${isMobile ? 'pb-[56]' : 'ps-[80px]'}`}>
        <AppMain></AppMain>
      </main>
      <Snackbar
        open={snackBaropen}
        autoHideDuration={5000}
        onClose={() => {
          setSnackBarOpen(false);
        }}
      >
        <Alert severity={snackBarSeverity}>{snackBarMessage}</Alert>
      </Snackbar>
      {loginState.value && <Login></Login>}
    </div>
  );
};

export default App;
