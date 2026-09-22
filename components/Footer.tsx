import Link from "next/link";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Shop Now", href: "/shop" },
  { name: "Our Farm Story", href: "/farm-story" },
  { name: "Contact Us", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-black text-gray-300 mt-16 pt-16">
      <div className="max-w-container mx-auto px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10 pb-12">
        <div>
          <Link href="/" className="flex items-center gap-3 mb-4 w-max">
            <img src="/images/logo.png" alt="Gosht Ghar Logo" className="h-14 md:h-16 w-auto object-contain" />
            <span className="text-2xl font-bold text-white tracking-tight">Gosht Ghar</span>
          </Link>
          <p className="text-gray-400 text-sm max-w-xs mb-5">
            Gosht Ghar is your trusted source for premium, 100% halal, and farm-fresh meat delivered right to your doorstep in Karachi. Experience hygiene and quality like never before.
          </p>
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
            <li><Link href="/categories/mutton" className="hover:text-white transition-colors">Mutton Meat</Link></li>
            <li><Link href="/categories/live-chicken" className="hover:text-white transition-colors">Live Chicken</Link></li>
            <li><Link href="/categories/eggs" className="hover:text-white transition-colors">Farm Fresh Eggs</Link></li>
            <li><Link href="/categories/desi-products" className="hover:text-white transition-colors">Desi Products</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-base font-semibold mb-5">Customer Support</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link href="/contact" className="hover:text-white transition-colors">Help &amp; FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-container mx-auto px-5 py-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-gray-400">
          <span>© All rights reserved. Gosht Ghar Meat Firm</span>
          <span>Terms &amp; conditions &nbsp;|&nbsp; Privacy Policy</span>
        </div>
      </div>
    </footer>
  );
}
