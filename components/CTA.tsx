"use client";

import { useState } from "react";
import Placeholder from "./Placeholder";
import { ArrowIcon } from "./Icons";

export default function CTA() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  return (
    <section>
      <div className="max-w-container mx-auto px-5 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4 lg:gap-0">
        {/* Newsletter */}
        <div className="relative min-h-[300px] rounded-md lg:rounded-r-none overflow-hidden bg-brand-black">
          <Placeholder label="Meat Bowl Image" className="absolute inset-0 rounded-none opacity-40" />
          <div className="relative p-10 md:p-12 text-white max-w-md">
            <h3 className="text-2xl font-bold mb-3">Subscribe &amp; Get Regular Offer</h3>
            <p className="text-gray-300 text-sm mb-6">
              Appeared as a character in a number of literary works ranging.
            </p>
            <form onSubmit={handleSubmit} className="flex bg-white rounded p-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 border-none outline-none px-4 py-2.5 text-sm text-brand-black"
              />
              <button
                type="submit"
                className="bg-brand-red hover:bg-brand-redDark text-white text-sm font-semibold px-5 py-2.5 rounded transition-colors"
              >
                Subscribe Now
              </button>
            </form>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-brand-red rounded-md lg:rounded-l-none p-10 md:p-12 text-white flex flex-col justify-center">
          <h3 className="text-2xl font-bold mb-3">Let&apos;s Get in Touch</h3>
          <p className="opacity-90 text-sm mb-6">
            Socrates appeared as a character in a number of literary works ranging.
          </p>
          <button className="self-start inline-flex items-center gap-2 border border-white text-white hover:bg-white hover:text-brand-black font-semibold px-6 py-3 rounded-md transition-colors">
            <span>Learn More</span>
            <ArrowIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
