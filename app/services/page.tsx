'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const services = [
  {
    id: 1,
    icon: '🤖',
    title: 'AI Automation',
    description: 'Transform your business with intelligent automation solutions powered by artificial intelligence and machine learning.',
    features: [
      'Custom AI chatbots',
      'Process automation',
      'Predictive analytics',
      'Natural language processing',
      'Computer vision solutions',
    ],
    color: 'from-neon-blue to-neon-cyan',
  },
  {
    id: 2,
    icon: '🌐',
    title: 'Website Development',
    description: 'Modern, responsive, and high-performance websites built with cutting-edge technologies to elevate your online presence.',
    features: [
      'Responsive web design',
      'E-commerce platforms',
      'Progressive web apps',
      'SEO optimization',
      'Fast loading & secure',
    ],
    color: 'from-neon-cyan to-neon-purple',
  },
  {
    id: 3,
    icon: '💻',
    title: 'Custom Software Development',
    description: 'Tailored software solutions designed to meet your specific business needs and drive digital transformation.',
    features: [
      'Enterprise applications',
      'Mobile app development',
      'API development & integration',
      'Cloud solutions',
      'Legacy system modernization',
    ],
    color: 'from-neon-purple to-pink-500',
  },
  {
    id: 4,
    icon: '🔒',
    title: 'Cybersecurity Tools',
    description: 'Advanced security tools and solutions to protect your digital assets and ensure robust cybersecurity posture.',
    features: [
      'Penetration testing tools',
      'Vulnerability scanners',
      'Security automation',
      'Threat detection systems',
      'Custom security solutions',
    ],
    color: 'from-pink-500 to-red-500',
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-purple">
              Our Services
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
            Comprehensive technology solutions to transform your business and drive innovation. 
            From AI automation to cybersecurity, we deliver excellence.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card group hover:border-neon-blue/50 transition-all duration-300"
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center text-3xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-gray-400">{service.description}</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-neon-cyan uppercase tracking-wider">Key Features:</h4>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-gray-300">
                      <span className="text-neon-blue mt-1">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-700">
                <Link
                  href="/contact"
                  className="inline-flex items-center text-neon-blue hover:text-neon-cyan transition-colors font-semibold"
                >
                  Get Started
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card bg-gradient-to-br from-neon-blue/10 to-neon-purple/10 border-neon-blue/30"
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Why Choose ZehraTech?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-neon-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Expert Team</h3>
              <p className="text-gray-400">Skilled professionals with years of experience in AI, development, and cybersecurity</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-neon-cyan/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Fast Delivery</h3>
              <p className="text-gray-400">Agile development process ensuring quick turnaround without compromising quality</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-neon-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💎</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Quality Assured</h3>
              <p className="text-gray-400">Rigorous testing and quality control for reliable, scalable solutions</p>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss your project and create innovative solutions that drive results
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary text-lg px-8 py-4">
              Contact Us
            </Link>
            <Link href="/portfolio" className="btn-secondary text-lg px-8 py-4">
              View Portfolio
            </Link>
          </div>
        </motion.div>

        {/* Technologies Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Technologies We Work With</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'Python', 'JavaScript', 'React', 'Next.js', 'Node.js', 'TensorFlow',
              'PyTorch', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes',
              'FastAPI', 'Django', 'TypeScript', 'Tailwind CSS'
            ].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="px-4 py-2 bg-dark-700 border border-gray-700 rounded-lg text-gray-300 hover:border-neon-blue/50 hover:text-neon-blue transition-all duration-300 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
