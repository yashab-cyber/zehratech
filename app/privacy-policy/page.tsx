'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
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
              Privacy Policy
            </span>
          </h1>
          <p className="text-gray-400 mb-8 sm:mb-12 text-sm sm:text-base">
            Last updated: October 15, 2025
          </p>

          <div className="space-y-8 sm:space-y-12">
            {/* Introduction */}
            <section className="card">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Introduction</h2>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                Welcome to ZehraTech. We are committed to protecting your personal information and your right to privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit 
                our website <span className="text-neon-blue">zehratech.onrender.com</span> or register for our workshops.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="card">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Information We Collect</h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base">
                <div>
                  <h3 className="text-lg font-semibold text-neon-blue mb-2">Personal Information</h3>
                  <p className="mb-2">When you register for our workshops, we collect:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Full Name</li>
                    <li>Email Address</li>
                    <li>Phone Number</li>
                    <li>School/Institute Name</li>
                    <li>Class/Grade Level</li>
                    <li>Resume (optional)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-neon-blue mb-2">Contact Information</h3>
                  <p>When you contact us through our contact form, we collect your name, email address, and message content.</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-neon-blue mb-2">Automatically Collected Information</h3>
                  <p className="mb-2">We may automatically collect certain information when you visit our website:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>IP Address</li>
                    <li>Browser Type and Version</li>
                    <li>Device Information</li>
                    <li>Pages Visited and Time Spent</li>
                    <li>Referring Website</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section className="card">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
              <div className="space-y-3 text-gray-300 text-sm sm:text-base">
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Process and manage workshop registrations</li>
                  <li>Send confirmation emails and workshop details</li>
                  <li>Communicate with you about upcoming events and updates</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Improve our website and services</li>
                  <li>Send educational content and newsletters (with your consent)</li>
                  <li>Analyze usage patterns and optimize user experience</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>
            </section>

            {/* Information Sharing */}
            <section className="card">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Information Sharing and Disclosure</h2>
              <div className="space-y-3 text-gray-300 text-sm sm:text-base">
                <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-white">With Your Consent:</strong> We may share your information when you give us explicit permission</li>
                  <li><strong className="text-white">Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our website and conducting workshops</li>
                  <li><strong className="text-white">Legal Requirements:</strong> We may disclose your information if required by law or in response to valid requests by public authorities</li>
                  <li><strong className="text-white">Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred</li>
                </ul>
              </div>
            </section>

            {/* Data Security */}
            <section className="card">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Data Security</h2>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                We implement appropriate technical and organizational security measures to protect your personal information 
                against unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, 
                and regular security assessments. However, no method of transmission over the internet is 100% secure, and we 
                cannot guarantee absolute security.
              </p>
            </section>

            {/* Data Retention */}
            <section className="card">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Data Retention</h2>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this 
                Privacy Policy, unless a longer retention period is required or permitted by law. Workshop registration data 
                is typically retained for up to 2 years for record-keeping and analysis purposes.
              </p>
            </section>

            {/* Your Rights */}
            <section className="card">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Your Privacy Rights</h2>
              <div className="space-y-3 text-gray-300 text-sm sm:text-base">
                <p>You have the following rights regarding your personal information:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-white">Access:</strong> Request a copy of the personal information we hold about you</li>
                  <li><strong className="text-white">Correction:</strong> Request correction of inaccurate or incomplete information</li>
                  <li><strong className="text-white">Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong className="text-white">Objection:</strong> Object to the processing of your personal information</li>
                  <li><strong className="text-white">Portability:</strong> Request transfer of your information to another service</li>
                  <li><strong className="text-white">Withdraw Consent:</strong> Withdraw consent for marketing communications at any time</li>
                </ul>
                <p className="mt-4">
                  To exercise any of these rights, please contact us at{' '}
                  <a href="mailto:contact@zehratech.in" className="text-neon-blue hover:underline">
                    contact@zehratech.in
                  </a>
                </p>
              </div>
            </section>

            {/* Cookies */}
            <section className="card">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Cookies and Tracking</h2>
              <p className="text-gray-300 leading-relaxed mb-3 text-sm sm:text-base">
                We use cookies and similar tracking technologies to enhance your experience on our website. Cookies are 
                small data files stored on your device. We use them to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300 text-sm sm:text-base">
                <li>Remember your preferences and settings</li>
                <li>Maintain your login session</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Improve website functionality</li>
              </ul>
              <p className="text-gray-300 mt-3 text-sm sm:text-base">
                You can control cookies through your browser settings. However, disabling cookies may affect website functionality.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="card">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Children&apos;s Privacy</h2>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                Our workshops are designed for students in classes 9-12 (typically ages 14-18). We do not knowingly collect 
                personal information from children under 13 without parental consent. If you are a parent or guardian and 
                believe your child has provided us with personal information, please contact us, and we will take steps to 
                delete such information.
              </p>
            </section>

            {/* Third-Party Links */}
            <section className="card">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Third-Party Links</h2>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                Our website may contain links to third-party websites (such as social media platforms). We are not responsible 
                for the privacy practices of these external sites. We encourage you to review the privacy policies of any 
                third-party websites you visit.
              </p>
            </section>

            {/* Updates to Policy */}
            <section className="card">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Updates to This Policy</h2>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. 
                We will notify you of any material changes by posting the new Privacy Policy on this page and updating the 
                &quot;Last updated&quot; date. We encourage you to review this Privacy Policy periodically.
              </p>
            </section>

            {/* Contact Information */}
            <section className="card bg-gradient-to-r from-dark-800 via-dark-900 to-dark-800">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p className="text-gray-300 mb-4 text-sm sm:text-base">
                If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
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
