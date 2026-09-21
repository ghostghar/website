"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { products as fallbackProducts, categories as fallbackCategories } from "@/lib/data";
import { fetchProducts, fetchCategories } from "@/lib/apiClient";
import { CartIcon } from "@/components/Icons";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get("cat") || "all";

  const [activeTab, setActiveTab] = useState<string>(initialCat);
  const [productList, setProductList] = useState<any[]>([]);
  const [categoryList, setCategoryList] = useState<any[]>(fallbackCategories);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ]);
        if (prodRes.success && Array.isArray(prodRes.data)) {
          setProductList(prodRes.data);
        }
        if (catRes.success && Array.isArray(catRes.data) && catRes.data.length > 0) {
          setCategoryList(catRes.data);
        }
      } catch (err) {
        console.warn("Failed to fetch shop product data:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const filterTabs = useMemo(() => {
    return [
      { slug: "all", name: "All Products" },
      { slug: "chicken", name: "Fresh Chicken" },
      { slug: "mutton", name: "Mutton Meat" },
      { slug: "live-chicken", name: "Live Chicken" },
      { slug: "eggs", name: "Farm Fresh Eggs" },
      { slug: "desi-products", name: "Desi Products" },
    ];
  }, []);

  const filteredProducts = useMemo(() => {
    if (activeTab === "all") {
      return productList;
    }
    return productList.filter(
      (p) =>
        p.catSlug === activeTab ||
        p.cat.toLowerCase().includes(activeTab.toLowerCase().replace("-", " "))
    );
  }, [activeTab, productList]);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-container mx-auto px-5">
        {/* Section Heading & Category Tabs */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 pb-6 border-b border-brand-border">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-brand-black">
              {activeTab === "all"
                ? "All Fresh Products"
                : categoryList.find((c) => c.slug === activeTab)?.name || "Category Products"}
            </h2>
            <p className="text-brand-grey text-sm mt-1">
              Showing {filteredProducts.length} items in stock
            </p>
          </div>


        </div>

        {/* Product Grid or Empty Category State */}
        {isLoading ? (
          <div className="py-16 text-center">
            <div className="animate-spin inline-block w-8 h-8 border-2 border-brand-red border-t-transparent rounded-full mb-3"></div>
            <div className="text-brand-grey text-sm">Loading fresh cuts from Goshtghar...</div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p, i) => (
              <ProductCard
                key={p.id || i}
                id={p.id || `prod-${i}`}
                name={p.name}
                cat={p.cat}
                catSlug={p.catSlug}
                newPrice={p.newPrice}
                oldPrice={p.oldPrice}
                tag={p.tag}
                desc={p.description || p.desc}
                features={p.features}
                image={p.image}
                rating={p.rating || 4.9}
              />
            ))}
          </div>
        ) : (
          <div className="bg-brand-cream/40 border border-brand-border rounded-xl p-12 text-center max-w-xl mx-auto my-8">
            <div className="w-16 h-16 bg-brand-pink text-brand-red rounded-full flex items-center justify-center mx-auto mb-4">
              <CartIcon className="w-8 h-8 text-brand-red" />
            </div>
            <h3 className="text-xl font-bold text-brand-black mb-2">
              Products Coming Soon
            </h3>
            <p className="text-brand-grey text-sm mb-6">
              We are currently preparing 100% fresh, organic products for this category. All products will be available soon!
            </p>
            <button
              onClick={() => setActiveTab("all")}
              className="bg-brand-black hover:bg-black text-white text-xs font-semibold px-6 py-3 rounded-md transition-colors"
            >
              View All Products ({productList.length})
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <PageHeader
        title="Shop All Products"
        subtitle="Browse our complete collection of fresh organic chicken, mutton, and specialty cuts."
        breadcrumb="Shop"
      />
      <Suspense fallback={<div className="py-20 text-center text-brand-grey">Loading Products...</div>}>
        <ShopContent />
      </Suspense>
      <Footer />
    </main>
  );
}
