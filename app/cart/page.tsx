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
  
  const broilerKg = cart.filter(item => item.catSlug === 'chicken' || (item.cat && item.cat.toLowerCase().includes('chicken')) || item.name.toLowerCase().includes('broiler')).reduce((acc, item) => acc + item.quantity, 0);
  const desiKg = cart.filter(item => item.catSlug === 'desi-products' || (item.cat && item.cat.toLowerCase().includes('desi')) || item.name.toLowerCase().includes('desi') || item.name.toLowerCase().includes('aseel')).reduce((acc, item) => acc + item.quantity, 0);
  
  const isFreeDelivery = broilerKg >= 7 || desiKg >= 3;
  const shippingFee = subtotal > 0 ? (isFreeDelivery ? 0 : 300) : 0;
  const total = subtotal + shippingFee;

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;
    
    const orderDetails = cart.map(
      (item) => `- ${item.quantity}x ${item.name} (${item.size}) : Rs ${item.price * item.quantity}`
    ).join("\n");
    
    const message = encodeURIComponent(
      `Assalam-o-Alaikum Goshtghar! I would like to quickly order from my Cart:\n\n${orderDetails}\n\nSubtotal: Rs ${subtotal}\nShipping: Rs ${shippingFee}\n*Total: Rs ${total}*\n\nMy delivery details are as follows:\n[Please provide your Name, Address, and Phone number here]`
    );
    
    window.open(`https://wa.me/923362127054?text=${message}`, "_blank");
  };

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
                    {shippingFee > 0 && (
                      <p className="text-xs text-brand-grey mt-2">
                        Order 7kg+ Broiler or 3kg+ Desi/Aseel for free delivery!
                      </p>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <Link 
                      href="/checkout"
                      className="w-full bg-brand-red hover:bg-brand-redDark text-white font-bold py-4 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
                    >
                      <span>Proceed to Checkout</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>

                    <button 
                      onClick={handleWhatsAppCheckout}
                      className="w-full bg-[#25D366] hover:bg-[#20b858] text-white font-bold py-4 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                      </svg>
                      <span>Quick Order via WhatsApp</span>
                    </button>
                  </div>

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
