<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
  
</head>
<body>
    <main>
        <h1>✨ Daljeet Singh - My First Portfolio Website</h1>
        <p>Welcome to the source code of my personal developer portfolio! This project is a clean, modern, and fully responsive single-page application built with the latest web technologies. It's designed to showcase my skills, feature my projects, and provide an easy way for visitors to get in touch.</p>
        <p><a href="https://www.daljeetsingh.me/"><strong>➡️ View the Live Site</strong></a></p>
        <hr>
        <h2>🚀 Features</h2>
        <ul>
            <li><strong>⚡ Blazing Fast Performance:</strong> Statistically generated with Next.js for instant load times and optimal SEO.</li>
            <li><strong>📱 Fully Responsive Design:</strong> Looks and works perfectly on any device, from mobile phones to desktops.</li>
            <li><strong>🎨 Modern & Minimalist UI:</strong> A clean, dark-themed design built with Tailwind CSS for a professional and visually appealing experience.</li>
            <li><strong>🎬 Smooth Animations:</strong> Interactive and elegant animations powered by Framer Motion to bring the UI to life.</li>
            <li><strong>🧩 Component-Based Architecture:</strong> Built with reusable React components for clean, scalable, and maintainable code.</li>
            <li><strong>📝 Functional Contact Form:</strong> An integrated, spam-protected contact form using Formspree and validated with <code>react-hook-form</code> & <code>zod</code>.</li>
            <li><strong>♿ Accessibility:</strong> Designed with semantic HTML and accessibility best practices in mind.</li>
        </ul>
        <hr>
        <h2>🛠️ Tech Stack</h2>
        <p>This project leverages a modern, industry-standard tech stack to achieve its performance and design goals.</p>
        <table>
            <thead>
                <tr>
                    <th>Technology</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Next.js</strong></td>
                    <td>React framework for Static Site Generation (SSG).</td>
                </tr>
                <tr>
                    <td><strong>React</strong></td>
                    <td>Core library for building the user interface.</td>
                </tr>
                <tr>
                    <td><strong>TypeScript</strong></td>
                    <td>For type safety and a better developer experience.</td>
                </tr>
                <tr>
                    <td><strong>Tailwind CSS</strong></td>
                    <td>A utility-first CSS framework for custom styling.</td>
                </tr>
                <tr>
                    <td><strong>Framer Motion</strong></td>
                    <td>For declarative and powerful animations.</td>
                </tr>
                <tr>
                    <td><strong>React Hook Form</strong></td>
                    <td>Performant and flexible form management.</td>
                </tr>
                <tr>
                    <td><strong>Zod</strong></td>
                    <td>Schema validation for the contact form.</td>
                </tr>
                 <tr>
                    <td><strong>React Icons</strong></td>
                    <td>For including popular icons easily.</td>
                </tr>
                <tr>
                    <td><strong>GitHub Pages</strong></td>
                    <td>For hosting the static website.</td>
                </tr>
            </tbody>
        </table>
        <hr>
        <h2>📂 Project Structure</h2>
        <p>The project follows a clean and intuitive structure, organized for scalability and ease of navigation.</p>
        <pre><code>daljeetsingh.me/
├── public/                 # Static assets (resume, images, favicon)
│   ├── .nojekyll           # Disables Jekyll on GitHub Pages
│   └── CNAME               # Custom domain configuration
├── src/
│   ├── app/                # Next.js App Router (pages & layouts)
│   │   ├── globals.css     # Global styles and Tailwind directives
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Main homepage component
│   ├── components/         # Reusable React components
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── ProjectCard.tsx
│   │   └── Projects.tsx
│   └── data/               # Project data and other static content
│       └── projects.ts
├── .eslintrc.mjs           # ESLint configuration
├── next.config.js          # Next.js configuration
├── package.json            # Project dependencies and scripts
└── tailwind.config.js      # Tailwind CSS theme configuration
</code></pre>
        <hr>
        <h2>🚀 Getting Started</h2>
        <p>To get a local copy up and running, follow these simple steps.</p>
        <h3>Prerequisites</h3>
        <p>Make sure you have Node.js (v18.x or later) and npm installed on your machine.</p>
        <h3>Installation & Setup</h3>
        <ol>
            <li>
                <p><strong>Clone the repository:</strong></p>
                <pre><code>git clone https://github.com/djtsingh/djtsingh.github.io.git</code></pre>
            </li>
            <li>
                <p><strong>Navigate to the project directory:</strong></p>
                <pre><code>cd djtsingh.github.io</code></pre>
            </li>
            <li>
                <p><strong>Install dependencies:</strong></p>
                <pre><code>npm install</code></pre>
            </li>
            <li>
                <p><strong>Run the development server:</strong></p>
                <pre><code>npm run dev</code></pre>
                <p>Open <a href="http://localhost:3000">http://localhost:3000</a> with your browser to see the result.</p>
            </li>
        </ol>
        <hr>
        <h2>📜 Development Scripts</h2>
        <p>This project comes with a few useful scripts defined in <code>package.json</code>:</p>
        <ul>
            <li><code>npm run dev</code>: Starts the development server with hot-reloading.</li>
            <li><code>npm run build</code>: Creates an optimized, production-ready static build in the <code>out</code> folder.</li>
            <li><code>npm run deploy</code>: Deploys the contents of the <code>out</code> folder to the <code>gh-pages</code> branch.</li>
            <li><code>npm run lint</code>: Runs ESLint to check for code quality issues.</li>
        </ul>
        <hr>
        <h2>✍️ Author</h2>
        <p><strong>Daljeet Singh</strong></p>
        <ul>
            <li>GitHub: <a href="https://github.com/djtsingh">@djtsingh</a></li>
            <li>LinkedIn: <a href="https://www.linkedin.com/in/djtsingh/">LinkedIn</a> <!-- TODO: Add your LinkedIn profile URL --></li>
        </ul>
        <hr>

        <p>If you found this project interesting or helpful, please give it a ⭐️!</p>
        <hr>
        <h2>📄 License</h2>
        <p>This project is licensed under the AGPL-3.0 license.</p>
    </main>
</body>
</html>
