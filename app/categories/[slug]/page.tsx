"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import Link from "next/link";
import { categories as fallbackCategories } from "@/lib/data";
import { fetchProducts, fetchCategories } from "@/lib/apiClient";
import { ChickenIcon, ArrowIcon } from "@/components/Icons";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default function CategoryDetailPage({ params }: CategoryPageProps) {
  const categoryNameMap: Record<string, string> = {
    "chicken": "Fresh Chicken",
    "mutton": "Mutton Meat",
    "live-chicken": "Live Chicken",
    "eggs": "Farm Fresh Eggs",
    "desi-products": "Desi Products"
  };

  const defaultName = categoryNameMap[params.slug] || params.slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  const [category, setCategory] = useState<any>({
    name: defaultName,
    slug: params.slug,
    desc: "Fresh organic selection at Gosht Ghar.",
  });
  const [categoryProducts, setCategoryProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadCategoryData() {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetchProducts(params.slug),
          fetchCategories(),
        ]);

        if (catRes.success && Array.isArray(catRes.data)) {
          const foundCat = catRes.data.find((c: any) => c.slug === params.slug);
          if (foundCat) {
            setCategory({ ...foundCat, name: categoryNameMap[params.slug] || foundCat.name });
          }
        } else {
          const foundCat = fallbackCategories.find((c) => c.slug === params.slug);
          if (foundCat) {
            setCategory({ ...foundCat, name: categoryNameMap[params.slug] || foundCat.name });
          }
        }

        if (prodRes.success && Array.isArray(prodRes.data)) {
          // Filter if cat parameter didn't already filter strictly
          const filtered = prodRes.data.filter(
            (p: any) =>
              p.catSlug === params.slug ||
              p.cat?.toLowerCase().includes(params.slug.toLowerCase().replace("-", " "))
          );
          setCategoryProducts(filtered);
        }
      } catch (err) {
        console.warn("Error fetching category products:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadCategoryData();
  }, [params.slug]);

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <PageHeader
        title={category.name}
        subtitle={category.desc || "Fresh organic selection at Gosht Ghar."}
        breadcrumb={`Categories / ${category.name}`}
      />

      <section className="py-20 bg-white">
        <div className="max-w-container mx-auto px-5">
          {isLoading ? (
            <div className="py-16 text-center">
              <div className="animate-spin inline-block w-8 h-8 border-2 border-brand-red border-t-transparent rounded-full mb-3"></div>
              <div className="text-brand-grey text-sm">Loading category products...</div>
            </div>
          ) : categoryProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
              {categoryProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  cat={p.cat}
                  catSlug={p.catSlug}
                  newPrice={p.newPrice}
                  oldPrice={p.oldPrice}
                  tag={p.tag}
                  desc={p.description || p.desc}
                  image={p.image}
                  rating={p.rating}
                  inStock={p.inStock}
                />
              ))}
            </div>
          ) : (
            /* Empty Category Banner - Products Coming Soon */
            <div className="bg-brand-cream/60 border border-brand-border rounded-xl p-10 md:p-16 text-center max-w-3xl mx-auto shadow-sm">
              <div className="w-20 h-20 bg-brand-pink text-brand-red rounded-full flex items-center justify-center mx-auto mb-6">
                <ChickenIcon className="w-10 h-10 text-brand-red" />
              </div>

              <h3 className="text-2xl font-bold text-brand-black mb-3">
                Products Coming Soon to {category.name}
              </h3>

              <p className="text-brand-grey text-sm md:text-base max-w-lg mx-auto mb-8 leading-relaxed">
                We are preparing 100% fresh, organic, and high-quality stock for this category. All products will be available here soon!
              </p>

              {/* Empty Product Grid Outline Placeholders */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 text-left opacity-75">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-white flex flex-col items-center justify-center text-center h-44">
                    <div className="w-10 h-10 rounded-full bg-gray-100 mb-3 flex items-center justify-center text-gray-400 text-lg">
                      +
                    </div>
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Product Slot #{item}</span>
                    <span className="text-[11px] text-gray-400 mt-1">Available Soon</span>
                  </div>
                ))}
              </div>

              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-brand-black hover:bg-black text-white text-sm font-semibold px-8 py-3.5 rounded-md transition-colors shadow-sm"
              >
                <span>Browse All Shop Products</span>
                <ArrowIcon className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
