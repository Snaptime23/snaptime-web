process.env.ESLINT_USE_FLAT_CONFIG = 'true';

/** @type {import('lint-staged').Config} */
export default {
  '**/*.{ts,tsx,cts,mts}': (filenames) => {
    return `pnpm exec eslint --max-warnings 0 ${filenames.join(' ')}`;
  },
  '**/*.{js,jsx,cjs,mjs}': (filenames) => {
    return `pnpm exec eslint --max-warnings 0 ${filenames.join(' ')}`;
  },
};
