"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchIcon, CartIcon } from "./Icons";

const shopDropdownItems = [
  { name: "All Products", href: "/shop" },
  { name: "Fresh Chicken", href: "/categories/chicken" },
  { name: "Mutton Meat", href: "/categories/mutton" },
  { name: "Live Chicken", href: "/categories/live-chicken" },
  { name: "Farm Fresh Eggs", href: "/categories/eggs" },
  { name: "Desi Products", href: "/categories/desi-products" },
];

export default function Header() {
  const pathname = usePathname();

  const isHomeActive = pathname === "/";
  const isShopActive = pathname.startsWith("/shop");
  const isFarmActive = pathname === "/farm-story";
  const isAboutActive = pathname === "/about";
  const isContactActive = pathname === "/contact";

  const activeLinkClass = "text-brand-red font-semibold relative py-1 after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-[2.5px] after:bg-brand-red after:rounded-full transition-all";
  const inactiveLinkClass = "text-brand-black/90 hover:text-brand-red transition-colors py-1";

  return (
    <header className="border-b border-brand-border bg-white sticky top-0 z-50">
      <div className="max-w-container mx-auto px-5 py-4 flex items-center justify-between gap-6">
        {/* Brand Logo (Left) */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="inline-block w-7 h-7 bg-brand-red rounded-[60%_60%_60%_5%] rotate-45" />
          <span className="text-2xl font-bold tracking-tight text-brand-black">Goshtghar</span>
        </Link>

        {/* Navbar Links (Middle) */}
        <nav className="hidden lg:flex">
          <ul className="flex items-center gap-8">
            {/* Home */}
            <li>
              <Link
                href="/"
                className={`text-[15px] ${isHomeActive ? activeLinkClass : inactiveLinkClass}`}
              >
                Home
              </Link>
            </li>

            {/* Shop Now with Dropdown */}
            <li className="relative group py-1">
              <Link
                href="/shop"
                className={`flex items-center gap-1.5 text-[15px] ${isShopActive ? activeLinkClass : inactiveLinkClass}`}
              >
                <span>Shop Now</span>
                <svg className="w-3 h-3 ml-0.5 transition-transform duration-200 group-hover:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>

              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-100 border-t-2 border-t-brand-red shadow-xl rounded-b-md py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {shopDropdownItems.map((subItem) => (
                  <Link
                    key={subItem.name}
                    href={subItem.href}
                    className="block px-5 py-2.5 text-[14px] font-medium text-brand-black/90 hover:text-brand-red hover:bg-brand-pink/30 transition-colors"
                  >
                    {subItem.name}
                  </Link>
                ))}
              </div>
            </li>

            {/* Our Farm Story */}
            <li>
              <Link
                href="/farm-story"
                className={`text-[15px] ${isFarmActive ? activeLinkClass : inactiveLinkClass}`}
              >
                Our Farm Story
              </Link>
            </li>

            {/* About us */}
            <li>
              <Link
                href="/about"
                className={`text-[15px] ${isAboutActive ? activeLinkClass : inactiveLinkClass}`}
              >
                About us
              </Link>
            </li>

            {/* Contact us */}
            <li>
              <Link
                href="/contact"
                className={`text-[15px] ${isContactActive ? activeLinkClass : inactiveLinkClass}`}
              >
                Contact us
              </Link>
            </li>
          </ul>
        </nav>

        {/* Right Action Icons (Search & Cart only) */}
        <div className="flex items-center gap-5">
          <button aria-label="search" className="text-brand-black/80 hover:text-brand-red transition-colors">
            <SearchIcon />
          </button>
          <button aria-label="cart" className="relative text-brand-black/80 hover:text-brand-red transition-colors">
            <CartIcon />
            <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-brand-red text-white text-[10px] flex items-center justify-center font-bold">
              0
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
