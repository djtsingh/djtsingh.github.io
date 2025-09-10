// src/components/ProjectCard.tsx

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      className="bg-background-secondary rounded-lg p-6 border border-transparent hover:border-primary transition-all flex flex-col"
    >
      <div className="flex-grow">
        <h3 className="text-2xl font-bold text-text-accent mb-3">{project.title}</h3>
        <p className="text-text mb-4">{project.description}</p>
        <ul className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <li key={tag} className="bg-background text-primary text-sm font-medium px-3 py-1 rounded-full">
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center space-x-4 mt-auto">
        <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-text hover:text-primary transition-colors">
          <FiGithub size={24} />
        </Link>
        {project.liveUrl && (
          <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-text hover:text-primary transition-colors">
            <FiExternalLink size={24} />
          </Link>
        )}
      </div>
    </motion.div>
  );
}