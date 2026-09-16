import Link from "next/link";
import { ChickenIcon, GoatIcon, ArrowIcon } from "./Icons";
import { categories } from "@/lib/data";

const categoryIcons: Record<string, any> = {
  chicken: ChickenIcon,
  mutton: GoatIcon,
  "live-chicken": ChickenIcon,
  eggs: ChickenIcon,
  "desi-products": GoatIcon,
};

export default function Categories() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-container mx-auto px-5">
        <h2 className="text-3xl md:text-[34px] font-bold text-center mb-12 text-brand-black">
          We Provide Meat of the Best <span className="text-brand-red">Category.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {categories.map((cat) => {
            const IconComponent = categoryIcons[cat.slug] || ChickenIcon;
            const isFeatured = cat.slug === "mutton";

            if (isFeatured) {
              return (
                <div
                  key={cat.slug}
                  className="relative bg-brand-black border border-brand-black rounded-md p-8 text-white flex flex-col justify-between overflow-hidden shadow-sm"
                >
                  <div className="relative z-10">
                    <div className="w-[72px] h-[72px] rounded-full bg-white/10 flex items-center justify-center text-brand-red mb-5">
                      <IconComponent />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">{cat.name}</h3>
                    <p className="text-gray-300 text-sm mb-5">
                      {cat.desc}
                    </p>
                  </div>
                  <div className="relative z-10 flex items-center justify-between">
                    <Link
                      href={`/categories/${cat.slug}`}
                      className="inline-flex items-center gap-1.5 bg-brand-red hover:bg-brand-redDark text-white text-sm font-semibold px-5 py-2.5 rounded-md transition-colors"
                    >
                      <span>View Category</span>
                      <ArrowIcon className="w-3.5 h-3.5" />
                    </Link>
                    <span className="text-xs text-gray-400 font-medium">Coming Soon</span>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={cat.slug}
                className="bg-white border border-brand-border rounded-md p-9 flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
              >
                <div>
                  <div className="w-[72px] h-[72px] rounded-full bg-brand-pink/60 flex items-center justify-center text-brand-red mb-5">
                    <IconComponent />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-brand-black">{cat.name}</h3>
                  <p className="text-brand-grey text-sm mb-5">
                    {cat.desc}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold border-b border-brand-black pb-0.5 w-fit hover:text-brand-red hover:border-brand-red transition-colors"
                  >
                    <span>View Category</span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </Link>
                  <span className="text-xs text-brand-grey">Coming Soon</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Indicator dots */}
        <div className="flex justify-center items-center gap-2 mt-12">
          <span className="w-2 h-2 rounded-full bg-gray-300" />
          <span className="w-5 h-2 rounded-full bg-brand-red" />
          <span className="w-2 h-2 rounded-full bg-gray-300" />
        </div>
      </div>
    </section>
  );
}
