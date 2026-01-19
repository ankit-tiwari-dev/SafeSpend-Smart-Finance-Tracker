import React from "react";
import { Link } from "react-router-dom";
import { LuArrowLeft, LuShieldCheck, LuLock, LuMail, LuDatabase } from "react-icons/lu";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-primary/30 font-sans py-20 px-4 sm:px-8">
      {/* Background Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full -z-10" />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
          >
            <LuArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-400">Last Updated: January 19, 2026</p>
        </div>

        {/* Content */}
        <div className="space-y-12">
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-primary">
              <LuShieldCheck className="text-2xl" />
              <h2 className="text-2xl font-bold text-white">Introduction</h2>
            </div>
            <p className="text-gray-400 leading-relaxed">
              SafeSpend ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our financial management platform.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-primary">
              <LuLock className="text-2xl" />
              <h2 className="text-2xl font-bold text-white">Information We Collect</h2>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <h3 className="font-semibold text-white">Google Account Information</h3>
              <p className="text-gray-400 leading-relaxed">
                When you sign in using Google Authentication, we collect your <strong>Google Email Address</strong> and <strong>Basic Profile Information</strong> (such as your name). We use this information to create your account and provide a personalized experience.
              </p>
              <h3 className="font-semibold text-white">Financial Data</h3>
              <p className="text-gray-400 leading-relaxed">
                We collect the financial transactions, budgets, and goals you manually input into the system to provide budgeting tools and financial insights.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-primary">
              <LuMail className="text-2xl" />
              <h2 className="text-2xl font-bold text-white">How We Use Your Information</h2>
            </div>
            <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
              <li>To provide, operate, and maintain our services.</li>
              <li>To send you automated welcome emails and account-related notifications when you log in.</li>
              <li>To analyze and provide insights into your spending habits.</li>
              <li>To improve and expand our platform features.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-primary">
              <LuDatabase className="text-2xl" />
              <h2 className="text-2xl font-bold text-white">Data Security</h2>
            </div>
            <p className="text-gray-400 leading-relaxed">
              We implement industry-standard security measures to protect your data. Your financial records are encrypted and stored securely. We do not sell your personal data to third parties.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Contact Us</h2>
            <p className="text-gray-400 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at support@safespend.com.
            </p>
          </section>
        </div>

        {/* Footer info */}
        <div className="mt-20 pt-8 border-t border-white/5 text-gray-600 text-sm text-center">
          &copy; 2026 SafeSpend Technologies Inc. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
