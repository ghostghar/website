import type { Metadata } from "next";
import { Poppins, Outfit } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gosht Ghar - Fresh Organic Meat & Poultry Firm",
  description: "Gosht Ghar - Fresh, premium quality halal organic meat and farm products.",
};

import { CartProvider } from "@/context/CartContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${outfit.variable}`}>
      <body className="font-sans bg-white text-brand-black antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
