import replace from '@rollup/plugin-replace';
import { VitePWA } from 'vite-plugin-pwa';
// import basicSsl from '@vitejs/plugin-basic-ssl';
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
    // basicSsl(),
    // @ts-expect-error type error
    replace({
      __PLACEHOLDER_API_URL__: apiUrl,
      preventAssignment: true,
    }),
    VitePWA(),
  ],
  server: {
    // https: true,
  },
});
