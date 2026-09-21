"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Placeholder from "./Placeholder";
import { fetchProducts } from "@/lib/apiClient";

const formatPrice = (p: string | undefined) => {
  if (!p) return "";
  const num = parseFloat(p.toString().replace(/[^0-9.]/g, ""));
  return isNaN(num) ? p : num.toLocaleString();
};

export default function OnSale() {
  const [featuredProduct, setFeaturedProduct] = useState<any | null>(null);

  useEffect(() => {
    async function loadFeatured() {
      try {
        const res = await fetchProducts();
        if (res.success && res.data && res.data.length > 0) {
          const featured = res.data.find((p: any) => p.isFeatured) || res.data[0];
          setFeaturedProduct(featured);
        }
      } catch (err) {
        console.warn("Error fetching featured product:", err);
      }
    }
    loadFeatured();
  }, []);

  if (!featuredProduct) {
    return (
      <section className="py-16 bg-brand-cream/30">
        <div className="max-w-container mx-auto px-5 text-center">
          <h3 className="text-xl font-bold text-brand-black mb-2">Featured Deals & Special Offers</h3>
          <p className="text-brand-grey text-sm max-w-md mx-auto">

          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-container mx-auto px-5 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Side: Product Image Box */}
        <Link
          href={`/products/${featuredProduct.id}`}
          className="bg-white rounded-2xl min-h-[380px] md:min-h-[440px] flex items-center justify-center p-8 border border-brand-border cursor-pointer group relative overflow-hidden shadow-sm"
        >
          <span className="absolute top-5 left-5 bg-brand-red text-white text-xs font-bold px-3.5 py-1.5 rounded-full z-10 shadow-sm">
            Featured Deal
          </span>

          {featuredProduct.image ? (
            <img
              src={featuredProduct.image}
              alt={featuredProduct.name}
              className="max-h-[340px] w-auto object-contain rounded-xl group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <Placeholder
              label={featuredProduct.name}
              className="w-full h-full min-h-[320px] rounded-xl text-sm text-gray-400 group-hover:scale-105 transition-transform duration-300"
            />
          )}

          <div className="absolute inset-0 bg-brand-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="bg-white text-brand-black font-bold text-xs px-4 py-2 rounded-full shadow-lg">
              View Product Details →
            </span>
          </div>
        </Link>

        {/* Right Side: Product Details */}
        <div className="flex flex-col justify-center min-w-0">
          <span className="text-xs font-bold text-brand-red uppercase tracking-wider bg-brand-pink/60 px-3 py-1 rounded-md inline-block w-max mb-3">
            {featuredProduct.cat}
          </span>

          <h2 className="text-3xl md:text-[38px] font-bold text-brand-black mb-4 leading-tight break-words">
            {featuredProduct.name}
          </h2>

          <p className="text-brand-black/80 text-base md:text-lg leading-relaxed mb-8 max-w-lg break-words whitespace-pre-wrap">
            {featuredProduct.description || "100% fresh organic farm cut, vacuum packed & Halal certified."}
          </p>

          <div className="flex items-center gap-6">
            <div>
              <span className="text-2xl font-extrabold text-brand-black">
                Rs {formatPrice(featuredProduct.newPrice)}
              </span>
              {featuredProduct.oldPrice && (
                <span className="block text-xs text-gray-400 line-through font-medium">
                  Rs {formatPrice(featuredProduct.oldPrice)}
                </span>
              )}
            </div>

            <Link
              href={`/products/${featuredProduct.id}`}
              className="bg-brand-red hover:bg-brand-redDark text-white text-base font-bold px-8 py-3.5 rounded-xl transition-all shadow-md active:scale-95"
            >
              View Product Page
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
