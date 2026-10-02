import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Gosht Ghar - 100% Halal & Organic Meat",
  description: "Learn about how Gosht Ghar collects, protects, and handles your personal information for farm-fresh organic meat orders and delivery services in Karachi.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "October 2026";

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <PageHeader
        title="Privacy Policy"
        subtitle="Your privacy and data security are core to our farm-fresh delivery values."
        breadcrumb="Home / Privacy Policy"
      />

      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-container mx-auto px-5">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-brand-border p-6 md:p-12 shadow-xs space-y-10">
            
            {/* Header / Intro Card */}
            <div className="border-b border-brand-border/60 pb-8">
              <div className="inline-block bg-brand-pink/60 text-brand-red font-bold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-4">
                Official Policy · Effective Date: {lastUpdated}
              </div>
              <h1 className="text-2xl md:text-4xl font-extrabold text-brand-black mb-4">
                Gosht Ghar Privacy &amp; Data Protection Policy
              </h1>
              <p className="text-brand-black/80 text-sm md:text-base leading-relaxed">
                At <strong>Gosht Ghar</strong>, we are deeply committed to protecting your personal information and respecting your privacy. This policy outlines how we collect, use, and safeguard the data you provide when ordering fresh meat, broiler chicken, desi products, and farm eggs through our website or WhatsApp.
              </p>
            </div>

            {/* Halal Zabiha & Shariah Commitment Section */}
            <div className="bg-brand-pink/30 border-2 border-brand-red/30 rounded-3xl p-6 md:p-8 space-y-3 shadow-xs">
              <h2 className="text-lg md:text-2xl font-extrabold text-brand-red">
                100% Authentic Halal Zabiha Guarantee
              </h2>
              <p className="text-brand-black text-sm md:text-base leading-relaxed font-medium">
                At <strong>Gosht Ghar</strong>, every single chicken, broiler, desi bird, and mutton livestock is <strong>100% slaughtered strictly according to Islamic Shariah principles (Halal Zabiha)</strong> by experienced Muslim butchers reciting <em>Bismillahi Allahu Akbar</em> individually for each animal.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-white p-3.5 rounded-xl border border-brand-pink/60 text-xs md:text-sm font-bold text-brand-black flex items-center gap-2.5">
                  <svg className="w-5 h-5 text-brand-red shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Hand-Slaughtered (No Stunning / Machine Slaughter)</span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-brand-pink/60 text-xs md:text-sm font-bold text-brand-black flex items-center gap-2.5">
                  <svg className="w-5 h-5 text-brand-red shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Direct Farm Fresh, Organic &amp; Antibiotic-Free</span>
                </div>
              </div>
            </div>

            {/* Section 1: Information We Collect */}
            <div className="space-y-4">
              <h2 className="text-lg md:text-xl font-bold text-brand-black flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-brand-red text-white text-xs font-extrabold flex items-center justify-center shrink-0">1</span>
                Information We Collect
              </h2>
              <p className="text-brand-black/80 text-sm md:text-base leading-relaxed">
                To process your orders efficiently and provide temperature-controlled delivery to your doorstep in Karachi, we collect the following essential details:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                <li className="bg-brand-cream/50 border border-brand-pink/50 rounded-2xl p-4 text-xs md:text-sm text-brand-black">
                  <strong className="block text-brand-red mb-1">Personal Contact Details</strong>
                  Your full name, phone number, and WhatsApp contact number for delivery confirmation.
                </li>
                <li className="bg-brand-cream/50 border border-brand-pink/50 rounded-2xl p-4 text-xs md:text-sm text-brand-black">
                  <strong className="block text-brand-red mb-1">Delivery Address</strong>
                  Your complete house/street address and area in Karachi for route optimization.
                </li>
                <li className="bg-brand-cream/50 border border-brand-pink/50 rounded-2xl p-4 text-xs md:text-sm text-brand-black">
                  <strong className="block text-brand-red mb-1">Order Preferences</strong>
                  Selected meat cuts, portion weights (1kg, 7kg+ broiler, etc.), and delivery instructions.
                </li>
                <li className="bg-brand-cream/50 border border-brand-pink/50 rounded-2xl p-4 text-xs md:text-sm text-brand-black">
                  <strong className="block text-brand-red mb-1">Device &amp; Usage Data</strong>
                  Temporary session data and cookies to maintain your shopping cart items.
                </li>
              </ul>
            </div>

            {/* Section 2: How We Use Your Information */}
            <div className="space-y-4 pt-4 border-t border-brand-border/60">
              <h2 className="text-lg md:text-xl font-bold text-brand-black flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-brand-black text-white text-xs font-extrabold flex items-center justify-center shrink-0">2</span>
                How We Use Your Data
              </h2>
              <div className="space-y-3 text-sm md:text-base text-brand-black/80 leading-relaxed">
                <p>We use the collected information strictly for legitimate operational purposes, including:</p>
                <div className="space-y-2">
                  <div className="flex items-start gap-3 bg-gray-50 p-3.5 rounded-xl border border-gray-200/60">
                    <span className="text-brand-red font-bold">✓</span>
                    <span>Preparing, vacuum-packaging, and dispatching your fresh organic meat orders.</span>
                  </div>
                  <div className="flex items-start gap-3 bg-gray-50 p-3.5 rounded-xl border border-gray-200/60">
                    <span className="text-brand-red font-bold">✓</span>
                    <span>Sending automated order confirmations and delivery rider status via SMS or WhatsApp.</span>
                  </div>
                  <div className="flex items-start gap-3 bg-gray-50 p-3.5 rounded-xl border border-gray-200/60">
                    <span className="text-brand-red font-bold">✓</span>
                    <span>Providing dedicated customer care and resolving inquiries or special instructions.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Payment & Data Security */}
            <div className="space-y-4 pt-4 border-t border-brand-border/60">
              <h2 className="text-lg md:text-xl font-bold text-brand-black flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-brand-red text-white text-xs font-extrabold flex items-center justify-center shrink-0">3</span>
                Payment &amp; Security Assurance
              </h2>
              <p className="text-brand-black/80 text-sm md:text-base leading-relaxed">
                Gosht Ghar operates primarily on a <strong>Cash on Delivery (COD)</strong> basis. We do not store financial credentials, credit card numbers, or bank account details on our servers.
              </p>
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 md:p-5 text-emerald-900 text-xs md:text-sm leading-relaxed flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>
                  <strong>Strict Non-Disclosure Guarantee:</strong> We never sell, rent, or lease your personal information, phone numbers, or delivery locations to third-party marketing brokers.
                </span>
              </div>
            </div>

            {/* Section 4: WhatsApp Orders & Communication */}
            <div className="space-y-4 pt-4 border-t border-brand-border/60">
              <h2 className="text-lg md:text-xl font-bold text-brand-black flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-brand-black text-white text-xs font-extrabold flex items-center justify-center shrink-0">4</span>
                WhatsApp Communication
              </h2>
              <p className="text-brand-black/80 text-sm md:text-base leading-relaxed">
                When placing orders via our Quick WhatsApp feature, your order details are securely formatted on your own device and opened in WhatsApp directly. WhatsApp messages are protected under Meta's end-to-end encryption protocols.
              </p>
            </div>

            {/* Section 5: Cookies Policy */}
            <div className="space-y-4 pt-4 border-t border-brand-border/60">
              <h2 className="text-lg md:text-xl font-bold text-brand-black flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-brand-red text-white text-xs font-extrabold flex items-center justify-center shrink-0">5</span>
                Cookies &amp; Local Storage
              </h2>
              <p className="text-brand-black/80 text-sm md:text-base leading-relaxed">
                Our website uses browser session storage solely to remember your active cart items, selected weights, and checkout navigation states. You can clear your browser cookies and session storage at any time via your browser settings.
              </p>
            </div>

            {/* Section 6: Contact Information */}
            <div className="pt-6 border-t border-brand-border/60 bg-brand-cream/40 -mx-6 md:-mx-12 -mb-6 md:-mb-12 p-6 md:p-10 rounded-b-3xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-bold text-brand-black mb-1">Questions about our Privacy Policy?</h3>
                <p className="text-xs md:text-sm text-brand-grey">
                  Our customer care team is here to assist you with any data protection or delivery query.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href="/contact"
                  className="bg-brand-black hover:bg-brand-red text-white font-bold text-xs md:text-sm px-6 py-3 rounded-xl transition-colors shadow-sm"
                >
                  Contact Support
                </Link>
                <a
                  href="https://wa.me/923362127054"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20b858] text-white font-bold text-xs md:text-sm px-6 py-3 rounded-xl transition-colors shadow-sm"
                >
                  WhatsApp Care
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
