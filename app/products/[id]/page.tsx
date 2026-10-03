"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import Placeholder from "@/components/Placeholder";
import { fetchProducts } from "@/lib/apiClient";
import { StarIcon, CartIcon, ArrowIcon } from "@/components/Icons";
import { useCart } from "@/context/CartContext";

const formatPrice = (p: string | undefined) => {
  if (!p) return "";
  const num = parseFloat(p.toString().replace(/[^0-9.]/g, ""));
  return isNaN(num) ? p : num.toLocaleString();
};

interface ProductPageProps {
  params: {
    id: string;
  };
}

const mockReviews = [
  {
    id: 1,
    name: "Tariq Mahmood",
    date: "3 days ago",
    rating: 5,
    comment: "SubhaanAllah! Absolutely fresh chicken cut. The vacuum packaging kept the chicken moist and clean. Delivery was super fast within Lahore!",
    verified: true,
  },
  {
    id: 2,
    name: "Ayesha Malik",
    date: "1 week ago",
    rating: 5,
    comment: "Authentic organic farm quality. Meat smelled completely fresh with zero bad odor. Highly recommended for families looking for pure organic meat!",
    verified: true,
  },
  {
    id: 3,
    name: "Usman Ghani",
    date: "2 weeks ago",
    rating: 5,
    comment: "Halal certified and temperature controlled delivery is real. Meat was still cold when delivered to my kitchen.",
    verified: true,
  },
];

function getProductCareInfo(product: any) {
  if (!product) {
    return {
      tabTitle: "Handling & Cooking Tips",
      fallbackDesc: (
        <p>Fresh farm-quality product delivered with utmost care.</p>
      ),
      tips: (
        <div className="space-y-3 text-xs md:text-sm text-brand-black/90">
          <p><strong>Storage:</strong> Keep refrigerated to maintain freshness.</p>
        </div>
      ),
    };
  }

  const name = (product.name || "").toLowerCase();
  const cat = (product.cat || "").toLowerCase();
  const slug = (product.catSlug || "").toLowerCase();

  // 1. Eggs (Cat / Slug / Name contains egg / anda / ande / tray)
  const isEgg =
    slug === "eggs" ||
    cat.includes("egg") ||
    cat.includes("ande") ||
    cat.includes("anda") ||
    name.includes("egg") ||
    name.includes("anda") ||
    name.includes("ande") ||
    name.includes("tray");

  if (isEgg) {
    return {
      tabTitle: "Storage & Freshness Tips",
      fallbackDesc: (
        <>
          <p>
            At Gosht Ghar, our <strong>{product.name}</strong> are sourced directly from healthy, free-range farm hens fed on 100% natural, vegetarian grains without any artificial growth hormones or chemicals.
          </p>
          <p>
            Each egg is carefully inspected for shell integrity and freshness, securely packed in protective trays to reach your kitchen uncracked and rich in natural proteins, vitamins, and deep golden yolks.
          </p>
        </>
      ),
      tips: (
        <div className="space-y-3 text-xs md:text-sm text-brand-black/90">
          <p>
            <strong>Storage:</strong> Store in a cool, dry place or in the refrigerator between 2°C to 7°C. Keep eggs pointed-end down in their carton to keep the yolk centered and fresh for up to 3–4 weeks.
          </p>
          <p>
            <strong>Handling & Washing:</strong> Do not wash eggs before storing. Washing removes the egg's natural outer protective cuticle bloom that seals pores against air and bacteria. Only rinse gently with cool water right before cooking if desired.
          </p>
          <p>
            <strong>Freshness Float Test:</strong> Place an egg in a bowl of cold water: super-fresh eggs lie flat at the bottom; slightly older eggs tilt upright (still good to eat); eggs that float to the surface should be discarded.
          </p>
          <p>
            <strong>Recommended Uses:</strong> Perfect for morning half-fry, boiled eggs, fluffy omelettes, traditional Anda Curry, baking, or high-protein fitness diets.
          </p>
        </div>
      ),
    };
  }

  // 2. Dairy & Desi Pantry (Ghee, Butter/Makhan, Honey, Oils, Shakkar, Panjeeri)
  const isDairyOrPantry =
    name.includes("ghee") ||
    name.includes("butter") ||
    name.includes("makhan") ||
    name.includes("honey") ||
    name.includes("shehad") ||
    name.includes("oil") ||
    name.includes("tel") ||
    name.includes("shakkar") ||
    name.includes("gur") ||
    name.includes("panjeeri");

  if (isDairyOrPantry) {
    return {
      tabTitle: "Storage & Purity Guide",
      fallbackDesc: (
        <>
          <p>
            Gosht Ghar's <strong>{product.name}</strong> is 100% pure, natural, and prepared using authentic traditional methods. Guaranteed zero preservatives, synthetic colors, or chemical adulteration.
          </p>
          <p>
            Packed in food-grade, airtight packaging to preserve its authentic aroma, rich golden purity, and wholesome natural nourishment.
          </p>
        </>
      ),
      tips: (
        <div className="space-y-3 text-xs md:text-sm text-brand-black/90">
          <p>
            <strong>Storage:</strong> Store in a cool, dark, dry place away from direct sunlight. Seal container tightly after every use.
          </p>
          <p>
            <strong>Hygiene & Purity Tip:</strong> Always use a clean, dry stainless steel spoon. Never introduce moisture or wet utensils to prevent spoiling and ensure maximum shelf life.
          </p>
          <p>
            <strong>Shelf Life:</strong> Pure Desi Ghee & Honey can be stored safely at normal room temperature for up to 12 months. Fresh Desi Butter (Makhan) should be kept refrigerated below 4°C.
          </p>
          <p>
            <strong>Culinary Suggestions:</strong> Ideal for crisp morning parathas, aromatic daal tadkas, traditional halwas, desserts, and daily nutritional wellness.
          </p>
        </div>
      ),
    };
  }

  // 3. Desi / Aseel Chicken (Leaner, firmer poultry requiring slow cooking)
  const isDesiPoultry =
    name.includes("aseel") ||
    (name.includes("desi") && (name.includes("chicken") || name.includes("murgh") || name.includes("murgha")));

  if (isDesiPoultry) {
    return {
      tabTitle: "Handling & Slow-Cooking Tips",
      fallbackDesc: (
        <>
          <p>
            Our authentic <strong>{product.name}</strong> comes from active, free-range desi birds raised on open fields and organic grains. Desi chicken features firmer muscle texture, lean meat, and deep, traditional aroma.
          </p>
          <p>
            Processed strictly under 100% Halal Zabiha standards and vacuum sealed immediately after dressing to preserve essential nutrients and farm freshness.
          </p>
        </>
      ),
      tips: (
        <div className="space-y-3 text-xs md:text-sm text-brand-black/90">
          <p>
            <strong>Storage:</strong> Keep refrigerated at 0°C to 4°C for cooking within 48 hours, or freeze at -18°C for up to 3 months.
          </p>
          <p>
            <strong>Slow-Cooking Secret:</strong> Authentic Desi / Aseel chicken has firmer, active muscle fibers compared to commercial broilers. For juicy, tender meat, cook on low flame (Dum style) or pressure-cook for 15–20 minutes with bone-in cuts.
          </p>
          <p>
            <strong>Thawing Tip:</strong> If frozen, thaw slowly in the refrigerator overnight. Avoid using warm water to maintain tenderness.
          </p>
          <p>
            <strong>Recommended Dishes:</strong> World-famous for Desi Murgh Yakhni (energizing winter broth), Shorba Salan, Shinwari Karahi, and traditional Aseel Pulao.
          </p>
        </div>
      ),
    };
  }

  // 4. Live Poultry
  const isLive = slug === "live-chicken" || cat.includes("live") || name.includes("live");

  if (isLive) {
    return {
      tabTitle: "Live Poultry & Dressing Guide",
      fallbackDesc: (
        <>
          <p>
            Healthy, active <strong>{product.name}</strong> hand-selected from vetted bio-secure organic farms. Vaccinated and fed on 100% natural vegetarian grains.
          </p>
          <p>
            Available for live delivery or fresh custom Halal slaughter and dressing per your family's exact portion requirements.
          </p>
        </>
      ),
      tips: (
        <div className="space-y-3 text-xs md:text-sm text-brand-black/90">
          <p>
            <strong>Halal Zabiha Dressing:</strong> If requested with dressing, each bird is individually slaughtered by experienced Muslim butchers reciting Takbeer, thoroughly cleaned, and cut to your preference (Karahi Cut, Biryani Cut, or Whole Roast).
          </p>
          <p>
            <strong>Post-Dressing Storage:</strong> Once dressed, chill below 4°C immediately or freeze if not cooking within 24–48 hours.
          </p>
        </div>
      ),
    };
  }

  // 5. General Desi Products (Other authentic items in Desi category)
  if (slug === "desi-products" || cat.includes("desi")) {
    return {
      tabTitle: "Storage & Usage Tips",
      fallbackDesc: (
        <>
          <p>
            At Gosht Ghar, our <strong>{product.name}</strong> represents the finest traditional, pure, and organic produce sourced directly from trusted village farms.
          </p>
          <p>
            Hygienically handled and packaged without chemical preservatives or artificial additives to bring genuine desi goodness to your home.
          </p>
        </>
      ),
      tips: (
        <div className="space-y-3 text-xs md:text-sm text-brand-black/90">
          <p>
            <strong>Storage:</strong> Store in a cool, clean, and dry environment. Keep in an airtight container away from moisture and heat.
          </p>
          <p>
            <strong>Quality Assurance:</strong> 100% authentic desi farm product prepared following traditional standards.
          </p>
        </div>
      ),
    };
  }

  // 6. Default Fresh Meat Cuts (Broiler Chicken, Mutton, Beef, Lamb, Keema)
  return {
    tabTitle: "Handling & Cooking Tips",
    fallbackDesc: (
      <>
        <p>
          At Gosht Ghar, every single cut of <strong>{product.name}</strong> is processed under strict 100% Halal guidelines. Our animals are grass-fed and naturally raised without any artificial growth hormones or antibiotics.
        </p>
        <p>
          We vacuum pack your order immediately after dressing to preserve natural moisture, tenderness, and rich flavor right up to your kitchen doorstep.
        </p>
      </>
    ),
    tips: (
      <div className="space-y-3 text-xs md:text-sm text-brand-black/90">
        <p>
          <strong>Storage:</strong> Store in refrigerator at 0°C to 4°C for immediate cooking within 48 hours, or freeze at -18°C for up to 3 months.
        </p>
        <p>
          <strong>Thawing Tip:</strong> Thaw frozen cuts slowly in the refrigerator overnight. Avoid using warm water to preserve meat texture.
        </p>
        <p>
          <strong>Recommended Dishes:</strong> Ideal for Karahi, Biryani, Roast, BBQ grilling, or slow-cooked curries.
        </p>
      </div>
    ),
  };
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<any | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const selectedSize = "1kg";
  const [quantity, setQuantity] = useState<number>(1);
  const [addedToast, setAddedToast] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "delivery">("desc");
  const { addToCart } = useCart();
  
  const careInfo = getProductCareInfo(product);
  
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({
    transformOrigin: "center center",
    transform: "scale(1.3)",
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2.2)", // Zoom level
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transformOrigin: "center center",
      transform: "scale(1.3)",
    });
  };

  useEffect(() => {
    async function loadProductData() {
      setIsLoading(true);
      try {
        const res = await fetchProducts();
        if (res.success && res.data) {
          const found = res.data.find((p: any) => p.id === params.id) || res.data[0];
          setProduct(found || null);

          const others = res.data.filter((p: any) => p.id !== params.id).slice(0, 4);
          setRelatedProducts(others);
        }
      } catch (err) {
        console.warn("Error loading product detail data:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadProductData();
  }, [params.id]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="py-32 text-center text-brand-grey">
          <div className="animate-spin inline-block w-8 h-8 border-2 border-brand-red border-t-transparent rounded-full mb-3"></div>
          <div className="text-sm">Loading fresh product details from Gosht Ghar...</div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen flex flex-col justify-between bg-white">
        <Header />
        <div className="py-20 max-w-container mx-auto px-5 text-center my-auto">
          <span className="text-5xl mb-3 block">🛒</span>
          <h1 className="text-2xl font-extrabold text-brand-black mb-3">
            Product Not Found
          </h1>
          <p className="text-brand-grey text-sm max-w-md mx-auto mb-8 leading-relaxed">
            This product is currently unavailable or being updated. Please browse our other products.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/shop"
              className="bg-brand-red hover:bg-brand-redDark text-white font-bold text-xs px-8 py-3.5 rounded-xl transition-colors shadow-sm"
            >
              Browse All Shop Products
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }



  const features = product.features || [
    "100% Organic & Halal Certified",
    "Temperature Controlled Packaging",
    "Zero Additives / Antibiotics",
    "Same-Day Express Delivery",
  ];

  const handleAddToCart = () => {
    const rawPrice = parseFloat(product.newPrice.replace(/[^0-9.]/g, ""));
    const price = isNaN(rawPrice) ? 0 : rawPrice;

    addToCart({
      id: `${product.id}-${selectedSize}`,
      productId: product.id,
      name: product.name,
      price: price,
      image: product.image || "/images/placeholder.svg",
      size: selectedSize,
      quantity: quantity,
      cat: product.cat,
      catSlug: product.catSlug,
    });

    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
    }, 3200);
  };

  const whatsappMessage = encodeURIComponent(
    `Assalam-o-Alaikum Gosht Ghar! I would like to order:\n- Product: ${product.name}\n- Selected Portion: ${selectedSize}\n- Quantity: ${quantity}\n- Price: ${formatPrice(product.newPrice)}`
  );

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Page Header & Breadcrumbs */}
      <PageHeader
        title={product.name}
        subtitle={`${product.cat} · 100% Farm Fresh & Halal Certified`}
        breadcrumb={`Shop / ${product.cat} / ${product.name}`}
      />

      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-container mx-auto px-5">
          {/* Main Product Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 items-start mb-20">
            {/* Left Column: Product Showcase */}
            <div className="space-y-4">
              <div className="rounded-3xl overflow-hidden flex flex-col items-center justify-center relative min-h-[420px] cursor-crosshair">
                <div 
                  className="w-full h-full min-h-[320px] flex items-center justify-center overflow-hidden"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      style={zoomStyle}
                      className="max-h-[360px] w-auto object-contain transition-transform duration-100 ease-out"
                    />
                  ) : (
                    <Placeholder label={product.name} className="w-full h-full min-h-[320px] rounded-2xl" />
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Full Details & Order Form */}
            <div className="flex flex-col justify-between min-w-0">
              <div>
                {/* Category */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-brand-pink text-brand-red font-bold text-xs px-3.5 py-1 rounded-md uppercase tracking-wider">
                    {product.cat}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-extrabold text-brand-black mb-4 leading-tight break-words">
                  {product.name}
                </h1>

                {/* Pricing Banner */}
                <div className="flex items-baseline gap-4 mb-6 pb-6 border-b border-brand-border">
                  <span className="text-3xl md:text-4xl font-black text-brand-black">
                    Rs {formatPrice(product.newPrice)}
                  </span>
                  {product.oldPrice && (
                    <span className="text-lg font-medium text-gray-400 line-through">
                      Rs {formatPrice(product.oldPrice)}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-brand-black/80 text-sm md:text-base leading-relaxed mb-6 break-words whitespace-pre-wrap">
                  {product.description ||
                    "100% fresh, hygienic, antibiotic-free cuts sourced directly from our farm. Vacuum sealed to retain natural taste and tenderness."}
                </p>



                {/* Quantity Control */}
                <div className="mb-8">
                  <label className="block text-xs font-bold text-brand-black uppercase tracking-wider mb-2.5">
                    Select Quantity:
                  </label>
                  <div className="inline-flex items-center border border-gray-300 rounded-xl overflow-hidden bg-gray-50 shadow-2xs">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-12 h-11 flex items-center justify-center text-brand-black hover:bg-gray-200 font-extrabold text-lg transition-colors"
                    >
                      -
                    </button>
                    <span className="w-12 text-center text-base font-bold text-brand-black bg-white py-2">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-12 h-11 flex items-center justify-center text-brand-black hover:bg-gray-200 font-extrabold text-lg transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Order Actions */}
              <div className="space-y-3">
                {addedToast && (
                  <div className="bg-emerald-600 text-white text-xs md:text-sm font-bold px-4 py-3 rounded-xl text-center shadow-lg animate-bounce">
                    ✓ Added {quantity}x {product.name} ({selectedSize}) to your Cart!
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={product.inStock === false}
                    className={`text-white font-bold text-sm md:text-base py-4 px-6 rounded-xl flex items-center justify-center gap-2.5 shadow-lg transition-all ${
                      product.inStock !== false ? "bg-brand-black hover:bg-brand-red active:scale-95" : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <CartIcon className="w-5 h-5 text-white" />
                    <span>{product.inStock !== false ? "Add to Cart" : "Out of Stock"}</span>
                  </button>

                  <a
                    href={`https://wa.me/923362127054?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm md:text-base py-4 px-6 rounded-xl flex items-center justify-center gap-2.5 shadow-lg transition-all active:scale-95"
                  >
                    <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.705 1.754zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-0.999 3.648 3.742-0.981z" />
                    </svg>
                    <span>Order via WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Info Tabs Section */}
          <div className="border border-brand-border rounded-3xl p-6 md:p-10 bg-[#FAF9F7] mb-20">
            <div className="flex border-b border-gray-200 gap-6 mb-8 overflow-x-auto">
              <button
                onClick={() => setActiveTab("desc")}
                className={`pb-3.5 font-bold text-sm md:text-base border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === "desc"
                    ? "border-brand-red text-brand-red"
                    : "border-transparent text-gray-500 hover:text-brand-black"
                }`}
              >
                Product Description
              </button>
              <button
                onClick={() => setActiveTab("specs")}
                className={`pb-3.5 font-bold text-sm md:text-base border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === "specs"
                    ? "border-brand-red text-brand-red"
                    : "border-transparent text-gray-500 hover:text-brand-black"
                }`}
              >
                {careInfo.tabTitle}
              </button>
              <button
                onClick={() => setActiveTab("delivery")}
                className={`pb-3.5 font-bold text-sm md:text-base border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === "delivery"
                    ? "border-brand-red text-brand-red"
                    : "border-transparent text-gray-500 hover:text-brand-black"
                }`}
              >
                Delivery & Cold-Chain Shipping
              </button>
            </div>

            {activeTab === "desc" && (
              <div className="space-y-4 text-xs md:text-sm text-brand-black/90 leading-relaxed">
                {product.longDescription ? (
                  <p className="whitespace-pre-wrap">{product.longDescription}</p>
                ) : (
                  careInfo.fallbackDesc
                )}
              </div>
            )}

            {activeTab === "specs" && careInfo.tips}

            {activeTab === "delivery" && (
              <div className="space-y-3 text-xs md:text-sm text-brand-black/90">
                <p><strong>Express Same-Day Delivery:</strong> Orders placed before 2:00 PM are delivered same-day in insulated temperature-controlled boxes.</p>
                <p><strong>Temperature Maintenance:</strong> Temperature kept strictly at 2°C - 4°C throughout transit.</p>
              </div>
            )}
          </div>

          {/* Customer Reviews Section */}
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-brand-black mb-8">
              Customer <span className="text-brand-red">Reviews</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockReviews.map((rev) => (
                <div key={rev.id} className="bg-white border border-brand-border p-6 rounded-2xl shadow-2xs">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="block font-bold text-brand-black text-sm">{rev.name}</span>
                      <span className="text-[11px] text-gray-400">{rev.date}</span>
                    </div>
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <StarIcon key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-brand-black/80 leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-brand-black">
                  You May Also <span className="text-brand-red">Like</span>
                </h3>
                <Link
                  href="/shop"
                  className="text-xs md:text-sm font-bold text-brand-red hover:underline flex items-center gap-1"
                >
                  <span>Browse All Shop Products</span>
                  <ArrowIcon className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                {relatedProducts.map((p: any) => (
                  <ProductCard
                    key={p.id}
                    id={p.id}
                    name={p.name}
                    cat={p.cat}
                    catSlug={p.catSlug}
                    newPrice={p.newPrice}
                    oldPrice={p.oldPrice}
                    tag={p.tag}
                    image={p.image}
                    rating={p.rating}
                    inStock={p.inStock}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
