'use client'; // Client component for animations

import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

const skills = [
  'JavaScript (ES6+)',
  'TypeScript',
  'React',
  'Next.js',
  'Tailwind CSS',
  'Node.js',
  'Git & GitHub',
  'REST APIs',
];

export default function About() {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.2, // Trigger animation when 20% of the component is visible
    triggerOnce: true, // Only trigger the animation once
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: ['easeOut'] } },
  };

  return (
    <motion.section
      id="about"
      ref={ref}
      variants={sectionVariants}
      initial="hidden"
      animate={controls}
      className="py-24"
    >
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center text-text-accent mb-12">
          About Me
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-lg text-text leading-relaxed">
            <p className="mb-4">
              Hello! I'm Daljeet, a passionate developer with a love for creating clean, intuitive, and high-performance web applications. My journey into web development started with a curiosity for how things work on the internet, and it has since grown into a full-fledged passion.
            </p>
            <p>
              I thrive on turning complex problems into simple, beautiful, and functional designs. I'm always eager to learn new technologies and improve my craft, and I'm currently excited about exploring the depths of serverless architecture and advanced animations.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-text-accent mb-4">My Skills</h3>
            <ul className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <li
                  key={index}
                  className="bg-background-secondary text-primary font-medium px-4 py-2 rounded-lg"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
}