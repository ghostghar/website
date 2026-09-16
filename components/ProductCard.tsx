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
  sizes?: string;
  desc?: string;
  description?: string;
  features?: string[];
  image?: string;
  rating?: number;
};

export default function ProductCard({
  id = "prod-1",
  name,
  cat,
  newPrice,
  oldPrice,
  tag,
  sizes = "1kg",
  image,
  rating = 4.9,
}: ProductCardProps) {
  return (
    <Link
      href={`/products/${id}`}
      className="group bg-white rounded-2xl border border-brand-border overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
    >
      {/* Product Image Area */}
      <div className="relative w-full h-52 bg-[#F9F6F3] p-4 flex items-center justify-center overflow-hidden">
        {tag && (
          <span className="absolute top-3 left-3 z-10 bg-brand-red text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs">
            {tag}
          </span>
        )}

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
      </div>

      {/* Product Info Content */}
      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-brand-red uppercase tracking-wider bg-brand-pink/50 px-2 py-0.5 rounded">
              {cat}
            </span>
            <div className="flex items-center gap-1 text-xs font-bold text-brand-black bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              <StarIcon className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>{rating}</span>
            </div>
          </div>

          <h3 className="text-base font-bold text-brand-black leading-snug group-hover:text-brand-red transition-colors line-clamp-2 mb-2">
            {name}
          </h3>

          <p className="text-xs text-brand-grey mb-4">
            Available Portions: <span className="font-semibold text-brand-black/80">{sizes}</span>
          </p>
        </div>

        {/* Pricing & CTA */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-lg font-extrabold text-brand-red block leading-none">
              {newPrice}
            </span>
            {oldPrice && (
              <span className="text-xs font-medium text-gray-400 line-through">
                {oldPrice}
              </span>
            )}
          </div>

          <button
            type="button"
            className="bg-brand-black group-hover:bg-brand-red text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all shadow-sm group-hover:shadow-md"
          >
            <span>View Details</span>
            <CartIcon className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      </div>
    </Link>
  );
}
