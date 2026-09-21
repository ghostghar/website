"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { fetchTopPicks } from "@/lib/apiClient";
import { ChickenIcon } from "./Icons";

export default function Products() {
  const [topPicks, setTopPicks] = useState<any[]>([]);
  const [topPicksLoading, setTopPicksLoading] = useState<boolean>(true);

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
        const topRes = await fetchTopPicks();
        if (topRes.success && topRes.data) setTopPicks(topRes.data.slice(0, 4));
      } catch (err) {
        console.warn("Error fetching top picks:", err);
      } finally {
        setTopPicksLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-container mx-auto px-5">
        <h2 className="text-3xl md:text-[34px] font-bold text-center mb-2 text-brand-black">
          Our Fresh <span className="text-brand-red">Meat &amp; Products</span>
        </h2>
        <p className="text-brand-grey text-center max-w-md mx-auto mb-8">
          Hand-selected premium organic cuts chosen specifically for top quality &amp; fresh taste
        </p>

        {/* Category Filter Pills */}
        <div className="w-full mb-10">
          <div
            className="flex items-center gap-2 overflow-x-auto pb-2 md:justify-center"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {filterTabs.map((tab) => {
              const href = tab.slug === "all" ? "/shop" : `/categories/${tab.slug}`;
              return (
                <Link
                  key={tab.slug}
                  href={href}
                  className="flex-shrink-0 px-4 py-2 text-xs md:text-sm font-semibold rounded-full whitespace-nowrap transition-all duration-200 bg-brand-cream/80 text-brand-black/80 hover:bg-brand-pink hover:text-brand-red"
                >
                  {tab.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* ── TOP PICKS SECTION ── */}
        <div className="mb-16">
          {/* Heading */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1 h-5 rounded-full bg-brand-red inline-block" />
                <span className="text-xs font-semibold tracking-widest uppercase text-brand-red">
                  Hand Picked
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-black">
                Top <span className="text-brand-red">Picks</span>
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-brand-black hover:text-brand-red transition-colors border-b border-brand-black hover:border-brand-red pb-0.5"
            >
              View All →
            </Link>
          </div>

          {/* Top Pick Cards */}
          {topPicksLoading ? (
            <div className="py-10 text-center text-brand-grey text-sm">
              <div className="animate-spin inline-block w-6 h-6 border-2 border-brand-red border-t-transparent rounded-full mb-2" />
              <div>Loading top picks...</div>
            </div>
          ) : topPicks.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
              {topPicks.map((p, i) => (
                <ProductCard
                  key={p.id || i}
                  id={p.id || `tp-${i}`}
                  name={p.name}
                  cat={p.cat}
                  catSlug={p.catSlug}
                  newPrice={p.newPrice}
                  oldPrice={p.oldPrice}
                  tag={p.tag}
                  desc={p.description}
                  image={p.image}
                  rating={p.rating || 4.9}
                  inStock={p.inStock}
                />
              ))}
            </div>
          ) : (
            <div className="bg-brand-cream/40 border border-dashed border-brand-border rounded-2xl py-10 text-center">
              <div className="text-3xl mb-3">📌</div>
              <p className="text-brand-grey text-sm">
                No top picks yet. Mark products as{" "}
                <strong className="text-brand-black">Top Pick</strong> from the Admin Panel.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
