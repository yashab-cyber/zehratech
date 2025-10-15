'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function PortfolioPage() {
  const workshops = [
    {
      title: 'AI for Beginners - 3 Day Workshop',
      date: 'October 2024',
      participants: '120+ students',
      location: 'Multiple Cities',
    },
    {
      title: 'Cybersecurity Fundamentals',
      date: 'September 2024',
      participants: '80+ students',
      location: 'Online',
    },
    {
      title: 'Machine Learning Bootcamp',
      date: 'August 2024',
      participants: '150+ students',
      location: 'Hybrid',
    },
  ];

  const skills = [
    'Artificial Intelligence',
    'Machine Learning',
    'Deep Learning',
    'Cybersecurity',
    'Ethical Hacking',
    'Python Programming',
    'Data Science',
    'Neural Networks',
    'Computer Vision',
    'NLP',
  ];

  const projects = [
    {
      title: 'AI-Powered Chatbot Framework',
      description: 'Developed an intelligent chatbot system for educational purposes',
      tech: ['Python', 'TensorFlow', 'NLP'],
    },
    {
      title: 'Cybersecurity Training Platform',
      description: 'Created comprehensive cyber training modules for students',
      tech: ['React', 'Node.js', 'MongoDB'],
    },
    {
      title: 'Student Management System',
      description: 'Built a complete LMS with AI-powered analytics',
      tech: ['Next.js', 'AI/ML', 'Database'],
    },
  ];

  const certificates = [
    {
      title: 'Professional Certification',
      image: '/cetificates/IMG_20230704_132352_211.webp',
      description: 'Achievement in AI and Technology',
    },
    {
      title: 'Professional Achievement',
      image: '/cetificates/yashab alam-signed_page-0001.jpg',
      description: 'Recognition for Excellence',
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-purple">
              Yashab Alam
            </span>
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 mb-4">
            AI & Cybersecurity Trainer | Researcher | Founder of ZehraTech
          </p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Passionate about empowering the next generation with AI and cybersecurity knowledge.
            Teaching complex technologies in simple, practical ways.
          </p>
          
          <div className="flex justify-center gap-4 mt-8">
            <a
              href="https://github.com/yashab-cyber"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <svg className="w-5 h-5 inline-block mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/yashab-alam"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <svg className="w-5 h-5 inline-block mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
            <Link href="/contact" className="btn-primary">
              Contact Me
            </Link>
          </div>
        </motion.div>

        {/* About Me Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card"
          >
            <h2 className="text-3xl font-bold text-neon-blue mb-6">About Me</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                I am <strong className="text-white">Yashab Alam</strong>, an AI & Cybersecurity Trainer, Researcher, and the Founder of <strong className="text-neon-blue">ZehraTech</strong>. 
                My mission is to bridge the gap between complex technologies and curious young minds.
              </p>
              <p>
                With years of experience in Artificial Intelligence, Machine Learning, and Cybersecurity, I have trained over <strong className="text-neon-cyan">500+ students</strong> across 
                multiple cities, helping them understand and implement real-world AI solutions.
              </p>
              <p>
                I believe that the future belongs to those who understand technology, and my goal is to make AI and cybersecurity education accessible, 
                practical, and exciting for students from all backgrounds.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple">
                Skills & Expertise
              </span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="card text-center hover:border-neon-blue/70"
                >
                  <p className="text-gray-300 font-medium">{skill}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Workshops Conducted */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple">
                Workshops Conducted
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {workshops.map((workshop, index) => (
                <motion.div
                  key={workshop.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card"
                >
                  <h3 className="text-xl font-bold text-white mb-3">{workshop.title}</h3>
                  <div className="space-y-2 text-sm text-gray-400">
                    <p>📅 {workshop.date}</p>
                    <p>👥 {workshop.participants}</p>
                    <p>📍 {workshop.location}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple">
                Notable Projects
              </span>
            </h2>
            <div className="space-y-6">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card"
                >
                  <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-neon-blue/20 text-neon-blue text-sm rounded-full border border-neon-blue/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Certificates & Achievements Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple">
                Certificates & Achievements
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {certificates.map((cert, index) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="card group hover:border-neon-blue/70 transition-all duration-300"
                >
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <div className="relative h-64 md:h-80 bg-dark-700">
                      <Image
                        src={cert.image}
                        alt={cert.title}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{cert.title}</h3>
                  <p className="text-gray-400 text-sm">{cert.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card text-center bg-gradient-to-r from-dark-800 via-dark-900 to-dark-800"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Let&apos;s Connect!</h2>
          <p className="text-gray-300 mb-8">
            Interested in collaborating or have questions about AI and Cybersecurity?
          </p>
          <Link href="/contact" className="btn-primary inline-block">
            Get in Touch
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
