'use client';

import React from 'react';
import Link from 'next/link';

export default function TermsOfService() {
    return (
        // Terms Of Service Container
        <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-background rounded-lg shadow-lg p-8">

                {/* Terms Of Service Title */}
                <h1 className="font-playfair-display text-4xl font-bold text-primary mb-4">
                    Terms Of Service
                </h1>


                {/* Last Updated Date */}
                <p className="text-primary mb-8 font-playfair-display">
                    Last updated: {new Date().toLocaleDateString()}
                </p>

                <div className="space-y-8">


                    {/* Acceptance of Terms Section */}
                    <section className="mb-8">
                        <h2 className="font-playfair-display text-2xl font-bold text-primary mb-4">
                            1. Acceptance of Terms
                        </h2>
                        <p className="text-primary leading-relaxed font-playfair-display">
                            By accessing and using this blogging platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this platform.
                        </p>
                    </section>


                    {/* User Accounts Section */}
                    <section className="mb-8">
                        <h2 className="font-playfair-display text-2xl font-bold text-primary mb-4">
                            2. User Accounts
                        </h2>
                        <p className="text-primary leading-relaxed font-playfair-display">
                            To use certain features of the platform, you must register for an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
                        </p>
                    </section>


                    {/* Content Guidelines Section */}
                    <section className="mb-8">
                        <h2 className="font-playfair-display text-2xl font-bold text-primary mb-4">
                            3. Content Guidelines
                        </h2>
                        <p className="text-primary mb-4 font-playfair-display">
                            Users are responsible for all content they post. Content must not:
                        </p>
                        <ul className="list-disc pl-6 text-primary space-y-2 font-playfair-display">
                            <li>Violate any laws or regulations</li>
                            <li>Infringe on intellectual property rights</li>
                            <li>Contain hate speech or discriminatory content</li>
                            <li>Include explicit or adult content</li>
                            <li>Promote violence or illegal activities</li>
                        </ul>
                    </section>


                    {/* Intellectual Property Section */}
                    <section className="mb-8">
                        <h2 className="font-playfair-display text-2xl font-bold text-primary mb-4">
                            4. Intellectual Property
                        </h2>
                        <p className="text-primary leading-relaxed font-playfair-display">
                            You retain ownership of your content, but grant us a license to use, modify, and display it on our platform. We respect intellectual property rights and expect users to do the same.
                        </p>
                    </section>


                    {/* Privacy and Data Protection Section */}
                    <section className="mb-8">
                        <h2 className="font-playfair-display text-2xl font-bold text-primary mb-4">
                            5. Privacy and Data Protection
                        </h2>
                        <p className="text-primary leading-relaxed font-playfair-display">
                            We collect and process personal data in accordance with our Privacy Policy. By using the platform, you consent to such processing and warrant that all data provided is accurate.
                        </p>
                    </section>


                    {/* User Conduct Section */}
                    <section className="mb-8">
                        <h2 className="font-playfair-display text-2xl font-bold text-primary mb-4">
                            6. User Conduct
                        </h2>
                        <p className="text-primary mb-4 font-playfair-display">
                            Users must not:
                        </p>
                        <ul className="list-disc pl-6 text-primary space-y-2 font-playfair-display">
                            <li>Harass or bully other users</li>
                            <li>Spam or post repetitive content</li>
                            <li>Attempt to gain unauthorized access</li>
                            <li>Use automated systems or bots</li>
                            <li>Interfere with platform operations</li>
                        </ul>
                    </section>


                    {/* Content Moderation Section */}
                    <section className="mb-8">
                        <h2 className="font-playfair-display text-2xl font-bold text-primary mb-4">
                            7. Content Moderation
                        </h2>
                        <p className="text-primary leading-relaxed font-playfair-display">
                            We reserve the right to remove any content that violates these terms or that we deem inappropriate. We may also suspend or terminate accounts that repeatedly violate our terms.
                        </p>
                    </section>


                    {/* Platform Availability Section */}
                    <section className="mb-8">
                        <h2 className="font-playfair-display text-2xl font-bold text-primary mb-4">
                            8. Platform Availability
                        </h2>
                        <p className="text-primary leading-relaxed font-playfair-display">
                            We strive to maintain platform availability but do not guarantee uninterrupted service. We reserve the right to modify, suspend, or discontinue any aspect of the platform at any time.
                        </p>
                    </section>


                    {/* Limitation of Liability Section */}
                    <section className="mb-8">
                        <h2 className="font-playfair-display text-2xl font-bold text-primary mb-4">
                            9. Limitation of Liability
                        </h2>
                        <p className="text-primary leading-relaxed font-playfair-display">
                            We are not liable for any damages arising from the use or inability to use the platform, including but not limited to direct, indirect, incidental, or consequential damages.
                        </p>
                    </section>


                    {/* Changes to Terms Section */}
                    <section className="mb-8">
                        <h2 className="font-playfair-display text-2xl font-bold text-primary mb-4">
                            10. Changes to Terms
                        </h2>
                        <p className="text-primary leading-relaxed font-playfair-display">
                            We may modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the modified terms.
                        </p>
                    </section>


                    {/* Governing Law Section */}
                    <section className="mb-8">
                        <h2 className="font-playfair-display text-2xl font-bold text-primary mb-4">
                            11. Governing Law
                        </h2>
                        <p className="text-primary leading-relaxed font-playfair-display">
                            These terms are governed by applicable laws. Any disputes shall be resolved in the appropriate courts of jurisdiction.
                        </p>
                    </section>


                    {/* Contact Information Section */}
                    <section className="mb-8">
                        <h2 className="font-playfair-display text-2xl font-bold text-primary mb-4">
                            12. Contact Information
                        </h2>
                        <p className="text-primary leading-relaxed font-playfair-display">
                            For questions about these terms, please contact our support team through the platform's contact form.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}

