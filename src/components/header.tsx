import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-background-secondary p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-text-accent">
          DALJEET SINGH
        </Link>
        <script defer src="https://cloud.umami.is/script.js" data-website-id="19c3990a-4818-469e-a67e-0f6942e7e77d"></script>
        <ul className="flex space-x-6">
          <li>
            <Link href="#about" className="hover:text-primary transition-colors">
              About
            </Link>
          </li>
          <li>
            <Link href="#projects" className="hover:text-primary transition-colors">
              Projects
            </Link>
          </li>
          <li>
            <Link href="#contact" className="hover:text-primary transition-colors">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}