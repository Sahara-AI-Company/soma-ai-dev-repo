'use client';

import React from 'react';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-background rounded-lg shadow-lg p-8">

                {/* Privacy Policy Title */}
                <h1 className="font-playfair-display text-4xl font-bold text-primary mb-4">
                    Privacy Policy
                </h1>

                {/* Last Updated Date */}
                <p className="text-primary mb-8 font-playfair-display">
                    Last updated: {new Date().toLocaleDateString()}
                </p>

                {/* Introduction Section */}
                <section className="mb-8">
                    <h2 className="font-playfair-display text-2xl font-bold text-primary mb-4">
                        1. Introduction
                    </h2>
                    <p className="text-primary leading-relaxed font-playfair-display">
                        Welcome to our blogging platform. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we handle your personal information when you visit our website and tell you about your privacy rights.
                    </p>
                </section>


                {/* Information We Collect Section */}
                <section className="mb-8">
                    <h2 className="font-playfair-display text-2xl font-bold text-primary mb-4">
                        2. Information We Collect
                    </h2>
                    <p className="text-primary mb-4 font-playfair-display">
                        We collect several types of information for various purposes:
                    </p>
                    <ul className="list-disc pl-6 text-primary space-y-2 font-playfair-display">
                        <li>Account information (name, email address, username)</li>
                        <li>Profile information (profile picture, bio, social media links)</li>
                        <li>Content you create (blog posts, comments, likes)</li>
                        <li>Usage data (interaction with the platform, reading history)</li>
                        <li>Technical data (IP address, browser type, device information)</li>
                    </ul>
                </section>


                {/* How We Use Your Information Section */}
                <section className="mb-8">
                    <h2 className="font-playfair-display text-2xl font-bold text-primary mb-4">
                        3. How We Use Your Information
                    </h2>
                    <p className="text-primary mb-4 font-playfair-display">
                        We use your information to:
                    </p>
                    <ul className="list-disc pl-6 text-primary space-y-2 font-playfair-display">
                        <li>Provide and maintain our blogging platform</li>
                        <li>Allow you to create and manage your blog content</li>
                        <li>Enable interaction between users (comments, likes, follows)</li>
                        <li>Send you important updates about our service</li>
                        <li>Improve and personalize your experience</li>
                        <li>Monitor and analyze platform usage</li>
                    </ul>
                </section>


                {/* Content and Copyright Section */}
                <section className="mb-8">
                    <h2 className="font-playfair-display text-2xl font-bold text-primary mb-4">
                        4. Content and Copyright
                    </h2>
                    <p className="text-primary leading-relaxed font-playfair-display">
                        You retain all rights to your content. By posting on our platform, you grant us a license to host, display, and distribute your content. You are responsible for ensuring you have the necessary rights to share the content you post.
                    </p>
                </section>


                {/* Data Security Section */}
                <section className="mb-8">
                    <h2 className="font-playfair-display text-2xl font-bold text-primary mb-4">
                        5. Data Security
                    </h2>
                    <p className="text-primary leading-relaxed font-playfair-display">
                        We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                    </p>
                </section>


                {/* Your Rights Section */}
                <section className="mb-8">
                    <h2 className="font-playfair-display text-2xl font-bold text-primary mb-4">
                        6. Your Rights
                    </h2>
                    <p className="text-primary mb-4 font-playfair-display">
                        You have the right to:
                    </p>
                    <ul className="list-disc pl-6 text-primary space-y-2 font-playfair-display">
                        <li>Access your personal data</li>
                        <li>Correct inaccurate data</li>
                        <li>Request deletion of your data</li>
                        <li>Object to processing of your data</li>
                        <li>Export your data</li>
                        <li>Withdraw consent at any time</li>
                    </ul>
                </section>


                {/* Cookies and Tracking Section */}
                <section className="mb-8">
                    <h2 className="font-playfair-display text-2xl font-bold text-primary mb-4">
                        7. Cookies and Tracking
                    </h2>
                    <p className="text-primary leading-relaxed font-playfair-display">
                        We use cookies and similar tracking technologies to improve your browsing experience, analyze site traffic, and understand where our visitors are coming from. You can control cookies through your browser settings.
                    </p>
                </section>


                {/* Third-Party Services Section */}
                <section className="mb-8">
                    <h2 className="font-playfair-display text-2xl font-bold text-primary mb-4">
                        8. Third-Party Services
                    </h2>
                    <p className="text-primary leading-relaxed font-playfair-display">
                        Our platform may contain links to third-party websites and services. We are not responsible for the privacy practices of these third parties. We encourage you to read their privacy policies.
                    </p>
                </section>


                {/* Children's Privacy Section */}
                <section className="mb-8">
                    <h2 className="font-playfair-display text-2xl font-bold text-primary mb-4">
                        9. Children's Privacy
                    </h2>
                    <p className="text-primary leading-relaxed font-playfair-display">
                        Our service is not intended for children under 13. We do not knowingly collect personal information from children under 13.
                    </p>
                </section>


                {/* Changes to This Policy Section */}
                <section className="mb-8">
                    <h2 className="font-playfair-display text-2xl font-bold text-primary mb-4">
                        10. Changes to This Policy
                    </h2>
                    <p className="text-primary leading-relaxed font-playfair-display">
                        We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
                    </p>
                </section>


                {/* Contact Us Section */}
                <section className="mb-8">
                    <h2 className="font-playfair-display text-2xl font-bold text-primary mb-4">
                        11. Contact Us
                    </h2>
                    <p className="text-primary mb-4 font-playfair-display">
                        If you have any questions about this privacy policy or our data practices, please contact us at:
                    </p>
                    <p className="text-primary font-playfair-display ">
                        Email: privacy@yourblogplatform.com
                    </p>
                </section>
            </div>
        </div>
    );
};

