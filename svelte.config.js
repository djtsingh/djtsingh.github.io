import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      pages: 'docs',
      assets: 'docs',
      fallback: '404.html',
      precompress: false,
      strict: true
    }),
    paths: {
      base: ""
    },
    prerender: {
      handleHttpError: 'warn',
      entries: ['*']
    },
    serviceWorker: {
      register: false,
      files: (filename) => !filename.includes('node_modules')
    },
    csp: {
      mode: 'auto'
    }
  }
};

export default config;
