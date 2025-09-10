// src/app/page.tsx

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/projects';
import Contact from '@/components/Contact'; // 1. Import the Contact component

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4">
        <Hero />
        <About />
        <Projects />
        <Contact /> {/* 2. Place the Contact component here */}
      </main>
      <Footer />
    </div>
  );
}