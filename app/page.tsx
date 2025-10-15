'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import EventCard from '@/components/EventCard';
import { useEffect, useState } from 'react';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events');
      if (response.ok) {
        const data = await response.json();
        setEvents(data.events || []);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0, 240, 255, 0.05) 25%, rgba(0, 240, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 240, 255, 0.05) 75%, rgba(0, 240, 255, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 240, 255, 0.05) 25%, rgba(0, 240, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 240, 255, 0.05) 75%, rgba(0, 240, 255, 0.05) 76%, transparent 77%, transparent)',
          backgroundSize: '50px 50px'
        }}></div>

        <div className="relative max-w-7xl mx-auto text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold leading-tight"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="block text-white mb-4">
                Empowering Young Minds with
              </span>
              <span className="block section-title">
                AI & Innovation
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Learn Artificial Intelligence, Cybersecurity, and Future Technologies
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <Link href="/register" className="btn-primary text-lg px-8 py-4">
                Register for Workshop
              </Link>
              <Link href="/portfolio" className="btn-secondary text-lg px-8 py-4">
                Learn More
              </Link>
            </motion.div>

            {/* Floating Icons */}
            <motion.div
              className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12 pt-12 sm:pt-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              {[
                { icon: '🤖', label: 'AI' },
                { icon: '🔒', label: 'Cybersecurity' },
                { icon: '💻', label: 'Tech' },
                { icon: '🚀', label: 'Innovation' },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className="flex flex-col items-center space-y-2"
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    delay: index * 0.2,
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                >
                  <span className="text-3xl sm:text-4xl">{item.icon}</span>
                  <span className="text-xs sm:text-sm text-gray-400 font-mono">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg
            className="w-6 h-6 text-neon-blue"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </section>

      {/* Upcoming Workshops Section */}
      <section id="workshops" className="py-20 px-4 sm:px-6 lg:px-8" style={{backgroundColor: 'rgba(17, 17, 17, 0.5)'}}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title">Upcoming Workshops</h2>
            <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto">
              Join our hands-on workshops designed to teach you practical AI and cybersecurity skills
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card animate-pulse">
                  <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-gray-700 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-700 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event: { _id: string; title: string; date: string; description: string; location: string; maxParticipants: number; registeredCount: number; status: string }) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No upcoming workshops at the moment. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* About ZehraTech Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                About <span className="glow-text">ZehraTech</span>
              </h2>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                ZehraTech is an AI and Tech Education brand founded by <span className="glow-text font-semibold">Yashab Alam</span>, 
                dedicated to empowering young minds with cutting-edge knowledge in Artificial Intelligence, Cybersecurity, and emerging technologies.
              </p>
              <p className="text-gray-400 mb-8 leading-relaxed">
                We believe in hands-on learning, practical applications, and making complex technologies accessible to students. 
                Our workshops are designed to inspire the next generation of innovators and problem-solvers.
              </p>
              <Link href="/portfolio" className="btn-primary inline-block">
                Meet the Founder
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4 sm:gap-6"
            >
              {[
                { title: 'Students Trained', value: '500+', icon: '👨‍🎓' },
                { title: 'Workshops', value: '25+', icon: '📚' },
                { title: 'Success Rate', value: '95%', icon: '⭐' },
                { title: 'Cities Covered', value: '10+', icon: '🌍' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.title}
                  className="card text-center p-4 sm:p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-3xl sm:text-4xl mb-2">{stat.icon}</div>
                  <div className="text-2xl sm:text-3xl font-bold glow-text mb-2">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-400">{stat.title}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{
        background: 'linear-gradient(to right, #111111, #0a0a0a, #111111)'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your AI Journey?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Join hundreds of students who have already transformed their future with ZehraTech
          </p>
          <Link href="/register" className="btn-primary text-lg px-10 py-4 inline-block">
            Register Now
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
