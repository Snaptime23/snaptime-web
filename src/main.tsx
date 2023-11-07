import { createTheme, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.scss';
import { emitter, EmitterProvider } from './store/emitter/emitter.ts';
import { store } from './store/index.ts';

// // @ts-ignore no types
// import { ClickToComponent } from 'click-to-react-component';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const rootDOM = document.querySelector<HTMLDivElement>('#root');
if (!rootDOM) {
  throw new Error('Root DOM not found');
}

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: {
      main: '#C93B76',
    },
  },
});

ReactDOM.createRoot(rootDOM).render(
  <React.StrictMode>
    <Provider store={store}>
      <EmitterProvider value={emitter}></EmitterProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
          {/* <ReactQueryDevtools /> */}
          {/* <ClickToComponent /> */}
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
