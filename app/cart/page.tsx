"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { useCart } from "@/context/CartContext";
import { CartIcon } from "@/components/Icons";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, subtotal } = useCart();
  
  const shippingFee = subtotal > 0 ? (subtotal > 3000 ? 0 : 150) : 0;
  const total = subtotal + shippingFee;

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <PageHeader 
        title="Your Cart" 
        subtitle="Review your organic meat selections before checkout." 
        breadcrumb="Shop / Cart" 
      />

      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-container mx-auto px-5">
          {cart.length === 0 ? (
            <div className="text-center py-20 bg-[#F9F6F3] rounded-3xl border border-brand-border">
              <div className="flex justify-center mb-6 text-brand-grey/50">
                <CartIcon className="w-20 h-20" />
              </div>
              <h2 className="text-2xl font-bold text-brand-black mb-3">Your cart is empty!</h2>
              <p className="text-brand-grey mb-8">Looks like you haven't added any fresh meat yet.</p>
              <Link 
                href="/shop" 
                className="inline-block bg-brand-red hover:bg-brand-redDark text-white font-bold py-3.5 px-8 rounded-xl transition-colors shadow-sm"
              >
                Browse Shop
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-10">
              {/* Cart Items List */}
              <div className="w-full lg:w-2/3">
                <div className="bg-white rounded-2xl border border-brand-border overflow-hidden shadow-sm">
                  <div className="hidden md:grid grid-cols-[3fr_1fr_1fr_auto] gap-4 p-5 bg-gray-50 border-b border-brand-border font-semibold text-brand-black text-sm">
                    <div>Product</div>
                    <div className="text-center">Quantity</div>
                    <div className="text-right">Price</div>
                    <div className="w-10"></div>
                  </div>
                  
                  <div className="divide-y divide-brand-border">
                    {cart.map((item) => (
                      <div key={item.id} className="grid grid-cols-1 md:grid-cols-[3fr_1fr_1fr_auto] gap-4 md:gap-4 items-center p-5">
                        {/* Product Info */}
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-20 bg-[#F9F6F3] rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center p-2 border border-brand-border/50">
                            <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain" />
                          </div>
                          <div>
                            <Link href={`/products/${item.productId}`} className="font-bold text-brand-black hover:text-brand-red transition-colors line-clamp-2 leading-tight mb-1">
                              {item.name}
                            </Link>
                            <div className="text-xs text-brand-grey font-mono">Size: {item.size}</div>
                            {/* Mobile Price */}
                            <div className="md:hidden text-brand-red font-bold mt-2">Rs {item.price}</div>
                          </div>
                        </div>

                        {/* Quantity Selector */}
                        <div className="flex items-center justify-start md:justify-center">
                          <div className="flex items-center bg-gray-50 border border-brand-border rounded-lg p-1">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center text-brand-black hover:text-brand-red hover:bg-white rounded-md transition-colors"
                            >
                              -
                            </button>
                            <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center text-brand-black hover:text-brand-red hover:bg-white rounded-md transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="hidden md:block text-right font-bold text-brand-black">
                          Rs {item.price * item.quantity}
                        </div>

                        {/* Remove Action */}
                        <div className="absolute top-5 right-5 md:relative md:top-auto md:right-auto text-right">
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                            aria-label="Remove item"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="w-full lg:w-1/3">
                <div className="bg-[#F9F6F3] rounded-3xl p-8 border border-brand-border sticky top-28">
                  <h3 className="text-xl font-bold text-brand-black mb-6">Order Summary</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-brand-black text-sm">
                      <span>Subtotal ({cart.length} items)</span>
                      <span className="font-semibold">Rs {subtotal}</span>
                    </div>
                    <div className="flex justify-between text-brand-black text-sm">
                      <span>Shipping Fee</span>
                      {shippingFee === 0 ? (
                        <span className="font-bold text-green-600">Free</span>
                      ) : (
                        <span className="font-semibold">Rs {shippingFee}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="border-t border-brand-border/50 pt-5 mb-8">
                    <div className="flex justify-between text-brand-black items-center">
                      <span className="font-bold text-lg">Total</span>
                      <span className="font-extrabold text-2xl text-brand-red">Rs {total}</span>
                    </div>
                    {subtotal > 0 && subtotal < 3000 && (
                      <p className="text-xs text-brand-grey mt-2">
                        Add Rs {3000 - subtotal} more to your cart for free shipping!
                      </p>
                    )}
                  </div>
                  
                  <Link 
                    href="/checkout"
                    className="w-full bg-brand-red hover:bg-brand-redDark text-white font-bold py-4 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Checkout</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>

                  <div className="mt-6 flex items-center justify-center gap-3 text-xs text-brand-grey font-medium">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                    100% Secure & Halal Guarantee
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
