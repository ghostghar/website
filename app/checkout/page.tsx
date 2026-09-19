"use client";

import React, { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal } = useCart();
  
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    city: "Karachi",
    address: "",
    instructions: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    phone: "",
    address: "",
  });

  // Calculate totals
  const shippingFee = subtotal > 0 ? (subtotal > 3000 ? 0 : 150) : 0;
  const total = subtotal + shippingFee;

  // If cart is empty, redirect back to shop
  useEffect(() => {
    if (cart.length === 0) {
      router.push("/shop");
    }
  }, [cart, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { fullName: "", phone: "", address: "" };

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
      isValid = false;
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "WhatsApp number is required";
      isValid = false;
    }
    if (!formData.address.trim()) {
      newErrors.address = "Delivery address is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handlePlaceOrder = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Build the order summary
    const orderItems = cart.map(
      (item) => `- ${item.quantity}x ${item.name} (${item.size}) : Rs ${item.price * item.quantity}`
    ).join("\n");

    const message = 
      `Assalam-o-Alaikum Goshtghar! I would like to place a new order.\n\n` +
      `*CUSTOMER DETAILS:*\n` +
      `Name: ${formData.fullName}\n` +
      `WhatsApp: ${formData.phone}\n` +
      `City: ${formData.city}\n` +
      `Address: ${formData.address}\n` +
      (formData.instructions ? `Instructions: ${formData.instructions}\n\n` : `\n`) +
      `*ORDER DETAILS:*\n` +
      `${orderItems}\n\n` +
      `Subtotal: Rs ${subtotal}\n` +
      `Shipping: Rs ${shippingFee}\n` +
      `*Total Amount: Rs ${total}*\n` +
      `Payment Method: Cash on Delivery (COD)\n\n` +
      `Please confirm my order.`;

    // Redirect to WhatsApp
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/923362127054?text=${encodedMessage}`, "_blank");
  };

  if (cart.length === 0) return null; // Avoid rendering if empty

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <PageHeader 
        title="Checkout" 
        subtitle="Complete your delivery details to place the order." 
        breadcrumb="Shop / Cart / Checkout" 
      />

      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-container mx-auto px-5">
          <form onSubmit={handlePlaceOrder} className="flex flex-col lg:flex-row gap-10">
            
            {/* Left Column: Form Details */}
            <div className="w-full lg:w-2/3 space-y-8">
              
              {/* Delivery Information */}
              <div className="bg-white rounded-2xl border border-brand-border p-6 md:p-8 shadow-sm">
                <h2 className="text-xl font-bold text-brand-black mb-6 flex items-center gap-2">
                  <span className="bg-brand-red text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                  Delivery Details
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-semibold text-brand-black mb-2">Full Name *</label>
                    <input 
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Ali Ahmed"
                      className={`w-full px-4 py-3 rounded-xl border ${errors.fullName ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'} focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition-all`}
                    />
                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-semibold text-brand-black mb-2">WhatsApp Number *</label>
                    <input 
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="03XX-XXXXXXX"
                      className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'} focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition-all`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-semibold text-brand-black mb-2">City *</label>
                    <select 
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      disabled
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-gray-500 focus:outline-none transition-all appearance-none cursor-not-allowed"
                    >
                      <option value="Karachi">Karachi (Only)</option>
                    </select>
                  </div>

                  {/* Address */}
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-semibold text-brand-black mb-2">Complete Address *</label>
                    <textarea 
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="House/Apartment #, Street, Block, Area"
                      className={`w-full px-4 py-3 rounded-xl border ${errors.address ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'} focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition-all resize-none`}
                    ></textarea>
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>

                  {/* Special Instructions */}
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-semibold text-brand-black mb-2">Special Instructions <span className="text-gray-400 font-normal">(Optional)</span></label>
                    <input 
                      type="text"
                      name="instructions"
                      value={formData.instructions}
                      onChange={handleInputChange}
                      placeholder="e.g. Call before delivery, ring the bell twice"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl border border-brand-border p-6 md:p-8 shadow-sm">
                <h2 className="text-xl font-bold text-brand-black mb-6 flex items-center gap-2">
                  <span className="bg-brand-red text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                  Payment Method
                </h2>
                
                <div className="border-2 border-brand-red bg-brand-pink/20 rounded-xl p-4 flex items-center gap-4 cursor-pointer">
                  <div className="w-5 h-5 rounded-full border-4 border-brand-red bg-white flex-shrink-0"></div>
                  <div>
                    <div className="font-bold text-brand-black">Cash on Delivery (COD)</div>
                    <div className="text-xs text-brand-grey mt-0.5">Pay with cash when your order is delivered to your doorstep.</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Order Summary */}
            <div className="w-full lg:w-1/3">
              <div className="bg-[#F9F6F3] rounded-3xl p-6 md:p-8 border border-brand-border sticky top-28">
                <h3 className="text-xl font-bold text-brand-black mb-6">Your Order</h3>
                
                <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-14 h-14 bg-white rounded-lg border border-brand-border flex items-center justify-center p-1.5 flex-shrink-0 relative">
                        <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain" />
                        <span className="absolute -top-2 -right-2 bg-brand-black text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-sm font-bold text-brand-black line-clamp-1">{item.name}</h4>
                        <div className="text-xs text-brand-grey font-mono">{item.size}</div>
                        <div className="text-sm font-bold text-brand-red mt-1">Rs {item.price * item.quantity}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-brand-border/50 pt-5 space-y-3 mb-6">
                  <div className="flex justify-between text-brand-black text-sm">
                    <span>Subtotal</span>
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
                
                <div className="border-t border-brand-border pt-5 mb-8">
                  <div className="flex justify-between text-brand-black items-center">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-extrabold text-2xl text-brand-red">Rs {total}</span>
                  </div>
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-brand-red hover:bg-brand-redDark text-white font-bold py-4 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <span>Place Order via WhatsApp</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
                
                <div className="mt-4 text-center">
                  <Link href="/cart" className="text-sm text-brand-grey hover:text-brand-red transition-colors underline">
                    Return to Cart
                  </Link>
                </div>
              </div>
            </div>

          </form>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
