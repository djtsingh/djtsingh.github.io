// src/components/Projects.tsx

'use client';

import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { projectsData } from '@/data/projects';
import ProjectCard from './projectcard';

export default function Projects() {    
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.section
      id="projects"
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      className="py-24"
    >
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center text-text-accent mb-12">
          My Projects
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}