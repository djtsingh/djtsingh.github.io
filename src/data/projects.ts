// src/data/projects.ts

export interface Project {
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl: string;
}

export const projectsData: Project[] = [
  {
    title: 'Project One',
    description:
      'A brief and engaging description of your project. Talk about the problem it solves and the key features.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'Project Two',
    description:
      'This project demonstrates my ability to work with APIs and manage complex state. It includes features like X, Y, and Z.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'Project Three',
    description:
      'A fun, interactive application built to explore a new technology. This was a great learning experience.',
    tags: ['SvelteKit', 'TypeScript', 'Tailwind CSS'],
    githubUrl: '#',
  },
];