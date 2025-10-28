'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/register', label: 'Register' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/contact', label: 'Contact' },
];

const tools = [
  { href: 'https://zehratechn8n.onrender.com', label: 'ZehraTech N8N', external: true },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showToolsDropdown, setShowToolsDropdown] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full z-50 bg-dark-900/95 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-neon-blue blur-lg opacity-50"></div>
              <span className="relative text-2xl font-bold text-neon-blue font-mono">
                ZehraTech
              </span>
            </div>
            <Image 
              src="/zehra.png" 
              alt="ZehraTech Logo" 
              width={40} 
              height={40}
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-neon-blue'
                    : 'text-gray-300 hover:text-neon-cyan'
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-blue"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            
            {/* Tools Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setShowToolsDropdown(true)}
                onMouseLeave={() => setShowToolsDropdown(false)}
                className="relative px-3 py-2 text-sm font-medium text-gray-300 hover:text-neon-cyan transition-colors"
              >
                Tools
                <svg className="w-4 h-4 inline-block ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <AnimatePresence>
                {showToolsDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    onMouseEnter={() => setShowToolsDropdown(true)}
                    onMouseLeave={() => setShowToolsDropdown(false)}
                    className="absolute top-full left-0 mt-2 w-56 bg-dark-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden z-50"
                  >
                    {tools.map((tool) => (
                      <a
                        key={tool.href}
                        href={tool.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-3 text-sm text-gray-300 hover:bg-dark-700 hover:text-neon-cyan transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span>{tool.label}</span>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/admin/login"
              className="px-4 py-2 text-sm font-medium text-dark-900 bg-neon-blue rounded-lg hover:bg-neon-cyan transition-all duration-300 hover:shadow-lg hover:shadow-neon-blue/50"
            >
              Admin
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-neon-blue hover:bg-dark-800 transition-colors"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-800 bg-dark-800"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? 'text-neon-blue bg-dark-700'
                      : 'text-gray-300 hover:text-neon-cyan hover:bg-dark-700'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile Tools Section */}
              <div className="border-t border-gray-700 mt-2 pt-2">
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Tools
                </div>
                {tools.map((tool) => (
                  <a
                    key={tool.href}
                    href={tool.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-neon-cyan hover:bg-dark-700 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span>{tool.label}</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
              
              <Link
                href="/admin/login"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-sm font-medium text-dark-900 bg-neon-blue rounded-lg hover:bg-neon-cyan transition-all duration-300 text-center"
              >
                Admin
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
