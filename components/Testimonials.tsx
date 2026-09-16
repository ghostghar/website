"use client";

import { useState } from "react";
import Placeholder from "./Placeholder";
import { StarIcon } from "./Icons";

const testimonials = [
  {
    name: "Tariq Mahmood",
    role: "Verified Customer",
    text: "Goshtghar se organic chicken aur mutton order kiya tha. Meat bilkul fresh aur clean tha. Packing temperature-controlled thi aur delivery fast mili. Bohot hi behtareen quality hai!",
  },
  {
    name: "Sarah Ahmed",
    role: "Regular Buyer",
    text: "Pehli baar online fresh meat order karte hue darr lag raha tha, lekin Goshtghar ne hamari expectations exceed kar dein. Truly 100% Halal, clean, and organic. Highly recommended!",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-20 bg-brand-cream/60">
      <div className="max-w-container mx-auto px-5">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-brand-red font-semibold text-xs uppercase tracking-wider block mb-2">Customer Feedback</span>
          <h2 className="text-3xl md:text-[34px] font-bold text-brand-black">
            Hear From Our Happy <span className="text-brand-red">Customers</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white border border-brand-border rounded-lg p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-5">
                <Placeholder label="Avatar" className="w-12 h-12 rounded-full font-bold text-xs" />
                <div>
                  <strong className="block text-base text-brand-black">{t.name}</strong>
                  <span className="text-xs text-brand-grey block">{t.role}</span>
                  <div className="flex text-amber-400 gap-1 mt-1">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <StarIcon key={s} className="w-3.5 h-3.5" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-brand-grey text-sm leading-relaxed">&ldquo;{t.text}&rdquo;</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all ${
                active === i ? "w-6 bg-brand-red" : "w-2 bg-gray-300"
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
