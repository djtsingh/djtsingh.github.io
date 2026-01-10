import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';
import { createHighlighter } from 'shiki';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create Shiki highlighter with Catppuccin themes
const highlighter = await createHighlighter({
  themes: ['catppuccin-mocha', 'catppuccin-latte'],
  langs: ['javascript', 'typescript', 'svelte', 'html', 'css', 'json', 'bash', 'python', 'markdown', 'yaml', 'sql']
});

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
  extensions: ['.md'],
  highlight: {
    highlighter: async (code, lang = 'text') => {
      const html = highlighter.codeToHtml(code, {
        lang,
        themes: {
          dark: 'catppuccin-mocha',
          light: 'catppuccin-latte'
        }
      });
      return `{@html \`${html.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`}`;
    }
  },
  rehypePlugins: [
    rehypeSlug,
    [
      rehypeAutolinkHeadings,
      {
        behavior: 'wrap',
        properties: {
          className: ['heading-anchor']
        }
      }
    ]
  ]
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],
  preprocess: [mdsvex(mdsvexOptions)],
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
      entries: ['*', '/sitemap.xml', '/rss.xml']
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
