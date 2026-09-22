"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col justify-between bg-white">
      <Header />
      <div className="py-20 max-w-container mx-auto px-5 text-center my-auto">
        <span className="text-6xl font-black text-brand-red mb-2 inline-block">404</span>
        <h1 className="text-3xl font-extrabold text-brand-black mb-3">
          Page Not Found
        </h1>
        <p className="text-brand-grey text-sm max-w-md mx-auto mb-8 leading-relaxed">
          The product or page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="bg-brand-red hover:bg-brand-redDark text-white font-bold text-sm px-8 py-3.5 rounded-xl transition-colors shadow-md"
        >
          Return to Gosht Ghar Home
        </Link>
      </div>
      <Footer />
    </main>
  );
}
