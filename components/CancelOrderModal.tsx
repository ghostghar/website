"use client";

import React, { useEffect } from "react";

interface CancelOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinueOrder?: () => void;
}

export default function CancelOrderModal({
  isOpen,
  onClose,
  onContinueOrder,
}: CancelOrderModalProps) {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-brand-black/70 backdrop-blur-xs animate-fadeIn">
      {/* Backdrop overlay */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Modal Card */}
      <div className="relative w-[92vw] sm:w-full max-w-md bg-white rounded-3xl p-5 sm:p-7 shadow-2xl z-10 border border-brand-border font-poppins">
        {/* Close Button 'X' */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-brand-pink/60 hover:bg-brand-red text-brand-black hover:text-white flex items-center justify-center transition-colors shadow-2xs border border-brand-pink/80"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Title */}
        <h3 className="text-base sm:text-lg font-bold text-brand-black pr-6 mb-4 leading-snug">
          Products in huge demand might run{" "}
          <span className="text-brand-red font-black bg-brand-pink/60 px-2 py-0.5 rounded-md inline-block">Out of Stock</span>
        </h3>

        {/* Inner Box */}
        <div className="border border-brand-pink/60 rounded-2xl p-4 sm:p-5 bg-brand-cream/50 space-y-4 shadow-2xs">
          <p className="text-xs sm:text-sm font-semibold text-brand-black leading-relaxed">
            Are you sure you want to cancel payment?
          </p>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              onClick={onClose}
              className="w-full bg-brand-black hover:bg-brand-dark text-white font-bold py-3.5 px-3 sm:px-4 rounded-xl transition-all shadow-md active:scale-95 text-xs sm:text-sm text-center flex items-center justify-center"
            >
              Yes
            </button>
            <button
              onClick={() => {
                onClose();
                if (onContinueOrder) {
                  onContinueOrder();
                }
              }}
              className="w-full bg-brand-red hover:bg-brand-redDark text-white font-bold py-3.5 px-3 sm:px-4 rounded-xl transition-all shadow-md active:scale-95 text-xs sm:text-sm text-center flex items-center justify-center"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
