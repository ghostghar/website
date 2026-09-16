"use client";

import { useState } from "react";
import { ArrowIcon } from "./Icons";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }
    setSubmitted(true);
  };

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-container mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 items-start">
          {/* Left Column: Contact Information */}
          <div className="bg-brand-cream/50 border border-brand-border rounded-xl p-8 md:p-10 shadow-sm">
            <span className="text-brand-red font-semibold text-xs uppercase tracking-wider block mb-2">
              Contact Information
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-brand-black mb-4">
              Get in Touch With <span className="text-brand-red">Goshtghar</span>
            </h2>
            <p className="text-brand-grey text-sm leading-relaxed mb-8">
              Have questions about our fresh organic meat, daily delivery slots, or custom butchery orders? Reach out to us directly through phone, email, or by filling out the form.
            </p>

            <div className="space-y-6 text-sm">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-pink text-brand-red flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <div>
                  <strong className="block text-brand-black text-base font-semibold mb-0.5">Phone &amp; WhatsApp</strong>
                  <span className="text-brand-grey block">+92 (300) 123-4567</span>
                  <span className="text-brand-grey block">+92 (321) 987-6543</span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-pink text-brand-red flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><path d="M22 6l-10 7L2 6" /></svg>
                </div>
                <div>
                  <strong className="block text-brand-black text-base font-semibold mb-0.5">Email Address</strong>
                  <span className="text-brand-grey block">info@goshtghar.pk</span>
                  <span className="text-brand-grey block">support@goshtghar.pk</span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-pink text-brand-red flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                </div>
                <div>
                  <strong className="block text-brand-black text-base font-semibold mb-0.5">Farm &amp; Head Office</strong>
                  <span className="text-brand-grey block">Goshtghar Organic Farm, Main Boulevard, Lahore, Pakistan</span>
                </div>
              </div>

              {/* Timing */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-pink text-brand-red flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                </div>
                <div>
                  <strong className="block text-brand-black text-base font-semibold mb-0.5">Delivery &amp; Customer Support Hours</strong>
                  <span className="text-brand-grey block">Monday - Sunday: 8:00 AM - 9:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-white border border-brand-border rounded-xl p-8 md:p-10 shadow-sm">
            <h3 className="text-2xl font-bold text-brand-black mb-2">Send Us a Message</h3>
            <p className="text-brand-grey text-sm mb-8">
              Fill out the details below and our team will respond within 2 hours.
            </p>

            {submitted ? (
              <div className="bg-brand-pink/60 border border-brand-red/30 rounded-lg p-8 text-center my-6">
                <div className="w-12 h-12 bg-brand-red text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 stroke-white" viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                </div>
                <h4 className="text-xl font-bold text-brand-black mb-2">Thank You!</h4>
                <p className="text-brand-grey text-sm max-w-md mx-auto mb-6">
                  Aapka message hausal-afzai ke sath received ho gaya hai. Goshtghar customer support team jald aap se contact karegi.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ fullName: "", email: "", phone: "", subject: "General Inquiry", message: "" });
                  }}
                  className="bg-brand-black text-white text-xs font-semibold px-6 py-2.5 rounded-md hover:bg-black transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-brand-black uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Enter your full name"
                      className="w-full border border-brand-border rounded-md px-4 py-3 text-sm text-brand-black outline-none focus:border-brand-red transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-brand-black uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter your email"
                      className="w-full border border-brand-border rounded-md px-4 py-3 text-sm text-brand-black outline-none focus:border-brand-red transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-brand-black uppercase tracking-wider mb-2">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0300 1234567"
                      className="w-full border border-brand-border rounded-md px-4 py-3 text-sm text-brand-black outline-none focus:border-brand-red transition-colors"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-semibold text-brand-black uppercase tracking-wider mb-2">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full border border-brand-border rounded-md px-4 py-3 text-sm text-brand-black outline-none focus:border-brand-red bg-white transition-colors"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Order Support">Order Support</option>
                      <option value="Custom Meat Cutting">Custom Meat Cutting Request</option>
                      <option value="Bulk / Wholesale">Bulk / Wholesale Supply</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-brand-black uppercase tracking-wider mb-2">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your query or custom meat order details here..."
                    className="w-full border border-brand-border rounded-md px-4 py-3 text-sm text-brand-black outline-none focus:border-brand-red transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-redDark text-white text-sm font-semibold px-8 py-4 rounded-md transition-colors shadow-sm"
                >
                  <span>Send Message</span>
                  <ArrowIcon className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
