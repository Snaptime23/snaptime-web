import replace from '@rollup/plugin-replace';
import react from '@vitejs/plugin-react-swc';
import process from 'process';
import { defineConfig } from 'vite';
import sassDts from 'vite-plugin-sass-dts';

const isDev = process.env.NODE_ENV === 'development';
const apiUrl = isDev ? 'https://snaptime-mockapi.d.reeky.org' : 'TODO: place url here';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sassDts(),
    replace({
      __PLACEHOLDER_API_URL__: apiUrl,
      preventAssignment: true,
    }),
  ],
});
