'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useSearchParams } from 'next/navigation';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  class: z.enum(['9', '10', '11', '12', 'UG', 'PG'], { message: 'Please select a class' }),
  course: z.string().optional(),
  section: z.string().optional(),
  school: z.string().min(2, 'School name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  event: z.string().min(1, 'Please select an event'),
  resume: z.any().optional(),
});

type RegisterFormData = z.infer<typeof registerSchema>;

function RegisterForm() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const searchParams = useSearchParams();
  const selectedEvent = searchParams.get('event');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      event: selectedEvent || '',
    },
  });

  const classValue = watch('class');

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
    }
  };

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('class', data.class);
      if (data.course) formData.append('course', data.course);
      if (data.section) formData.append('section', data.section);
      formData.append('school', data.school);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      formData.append('event', data.event);

      if (data.resume && data.resume[0]) {
        formData.append('resume', data.resume[0]);
      }

      const response = await fetch('/api/register', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(true);
        reset();
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(result.error || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-purple">
              Workshop Registration
            </span>
          </h1>
          <p className="text-gray-400 text-center mb-12">
            Fill out the form below to register for our upcoming workshop
          </p>

          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500 rounded-xl p-8 mb-6 text-center"
            >
              <div className="mb-4">
                <span className="text-6xl">🎉</span>
              </div>
              <h2 className="text-2xl font-bold text-green-400 mb-3">
                Thank You for Registering!
              </h2>
              <p className="text-green-300 text-lg mb-4">
                Your registration has been successfully submitted.
              </p>
              <div className="bg-dark-800/50 rounded-lg p-4 mb-4">
                <p className="text-gray-300 mb-2">
                  <span className="text-neon-cyan font-semibold">What's next?</span>
                </p>
                <ul className="text-gray-400 text-sm space-y-2 text-left max-w-md mx-auto">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>You'll receive a confirmation email within 24 hours</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>Our team will contact you with workshop details</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>Prepare to embark on an amazing learning journey!</span>
                  </li>
                </ul>
              </div>
              <p className="text-gray-400 text-sm">
                Have questions? Contact us at <a href="tel:+918960457971" className="text-neon-blue hover:text-neon-cyan">+91 8960457971</a>
              </p>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/20 border border-red-500 text-red-300 px-6 py-4 rounded-lg mb-6"
            >
              ❌ {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="card space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                {...register('name')}
                className="input-field"
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
              )}
            </div>

            {/* Class & School Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="class" className="block text-sm font-medium text-gray-300 mb-2">
                  Class <span className="text-red-500">*</span>
                </label>
                <select id="class" {...register('class')} className="input-field">
                  <option value="">Select Class</option>
                  <option value="9">Class 9</option>
                  <option value="10">Class 10</option>
                  <option value="11">Class 11</option>
                  <option value="12">Class 12</option>
                  <option value="UG">UG (Undergraduate)</option>
                  <option value="PG">PG (Postgraduate)</option>
                </select>
                {errors.class && (
                  <p className="mt-1 text-sm text-red-400">{errors.class.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="school" className="block text-sm font-medium text-gray-300 mb-2">
                  School/Institute <span className="text-red-500">*</span>
                </label>
                <input
                  id="school"
                  type="text"
                  {...register('school')}
                  className="input-field"
                  placeholder="Your school name"
                />
                {errors.school && (
                  <p className="mt-1 text-sm text-red-400">{errors.school.message}</p>
                )}
              </div>
            </div>

            {/* Section */}
            <div>
              <label htmlFor="section" className="block text-sm font-medium text-gray-300 mb-2">
                Section
              </label>
              <input
                id="section"
                type="text"
                {...register('section')}
                className="input-field"
                placeholder="Enter section (e.g., A, B, C)"
              />
              <p className="mt-1 text-xs text-gray-500">Optional: Enter your class section</p>
            </div>

            {/* Conditional Course Selection for UG/PG */}
            {(classValue === 'UG' || classValue === 'PG') && (
              <div>
                <label htmlFor="course" className="block text-sm font-medium text-gray-300 mb-2">
                  Course <span className="text-red-500">*</span>
                </label>
                <select id="course" {...register('course')} className="input-field">
                  <option value="">Select Course</option>
                  {classValue === 'UG' && (
                    <>
                      <option value="BTech">B.Tech</option>
                      <option value="BBA">BBA</option>
                      <option value="BCA">BCA</option>
                      <option value="BSc">B.Sc</option>
                    </>
                  )}
                  {classValue === 'PG' && (
                    <>
                      <option value="MBA">MBA</option>
                      <option value="MCA">MCA</option>
                      <option value="MSc">M.Sc</option>
                    </>
                  )}
                </select>
                {errors.course && (
                  <p className="mt-1 text-sm text-red-400">{errors.course.message}</p>
                )}
              </div>
            )}

            {/* Email & Phone Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  className="input-field"
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  {...register('phone')}
                  className="input-field"
                  placeholder="9876543210"
                  maxLength={10}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>
                )}
              </div>
            </div>

            {/* Event Selection */}
            <div>
              <label htmlFor="event" className="block text-sm font-medium text-gray-300 mb-2">
                Select Workshop <span className="text-red-500">*</span>
              </label>
              <select id="event" {...register('event')} className="input-field">
                <option value="">Choose a workshop</option>
                {events.map((event: { _id: string; title: string; date: string }) => (
                  <option key={event._id} value={event.title}>
                    {event.title} - {new Date(event.date).toLocaleDateString()}
                  </option>
                ))}
              </select>
              {errors.event && (
                <p className="mt-1 text-sm text-red-400">{errors.event.message}</p>
              )}
            </div>

            {/* Resume Upload */}
            <div>
              <label htmlFor="resume" className="block text-sm font-medium text-gray-300 mb-2">
                Upload Resume (Optional)
              </label>
              <input
                id="resume"
                type="file"
                {...register('resume')}
                className="input-field file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-neon-blue file:text-dark-900 hover:file:bg-neon-cyan cursor-pointer"
                accept=".pdf,.doc,.docx"
              />
              <p className="mt-1 text-xs text-gray-500">PDF, DOC, or DOCX (Max 5MB)</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Registering...' : 'Register Now'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-blue mx-auto"></div>
          <p className="text-gray-400 mt-4">Loading...</p>
        </div>
      </div>
    }>
      <RegisterForm />
    </Suspense>
  );
}
