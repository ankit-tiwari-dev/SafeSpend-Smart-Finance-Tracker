import React from "react";
import { Link } from "react-router-dom";
import { LuArrowLeft, LuFileText, LuCheckCircle, LuAlertTriangle, LuHandshake } from "react-icons/lu";

const TermsAndConditions = () => {
    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-primary/30 font-sans py-20 px-4 sm:px-8">
            {/* Background Glow */}
            <div className="fixed top-0 right-1/2 translate-x-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full -z-10" />

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
                        Terms & Conditions
                    </h1>
                    <p className="text-gray-400">Last Updated: January 19, 2026</p>
                </div>

                {/* Content */}
                <div className="space-y-12">
                    <section className="space-y-4">
                        <div className="flex items-center gap-3 text-primary">
                            <LuHandshake className="text-2xl" />
                            <h2 className="text-2xl font-bold text-white">Acceptance of Terms</h2>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            By accessing or using SafeSpend, you agree to be bound by these Terms & Conditions. If you do not agree to these terms, please do not use our service.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-center gap-3 text-primary">
                            <LuFileText className="text-2xl" />
                            <h2 className="text-2xl font-bold text-white">User Accounts</h2>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            You must provide accurate information when creating an account via Google Authentication. You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-center gap-3 text-primary">
                            <LuCheckCircle className="text-2xl" />
                            <h2 className="text-2xl font-bold text-white">Permitted Use</h2>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            SafeSpend is intended for personal financial management. You agree not to misuse the service, including but not limited to:
                        </p>
                        <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                            <li>Using the service for any illegal or unauthorized purpose.</li>
                            <li>Attempting to interfere with the proper functioning of the service.</li>
                            <li>Reverse engineering or attempting to extract the source code.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-center gap-3 text-primary">
                            <LuAlertTriangle className="text-2xl" />
                            <h2 className="text-2xl font-bold text-white">Limitation of Liability</h2>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            SafeSpend is provided "as is" without any warranties. We are not liable for any financial losses or damages resulting from the use of our platform. Always consult with a professional financial advisor for critical financial decisions.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Changes to Terms</h2>
                        <p className="text-gray-400 leading-relaxed">
                            We reserve the right to modify these terms and conditions at any time. We will notify users of any significant changes by posting the new terms on this page.
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

export default TermsAndConditions;
