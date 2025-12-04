# My first Portfolio website

A modern, component-based portfolio built with SvelteKit and deployed to GitHub Pages.

**[➡️ View the Live Site](https://www.daljeetsingh.me/)**

---

## 🛠️ Tech Stack

- **Framework**: SvelteKit with static adapter
- **Styling**: Tailwind CSS + Custom CSS variables (Catppuccin theme)
- **Fonts**: JetBrains Mono (self-hosted)
- **Icons**: Tabler Icons
- **Deployment**: GitHub Pages (from `/docs` folder)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
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

The static site will be generated in the `docs/` folder.

### Preview Production Build

```bash
npm run preview
```

---

## 📁 Project Structure

```
daljeetsingh.me/
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
│       ├── +layout.js
│       ├── +page.svelte          # Home page
│       ├── about/+page.svelte
│       ├── projects/+page.svelte
│       └── posts/+page.svelte
├── static/
│   ├── assets/           # Images, resume
│   ├── fonts/            # Self-hosted WOFF2 fonts
│   └── projects/         # Project images
├── docs/                 # Build output (served by GitHub Pages)
├── svelte.config.js
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## 🎨 Theming

The site uses the Catppuccin color palette with 4 theme variants:
- **Latte** (light)
- **Frappe** (mid-dark)
- **Macchiato** (dark)
- **Mocha** (darkest, default)

Each theme also supports 14 accent colors. Preferences are persisted in localStorage.

---

## 🚀 Deployment

1. Run `npm run build` to generate the static site in `/docs`
2. Commit and push to `main` branch
3. In GitHub repo settings → Pages → Source: select **main branch** and **/docs folder**

---

## 📄 License

MIT
