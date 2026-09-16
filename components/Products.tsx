"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { fetchProducts } from "@/lib/apiClient";
import { ChickenIcon } from "./Icons";

export default function Products() {
  const [productList, setProductList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
          Our Top <span className="text-brand-red">Picks</span>
        </h2>
        <p className="text-brand-grey text-center max-w-md mx-auto mb-12">
          Hand-selected premium organic cuts chosen specifically for top quality &amp; fresh taste
        </p>

        {loading ? (
          <div className="py-12 text-center text-brand-grey text-sm">
            <div className="animate-spin inline-block w-7 h-7 border-2 border-brand-red border-t-transparent rounded-full mb-2"></div>
            <div>Loading fresh cuts...</div>
          </div>
        ) : productList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList.slice(0, 4).map((p, i) => (
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
              Hum 100% fresh, organic cuts prepare kar rahe hain. Naye products jald hi store par update honge!
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
