'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-purple">
              Terms of Service
            </span>
          </h1>
          <p className="text-gray-400 mb-8 sm:mb-12 text-sm sm:text-base">
            Last updated: October 15, 2025
          </p>

          <div className="space-y-8 sm:space-y-12">
            {/* Introduction */}
            <section className="card">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Agreement to Terms</h2>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                Welcome to ZehraTech. These Terms of Service (&quot;Terms&quot;) govern your access to and use of our website, 
                workshops, and services. By accessing or using our services, you agree to be bound by these Terms. If you 
                disagree with any part of these Terms, you may not access our services.
              </p>
            </section>

            {/* Services */}
            <section className="card">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Our Services</h2>
              <div className="space-y-3 text-gray-300 text-sm sm:text-base">
                <p>ZehraTech provides educational services including:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>AI and Technology workshops for students in classes 9-12</li>
                  <li>Cybersecurity training and education</li>
                  <li>Online and offline educational events</li>
                  <li>Educational resources and materials</li>
                  <li>Career guidance and mentorship in technology fields</li>
                </ul>
              </div>
            </section>

            {/* Registration and Account */}
            <section className="card">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Workshop Registration</h2>
              <div className="space-y-3 text-gray-300 text-sm sm:text-base">
                <p>When registering for our workshops, you agree to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and promptly update your registration information</li>
                  <li>Accept responsibility for all activities under your registration</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                  <li>Comply with all applicable laws and regulations</li>
                </ul>
                <p className="mt-4">
                  We reserve the right to refuse registration or cancel any workshop registration at our discretion, 
                  including if we believe you have violated these Terms.
                </p>
              </div>
            </section>

            {/* Payment and Fees */}
            <section className="card">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Payment and Fees</h2>
              <div className="space-y-3 text-gray-300 text-sm sm:text-base">
                <p>Some workshops may require payment of fees. When applicable:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>All fees must be paid in advance unless otherwise specified</li>
                  <li>Payment details will be provided during registration</li>
                  <li>Fees are non-refundable except as required by law or at our discretion</li>
                  <li>We reserve the right to change fees with reasonable notice</li>
                  <li>You are responsible for any applicable taxes</li>
                </ul>
              </div>
            </section>

            {/* Cancellation and Refunds */}
            <section className="card">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Cancellation and Refunds</h2>
              <div className="space-y-3 text-gray-300 text-sm sm:text-base">
                <h3 className="text-lg font-semibold text-neon-blue">By Students</h3>
                <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                  <li>Cancellations must be made at least 48 hours before the workshop start time</li>
                  <li>Refunds (if applicable) will be processed within 7-10 business days</li>
                  <li>No refunds for cancellations made less than 48 hours before the workshop</li>
                  <li>No refunds for no-shows or incomplete participation</li>
                </ul>

                <h3 className="text-lg font-semibold text-neon-blue">By ZehraTech</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>We reserve the right to cancel workshops due to insufficient enrollment or unforeseen circumstances</li>
                  <li>Full refunds will be provided if we cancel a workshop</li>
                  <li>We will notify registered participants at least 24 hours in advance of any cancellation</li>
                  <li>We may reschedule workshops with reasonable notice</li>
                </ul>
              </div>
            </section>

            {/* User Conduct */}
            <section className="card">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">User Conduct</h2>
              <div className="space-y-3 text-gray-300 text-sm sm:text-base">
                <p>When using our services, you agree NOT to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe on the intellectual property rights of ZehraTech or others</li>
                  <li>Harass, abuse, or harm other participants or instructors</li>
                  <li>Distribute malware, viruses, or harmful code</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Share workshop materials without permission</li>
                  <li>Misrepresent your identity or affiliation</li>
                  <li>Engage in any fraudulent or deceptive practices</li>
                  <li>Disrupt or interfere with our services</li>
                </ul>
              </div>
            </section>

            {/* Intellectual Property */}
            <section className="card">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Intellectual Property Rights</h2>
              <div className="space-y-3 text-gray-300 text-sm sm:text-base">
                <p>
                  All content, materials, and resources provided by ZehraTech, including but not limited to text, graphics, 
                  logos, images, videos, software, and course materials, are the property of ZehraTech or its licensors and 
                  are protected by copyright, trademark, and other intellectual property laws.
                </p>
                <p className="mt-3">You may not:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Copy, modify, or distribute our materials without written permission</li>
                  <li>Use our trademarks or branding without authorization</li>
                  <li>Create derivative works based on our content</li>
                  <li>Commercially exploit our materials</li>
                  <li>Remove or alter any copyright notices</li>
                </ul>
              </div>
            </section>

            {/* Certificates and Credentials */}
            <section className="card">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Certificates and Credentials</h2>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                Certificates of completion or participation may be awarded upon successful completion of workshops. These 
                certificates are for educational purposes only and do not constitute professional certification or accreditation. 
                Misrepresentation of credentials earned through ZehraTech is strictly prohibited.
              </p>
            </section>

            {/* Disclaimer of Warranties */}
            <section className="card">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Disclaimer of Warranties</h2>
              <div className="space-y-3 text-gray-300 text-sm sm:text-base">
                <p>
                  Our services are provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, 
                  either express or implied. We do not guarantee:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Uninterrupted or error-free service</li>
                  <li>Specific learning outcomes or job placement</li>
                  <li>Accuracy or completeness of information</li>
                  <li>Compatibility with all devices or browsers</li>
                  <li>Security of data transmission</li>
                </ul>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section className="card">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                To the maximum extent permitted by law, ZehraTech and its instructors shall not be liable for any indirect, 
                incidental, special, consequential, or punitive damages, including loss of profits, data, or opportunities, 
                arising from your use of our services. Our total liability shall not exceed the amount paid by you for the 
                specific workshop or service giving rise to the claim.
              </p>
            </section>

            {/* Indemnification */}
            <section className="card">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Indemnification</h2>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                You agree to indemnify, defend, and hold harmless ZehraTech, its founder, instructors, and affiliates from 
                any claims, liabilities, damages, losses, and expenses arising from your violation of these Terms, your use 
                of our services, or your violation of any rights of another person or entity.
              </p>
            </section>

            {/* Privacy */}
            <section className="card">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Privacy</h2>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                Your use of our services is also governed by our{' '}
                <Link href="/privacy-policy" className="text-neon-blue hover:underline">
                  Privacy Policy
                </Link>
                . Please review our Privacy Policy to understand how we collect, use, and protect your information.
              </p>
            </section>

            {/* Modifications */}
            <section className="card">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Modifications to Terms</h2>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                We reserve the right to modify these Terms at any time. We will notify users of material changes by posting 
                the updated Terms on our website and updating the &quot;Last updated&quot; date. Your continued use of our 
                services after such changes constitutes your acceptance of the new Terms.
              </p>
            </section>

            {/* Termination */}
            <section className="card">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Termination</h2>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                We may terminate or suspend your access to our services immediately, without prior notice or liability, for 
                any reason, including if you breach these Terms. Upon termination, your right to use our services will 
                immediately cease. All provisions of these Terms that by their nature should survive termination shall survive, 
                including ownership provisions, warranty disclaimers, and limitations of liability.
              </p>
            </section>

            {/* Governing Law */}
            <section className="card">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Governing Law and Jurisdiction</h2>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                These Terms shall be governed by and construed in accordance with the laws of India, without regard to its 
                conflict of law provisions. Any disputes arising from these Terms or your use of our services shall be 
                subject to the exclusive jurisdiction of the courts in India.
              </p>
            </section>

            {/* Severability */}
            <section className="card">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Severability</h2>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or 
                eliminated to the minimum extent necessary so that these Terms will otherwise remain in full force and effect.
              </p>
            </section>

            {/* Contact */}
            <section className="card bg-gradient-to-r from-dark-800 via-dark-900 to-dark-800">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Contact Information</h2>
              <p className="text-gray-300 mb-4 text-sm sm:text-base">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-gray-300 text-sm sm:text-base">
                <p>
                  <strong className="text-neon-blue">Email:</strong>{' '}
                  <a href="mailto:contact@zehratech.in" className="hover:underline">
                    contact@zehratech.in
                  </a>
                </p>
                <p>
                  <strong className="text-neon-blue">Email:</strong>{' '}
                  <a href="mailto:yashab@zehratech.in" className="hover:underline">
                    yashab@zehratech.in
                  </a>
                </p>
                <p>
                  <strong className="text-neon-blue">Website:</strong>{' '}
                  <a href="https://zehratech.onrender.com" className="hover:underline">
                    zehratech.onrender.com
                  </a>
                </p>
              </div>
            </section>
          </div>

          <div className="mt-8 sm:mt-12 text-center">
            <Link href="/" className="btn-primary inline-block text-sm sm:text-base">
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
