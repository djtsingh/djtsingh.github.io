# Daljeet Singh Portfolio - SvelteKit

A modern, component-based portfolio built with SvelteKit and deployed to GitHub Pages.

## 🛠️ Tech Stack

- **Framework**: SvelteKit with static adapter
- **Styling**: Tailwind CSS + Custom CSS variables (Catppuccin theme)
- **Fonts**: JetBrains Mono (self-hosted)
- **Icons**: Tabler Icons
- **Deployment**: GitHub Pages via GitHub Actions

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Navigate to the sveltekit folder
cd sveltekit

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The static site will be generated in the `build/` folder.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
sveltekit/
├── src/
│   ├── app.css           # Global styles + design tokens
│   ├── app.html          # HTML template
│   ├── lib/
│   │   └── components/
│   │       ├── Header.svelte
│   │       ├── Footer.svelte
│   │       ├── SEO.svelte
│   │       └── ThemeSelector.svelte
│   └── routes/
│       ├── +layout.svelte
│       ├── +page.svelte          # Home page
│       ├── about/+page.svelte
│       ├── projects/+page.svelte
│       └── posts/+page.svelte
├── static/
│   ├── assets/           # Images, resume, etc.
│   ├── fonts/            # Self-hosted WOFF2 fonts
│   └── projects/         # Project images
├── .github/workflows/
│   └── deploy.yml        # GitHub Pages deployment
├── svelte.config.js
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## 🎨 Theming

The site uses the Catppuccin color palette with 4 theme variants:
- **Latte** (light)
- **Frappe** (mid-dark)
- **Macchiato** (dark)
- **Mocha** (darkest, default)

Each theme also supports 14 accent colors. Preferences are persisted in localStorage.

## 📝 Adding Content

### Adding a New Project

Edit the `projects` array in `src/routes/projects/+page.svelte`:

```javascript
const projects = [
  {
    title: 'My New Project',
    description: 'A brief description of the project.',
    image: '/projects/my-project.webp',
    tags: ['Tag1', 'Tag2'],
    links: {
      live: 'https://example.com',
      source: 'https://github.com/user/repo'
    }
  },
  // ... more projects
];
```

### Adding a New Page

1. Create a new folder in `src/routes/` (e.g., `src/routes/blog/`)
2. Add `+page.svelte` with your content
3. Import and use the `SEO` component for meta tags
4. Add navigation link in `Header.svelte`

## 🚀 Deployment

The site auto-deploys to GitHub Pages on push to `main` branch via GitHub Actions.

### Manual Deployment

1. Build the site: `npm run build`
2. The `build/` folder contains the static site
3. Deploy to any static host (Netlify, Vercel, Cloudflare Pages, etc.)

## 📋 Migration Notes

This SvelteKit version replaces the previous static HTML site. Key improvements:

- **Component reuse**: Header, Footer, SEO are shared across all pages
- **Scoped CSS**: Each component has isolated styles
- **Data-driven**: Projects loaded from a central data source
- **Type safety**: Can add TypeScript for better DX
- **Better DX**: Hot module replacement, instant feedback

## 📄 License

MIT
