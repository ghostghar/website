"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Why Gosht Ghar?",
    answer: (
      <div className="space-y-4">
        <p className="font-semibold text-brand-black">We believe good meat starts with good care.</p>
        <ul className="space-y-3">
          <li className="flex gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-red mt-1.5 flex-shrink-0"></div>
            <div>
              <strong className="text-brand-black">Farm Raised:</strong> Our animals and poultry are raised with care at our own farm.
            </div>
          </li>
          <li className="flex gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-red mt-1.5 flex-shrink-0"></div>
            <div>
              <strong className="text-brand-black">Fresh, Never Frozen:</strong> Your order is prepared fresh rather than taken from frozen stock.
            </div>
          </li>
          <li className="flex gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-red mt-1.5 flex-shrink-0"></div>
            <div>
              <strong className="text-brand-black">Hygiene First:</strong> We follow careful hygiene practices throughout handling and preparation.
            </div>
          </li>
          <li className="flex gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-red mt-1.5 flex-shrink-0"></div>
            <div>
              <strong className="text-brand-black">Halal &amp; Shariah-Compliant:</strong> Your meat is prepared according to Islamic slaughtering practices.
            </div>
          </li>
        </ul>
      </div>
    )
  },
  {
    question: "What are your delivery charges?",
    answer: <p>Our standard delivery fee is Rs 300. However, we offer <strong>FREE Delivery</strong> if you order 7kg or more of broiler chicken, or 3kg or more of desi/aseel products!</p>
  },
  {
    question: "What is your delivery timing?",
    answer: <p>Our delivery and customer support hours are from Monday to Sunday, 8:00 AM to 9:00 PM.</p>
  },
  {
    question: "Do you offer cash on delivery (COD)?",
    answer: <p>Yes, we currently offer Cash on Delivery (COD) for all orders within Karachi. You can pay conveniently when the fresh meat arrives at your doorstep.</p>
  },
  {
    question: "Is your meat 100% organic and fresh?",
    answer: <p>Yes! We pride ourselves on providing 100% organic, antibiotic-free, and hormone-free meat. We do not sell frozen stock; every order is prepared fresh just for you.</p>
  },
  {
    question: "How is the meat packaged?",
    answer: <p>We use premium, food-grade packaging to ensure the meat remains fresh, hygienic, and free from contamination during transit.</p>
  },
  {
    question: "Can I request custom cuts for my meat?",
    answer: <p>Absolutely! During checkout, you can use the "Special Instructions" box to mention exactly how you want your meat cut (e.g., Karahi cut, Biryani cut, or Steaks).</p>
  },
  {
    question: "What should I do if there's an issue with my order?",
    answer: <p>Customer satisfaction is our top priority. If you receive an incorrect order or have quality concerns, please contact our support team via WhatsApp immediately. We will arrange a prompt resolution.</p>
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Keep first open by default

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-brand-cream/30">
      <div className="max-w-3xl mx-auto px-5">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-[38px] font-bold text-brand-black mb-4">
            Frequently Asked <span className="text-brand-red">Questions</span>
          </h2>
          <p className="text-brand-grey text-sm md:text-base">
            Got questions? We've got answers. Learn more about Gosht Ghar and our services.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`bg-white border rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? "border-brand-red shadow-md" : "border-brand-border"}`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none group"
                >
                  <span className={`font-bold text-base md:text-lg pr-4 transition-colors ${isOpen ? "text-brand-red" : "text-brand-black group-hover:text-brand-red"}`}>
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${isOpen ? "bg-brand-red text-white" : "bg-brand-pink text-brand-red"}`}>
                    <svg className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                <div 
                  className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[500px] pb-6 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <div className="text-brand-grey text-sm leading-relaxed border-t border-brand-border pt-4">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
