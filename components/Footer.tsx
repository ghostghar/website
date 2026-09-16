import Link from "next/link";
import Placeholder from "./Placeholder";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Categories", href: "/categories" },
  { name: "Shop", href: "/shop" },
  { name: "About Us", href: "/about" },
  { name: "Blogs", href: "/blogs" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-black text-gray-300 mt-16 pt-16">
      <div className="max-w-container mx-auto px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10 pb-12">
        <div>
          <Link href="/" className="flex items-center gap-2 mb-4">
            <span className="inline-block w-7 h-7 bg-brand-red rounded-[60%_60%_60%_5%] rotate-45" />
            <span className="text-2xl font-bold text-white">Goshtghar</span>
          </Link>
          <p className="text-gray-400 text-sm max-w-xs mb-5">
            Conveniently synergize premium collaborate &amp; structuring with
            competitive product implicate paradigms one-to-one intellectual
            capital.
          </p>
          <div className="flex gap-2.5">
            <Placeholder label="Google Play" showText={false} className="w-[130px] h-10 !bg-[#2a2a2a] !border-[#444] text-gray-500 text-[10px]" />
            <Placeholder label="App Store" showText={false} className="w-[130px] h-10 !bg-[#2a2a2a] !border-[#444] text-gray-500 text-[10px]" />
          </div>
        </div>

        <div>
          <h4 className="text-white text-base font-semibold mb-5">Quick Links</h4>
          <ul className="space-y-3">
            {quickLinks.map((l) => (
              <li key={l.name}>
                <Link href={l.href} className="text-gray-400 text-sm hover:text-white transition-colors">
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white text-base font-semibold mb-5">Meat Categories</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link href="/categories/chicken" className="hover:text-white transition-colors">Fresh Chicken</Link></li>
            <li><Link href="/categories/mutton" className="hover:text-white transition-colors">Mutton &amp; Lamb Meat</Link></li>
            <li><Link href="/categories/live-chicken" className="hover:text-white transition-colors">Live Chicken</Link></li>
            <li><Link href="/shop" className="hover:text-white transition-colors">Special Cuts</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-base font-semibold mb-5">Customer Support</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link href="/contact" className="hover:text-white transition-colors">Order Tracking</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">Delivery Terms</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Help &amp; FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-container mx-auto px-5 py-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-gray-400">
          <span>© All rights reserved. Goshtghar Meat Firm</span>
          <span>Terms &amp; conditions &nbsp;|&nbsp; Privacy Policy</span>
        </div>
      </div>
    </footer>
  );
}
