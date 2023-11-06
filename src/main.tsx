import { createTheme, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.scss';
import { store } from './store/index.ts';

// @ts-expect-error no types
import { ClickToComponent } from 'click-to-react-component';

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
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
          <ReactQueryDevtools />
          <ClickToComponent />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
