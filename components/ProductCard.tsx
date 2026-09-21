"use client";

import Link from "next/link";
import Placeholder from "./Placeholder";
import { StarIcon, CartIcon } from "./Icons";

export type ProductCardProps = {
  id?: string;
  name: string;
  cat: string;
  catSlug?: string;
  newPrice: string;
  oldPrice?: string;
  tag?: string;
  desc?: string;
  description?: string;
  features?: string[];
  image?: string;
  rating?: number;
  inStock?: boolean;
};

const formatPrice = (p: string | undefined) => {
  if (!p) return "";
  const num = parseFloat(p.toString().replace(/[^0-9.]/g, ""));
  return isNaN(num) ? p : num.toLocaleString();
};

export default function ProductCard({
  id = "prod-1",
  name,
  cat,
  newPrice,
  oldPrice,
  tag,
  image,
  rating = 4.9,
  inStock = true,
}: ProductCardProps) {
  return (
    <Link
      href={`/products/${id}`}
      className="group bg-white rounded-2xl border border-brand-border overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
    >
      {/* Product Image Area */}
      <div className="relative w-full h-52 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <Placeholder label="" showText={false} className="w-full h-full !border-none !bg-transparent" />
        )}

        <div className="absolute inset-0 bg-brand-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-white/95 text-brand-black font-bold text-xs px-3.5 py-1.5 rounded-full shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform">
            View Full Product Page →
          </span>
        </div>

        {!inStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center backdrop-blur-[2px]">
            <span className="bg-brand-black text-white font-bold text-xs px-4 py-2 rounded-full shadow-lg transform -rotate-12">
              OUT OF STOCK
            </span>
          </div>
        )}
      </div>

      {/* Product Info Content */}
      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-brand-red uppercase tracking-wider bg-brand-pink/50 px-2 py-0.5 rounded">
              {cat}
            </span>
          </div>

          <h3 className="text-base font-bold text-brand-black leading-snug group-hover:text-brand-red transition-colors line-clamp-2 mb-2 break-words">
            {name}
          </h3>

        </div>

        {/* Pricing & CTA */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-lg font-extrabold text-brand-black block leading-none">
              Rs {formatPrice(newPrice)}
            </span>
            {oldPrice && (
              <span className="text-xs font-medium text-gray-400 line-through">
                Rs {formatPrice(oldPrice)}
              </span>
            )}
          </div>

          <button
            type="button"
            className={`text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all shadow-sm ${
              inStock ? "bg-brand-black group-hover:bg-brand-red group-hover:shadow-md" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            <span>{inStock ? "View Details" : "Out of Stock"}</span>
            {inStock && <CartIcon className="w-3.5 h-3.5 text-white" />}
          </button>
        </div>
      </div>
    </Link>
  );
}
