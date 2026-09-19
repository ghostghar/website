"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { fetchProducts } from "@/lib/apiClient";
import { ChickenIcon } from "./Icons";

export default function Products() {
  const [productList, setProductList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const filterTabs = [
    { slug: "all", name: "All Products" },
    { slug: "chicken", name: "Fresh Chicken" },
    { slug: "mutton", name: "Mutton Meat" },
    { slug: "live-chicken", name: "Live Chicken" },
    { slug: "eggs", name: "Farm Fresh Eggs" },
    { slug: "desi-products", name: "Desi Products" },
  ];

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetchProducts();
        if (res.success && res.data) {
          setProductList(res.data);
        }
      } catch (err) {
        console.warn("Error fetching homepage top picks:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-container mx-auto px-5">
        <h2 className="text-3xl md:text-[34px] font-bold text-center mb-2 text-brand-black">
          Our Fresh <span className="text-brand-red">Meat & Products</span>
        </h2>
        <p className="text-brand-grey text-center max-w-md mx-auto mb-8">
          Hand-selected premium organic cuts chosen specifically for top quality &amp; fresh taste
        </p>

        {/* Category Filter Pills (Navigation Links) */}
        <div className="flex items-center justify-center md:justify-center gap-2 overflow-x-auto max-w-full mb-10 pb-2 md:pb-0 scrollbar-hide">
          {filterTabs.map((tab) => {
            const href = tab.slug === "all" ? "/shop" : `/categories/${tab.slug}`;
            return (
              <Link
                key={tab.slug}
                href={href}
                className="px-4 py-2 text-xs md:text-sm font-semibold rounded-full whitespace-nowrap transition-all duration-200 bg-brand-cream/80 text-brand-black/80 hover:bg-brand-pink hover:text-brand-red"
              >
                {tab.name}
              </Link>
            );
          })}
        </div>



        {loading ? (
          <div className="py-12 text-center text-brand-grey text-sm">
            <div className="animate-spin inline-block w-7 h-7 border-2 border-brand-red border-t-transparent rounded-full mb-2"></div>
            <div>Loading fresh cuts...</div>
          </div>
        ) : productList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList.slice(0, 8).map((p, i) => (
              <ProductCard
                key={p.id || i}
                id={p.id || `prod-${i}`}
                name={p.name}
                cat={p.cat}
                catSlug={p.catSlug}
                newPrice={p.newPrice}
                oldPrice={p.oldPrice}
                tag={p.tag}
                sizes={p.sizes}
                desc={p.description}
                image={p.image}
                rating={p.rating || 4.9}
              />
            ))}
          </div>
        ) : (
          <div className="bg-brand-cream/50 border border-brand-border rounded-2xl p-12 text-center max-w-lg mx-auto shadow-sm">
            <div className="w-14 h-14 bg-brand-pink text-brand-red rounded-full flex items-center justify-center mx-auto mb-4">
              <ChickenIcon className="w-7 h-7 text-brand-red" />
            </div>
            <h3 className="text-xl font-bold text-brand-black mb-2">Fresh Products Coming Soon</h3>
            <p className="text-brand-grey text-sm mb-6">
              We are preparing 100% fresh, organic cuts. New products will be updated on the store soon!
            </p>
            <Link
              href="/shop"
              className="inline-block bg-brand-red hover:bg-brand-redDark text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-sm"
            >
              Explore Shop →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
