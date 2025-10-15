'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { IEvent } from '@/models/Event';

interface EventCardProps {
  event: {
    _id: string;
    title: string;
    description: string;
    date: string;
    duration?: string;
    location?: string;
    maxParticipants?: number;
    registeredCount: number;
    status: string;
  };
}

export default function EventCard({ event }: EventCardProps) {
  const eventDate = new Date(event.date);
  const isUpcoming = eventDate > new Date();
  const spotsLeft = event.maxParticipants
    ? event.maxParticipants - event.registeredCount
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="card group"
    >
      <div className="flex flex-col h-full">
        {/* Status Badge */}
        <div className="flex items-center justify-between mb-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              event.status === 'upcoming'
                ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30'
                : event.status === 'ongoing'
                ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/30'
                : 'bg-gray-700 text-gray-300 border border-gray-600'
            }`}
          >
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </span>
          {spotsLeft !== null && spotsLeft > 0 && (
            <span className="text-xs text-gray-400">
              {spotsLeft} spots left
            </span>
          )}
        </div>

        {/* Event Title */}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-blue transition-colors">
          {event.title}
        </h3>

        {/* Event Description */}
        <p className="text-gray-400 text-sm mb-4 flex-grow line-clamp-3">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-400">
            <svg
              className="w-4 h-4 mr-2 text-neon-blue"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {eventDate.toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </div>
          {event.duration && (
            <div className="flex items-center text-sm text-gray-400">
              <svg
                className="w-4 h-4 mr-2 text-neon-blue"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {event.duration}
            </div>
          )}
          {event.location && (
            <div className="flex items-center text-sm text-gray-400">
              <svg
                className="w-4 h-4 mr-2 text-neon-blue"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {event.location}
            </div>
          )}
        </div>

        {/* Register Button */}
        {isUpcoming && event.status === 'upcoming' && (
          <Link
            href={`/register?event=${encodeURIComponent(event.title)}`}
            className="w-full px-4 py-2 bg-transparent border-2 border-neon-blue text-neon-blue rounded-lg font-semibold hover:bg-neon-blue hover:text-dark-900 transition-all duration-300 text-center group-hover:shadow-lg group-hover:shadow-neon-blue/50"
          >
            Register Now
          </Link>
        )}
      </div>
    </motion.div>
  );
}
