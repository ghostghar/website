"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Placeholder from "./Placeholder";
import { StarIcon, CartIcon } from "./Icons";
import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/data";

const formatPrice = (p: string | undefined) => {
  if (!p) return "";
  const num = parseFloat(p.toString().replace(/[^0-9.]/g, ""));
  return isNaN(num) ? p : num.toLocaleString();
};

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const selectedSize = "1kg";
  const [quantity, setQuantity] = useState<number>(1);
  const [addedToast, setAddedToast] = useState<boolean>(false);
  const { addToCart } = useCart();

  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({
    transformOrigin: "center center",
    transform: "scale(1.3)",
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2.2)", // Zoom level
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transformOrigin: "center center",
      transform: "scale(1.3)",
    });
  };

  useEffect(() => {
    if (product) {
      setQuantity(1);
      setAddedToast(false);
    }
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;



  const features = product.features && product.features.length > 0
    ? product.features
    : [
        "100% Organic & Halal Certified",
        "Temperature Controlled Packaging",
        "Zero Additives / Hormones",
        "Same-Day Express Delivery",
      ];

  const handleAddToCart = () => {
    // Determine numerical price value by parsing newPrice (e.g. "Rs 1500" -> 1500)
    const rawPrice = parseFloat(product.newPrice.replace(/[^0-9.]/g, ""));
    const price = isNaN(rawPrice) ? 0 : rawPrice;

    addToCart({
      id: `${product.id}-${selectedSize}`,
      productId: product.id,
      name: product.name,
      price: price,
      image: product.image || "/images/placeholder.svg",
      size: selectedSize,
      quantity: quantity,
    });

    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
    }, 2800);
  };

  const whatsappMessage = encodeURIComponent(
    `Assalam-o-Alaikum Goshtghar! I would like to order:\n- Product: ${product.name}\n- Weight/Size: ${selectedSize}\n- Quantity: ${quantity}\n- Total Price: ${formatPrice(product.newPrice)}`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-black/60 backdrop-blur-sm transition-all duration-300 animate-fadeIn">
      {/* Click Outside Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 border border-brand-border max-h-[90vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close product view"
          className="absolute top-4 right-4 z-20 w-9 h-9 bg-white/90 hover:bg-brand-pink text-brand-black hover:text-brand-red rounded-full flex items-center justify-center shadow-md transition-colors border border-gray-100"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Left Side: Product Image Box */}
        <div className="w-full md:w-1/2 bg-[#F9F6F3] p-6 flex flex-col items-center justify-center relative min-h-[260px] md:min-h-[420px]">
          {product.tag && (
            <span className="absolute top-4 left-4 z-10 bg-brand-red text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              {product.tag}
            </span>
          )}
          
          <div 
            className="w-full h-full min-h-[220px] flex items-center justify-center relative overflow-hidden cursor-crosshair rounded-lg"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                style={zoomStyle}
                className="max-h-[300px] w-auto object-contain transition-transform duration-100 ease-out"
              />
            ) : (
              <Placeholder label={product.name} className="w-full h-full min-h-[220px] rounded-lg" />
            )}
          </div>

          <div className={`mt-4 flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border ${product.inStock !== false ? "text-brand-grey bg-white/80 border-gray-100" : "text-brand-red bg-brand-pink/50 border-brand-red/20"}`}>
            {product.inStock !== false ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                In Stock & Freshly Prepared Daily
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-brand-red"></span>
                Currently Out of Stock
              </>
            )}
          </div>
        </div>

        {/* Right Side: Product Details & Controls */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[60vh] md:max-h-[90vh]">
          <div>
            {/* Category & Rating */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold text-brand-red uppercase tracking-wider bg-brand-pink/60 px-2.5 py-0.5 rounded-md">
                {product.cat}
              </span>
              <div className="flex items-center gap-1 text-xs font-bold text-brand-black bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                <StarIcon className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>{product.rating || 4.9}</span>
                <span className="text-gray-400 font-normal">(48 reviews)</span>
              </div>
            </div>

            {/* Product Title */}
            <h2 className="text-xl md:text-2xl font-bold text-brand-black leading-snug mb-3">
              {product.name}
            </h2>

            {/* Price & Savings */}
            <div className="flex items-baseline gap-3 mb-4 pb-4 border-b border-brand-border">
              <span className="text-2xl font-extrabold text-brand-black">Rs {formatPrice(product.newPrice)}</span>
              {product.oldPrice && (
                <span className="text-sm font-medium text-gray-400 line-through">
                  Rs {formatPrice(product.oldPrice)}
                </span>
              )}
              {product.oldPrice && (
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Save Discount
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs md:text-sm text-brand-black/80 leading-relaxed mb-5">
              {product.description ||
                "100% fresh, hygienic, antibiotic-free cuts sourced directly from our farm. Vacuum sealed to retain natural taste and tenderness."}
            </p>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-brand-black uppercase tracking-wider mb-2">
                Quantity:
              </label>
              <div className="inline-flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 flex items-center justify-center text-brand-black hover:bg-gray-200 transition-colors font-bold text-base"
                >
                  -
                </button>
                <span className="w-10 text-center text-sm font-bold text-brand-black bg-white py-1.5">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-9 h-9 flex items-center justify-center text-brand-black hover:bg-gray-200 transition-colors font-bold text-base"
                >
                  +
                </button>
              </div>
            </div>

            {/* Feature Bullet Points */}
            <div className="bg-brand-pink/30 p-3.5 rounded-xl mb-6 border border-brand-pink/50">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-brand-black/90">
                {features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-brand-red shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-2 border-t border-brand-border">
            {addedToast && (
              <div className="bg-emerald-600 text-white text-xs font-semibold px-4 py-2 rounded-lg text-center shadow-md animate-bounce">
                ✓ Added {quantity}x {product.name} ({selectedSize}) to Cart!
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                disabled={product.inStock === false}
                className={`text-white font-bold text-xs md:text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md ${
                  product.inStock !== false ? "bg-brand-black hover:bg-brand-red active:scale-95" : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                <CartIcon className="w-4 h-4 text-white" />
                <span>{product.inStock !== false ? "Add to Cart" : "Out of Stock"}</span>
              </button>

              <a
                href={`https://wa.me/923362127054?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs md:text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
              >
                <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.705 1.754zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-0.999 3.648 3.742-0.981z" />
                </svg>
                <span>Order via WhatsApp</span>
              </a>
            </div>

            <div className="text-center pt-1">
              <Link
                href={`/products/${product.id}`}
                onClick={onClose}
                className="text-xs font-semibold text-brand-grey hover:text-brand-red underline transition-colors"
              >
                View Full Product Page Details →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
