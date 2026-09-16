"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App Runtime Error:", error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col justify-between bg-white">
      <Header />
      <div className="py-20 max-w-container mx-auto px-5 text-center my-auto">
        <div className="w-16 h-16 bg-brand-pink text-brand-red rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
          !
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-brand-black mb-3">
          Something went wrong!
        </h2>
        <p className="text-brand-grey text-sm max-w-md mx-auto mb-6 leading-relaxed">
          {error.message || "An unexpected error occurred while loading this page. Please try refreshing."}
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="bg-brand-red hover:bg-brand-redDark text-white font-bold text-xs md:text-sm px-6 py-3 rounded-xl transition-colors shadow-sm"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="bg-brand-black hover:bg-black text-white font-bold text-xs md:text-sm px-6 py-3 rounded-xl transition-colors shadow-sm"
          >
            Back to Home
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
