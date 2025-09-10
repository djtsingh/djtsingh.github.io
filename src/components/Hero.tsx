'use client'; // This is a client component, because we're using Framer Motion

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="min-h-[75vh] flex items-center justify-center text-center">
      <motion.div
        className="max-w-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-text-accent mb-4"
          variants={itemVariants}
        >
          Hey!, I&apos;m Daljeet Singh
        </motion.h1>

        <motion.p className="text-xl md:text-2xl text-text mb-8" variants={itemVariants}>
          A Creative Developer Building Modern Web Experiences.
        </motion.p>

        <motion.div className="flex justify-center space-x-4" variants={itemVariants}>
          <Link
            href="#projects"
            className="bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-opacity-80 transition-all"
          >
            View My Work
          </Link>
          <a
            href="/resume.pdf" // We will add the resume PDF to the `public` folder later
            target="_blank"
            rel="noopener noreferrer"
            className="bg-background-secondary text-text-accent font-semibold px-6 py-3 rounded-lg hover:bg-opacity-80 transition-all"
          >
            Download Resume
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}