import Placeholder from "./Placeholder";
import Link from "next/link";
import { ArrowIcon, ShieldIcon, HeartIcon } from "./Icons";

const pillars = [
  {
    title: "100% Organic & Pure",
    desc: "Our poultry and livestock are fed 100% natural diets with zero growth hormones, artificial additives, or harmful chemicals.",
  },
  {
    title: "Ethical & Free-Range",
    desc: "We maintain spacious, natural farm environments ensuring stress-free, healthy raising for all our farm animals.",
  },
  {
    title: "Strict Halal & Hygiene",
    desc: "Every cut follows strict traditional Halal guidelines and temperature-controlled hygienic processing.",
  },
  {
    title: "Daily Fresh Delivery",
    desc: "Freshly butchered every morning and delivered directly to your kitchen with sealed freshness.",
  },
];

export default function About() {
  return (
    <div className="bg-white">
      {/* Brand Hero & Story */}
      <section className="py-16 md:py-20">
        <div className="max-w-container mx-auto px-5 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-brand-pink text-brand-red font-semibold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
              About Goshtghar
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-black mb-6 leading-tight">
              Purity, Tradition &amp; Freshness in <span className="text-brand-red">Every Single Cut.</span>
            </h2>
            <p className="text-brand-grey text-base leading-relaxed mb-6">
              At <strong className="text-brand-black">Goshtghar</strong>, we believe that wholesome, nutritious meals begin with pure, ethically raised meat. We were founded to bridge the gap between traditional farm freshness and modern convenient delivery.
            </p>
            <p className="text-brand-grey text-base leading-relaxed mb-8">
              From free-range poultry to fresh mutton and organic farm produce, every item is handled with uncompromised hygiene and strict quality standards.
            </p>

            <div className="flex items-center gap-6 flex-wrap">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-brand-black hover:bg-black text-white font-semibold px-8 py-3.5 rounded-md transition-colors shadow-sm"
              >
                <span>Explore Products</span>
                <ArrowIcon className="w-4 h-4" />
              </Link>
              <div className="border-l-2 border-brand-red pl-4">
                <strong className="block text-xl font-bold text-brand-black">100% Guaranteed</strong>
                <span className="text-xs text-brand-grey">Fresh &amp; Halal Certified</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <Placeholder label="Goshtghar Organic Farm Image" className="aspect-[4/3] md:aspect-[5/4] rounded-xl shadow-md" />
            <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 bg-brand-black text-white p-5 rounded-lg shadow-xl max-w-xs">
              <ShieldIcon className="w-8 h-8 text-brand-red shrink-0" />
              <div className="text-xs leading-snug">
                <strong className="block text-sm text-white mb-0.5">Uncompromised Quality</strong>
                <span className="text-gray-300">Strict temperature-controlled fresh processing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values / Pillars Grid */}
      <section className="py-16 bg-brand-cream/40 border-y border-brand-border">
        <div className="max-w-container mx-auto px-5">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-brand-red font-semibold text-xs uppercase tracking-wider block mb-2">Our Commitments</span>
            <h2 className="text-3xl font-bold text-brand-black">Why Goshtghar Stands Apart</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-brand-border rounded-lg p-7 hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-full bg-brand-pink text-brand-red font-bold flex items-center justify-center mb-5 text-sm">
                    0{index + 1}
                  </div>
                  <h3 className="text-lg font-bold text-brand-black mb-3">{item.title}</h3>
                  <p className="text-brand-grey text-xs md:text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-container mx-auto px-5 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission */}
          <div className="bg-brand-black text-white rounded-xl p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
            <div>
              <span className="text-brand-red text-xs font-semibold uppercase tracking-wider block mb-3">Our Mission</span>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Delivering Pure &amp; Wholesome Food</h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
                Our mission is to provide every household with 100% natural, chemical-free meat raised with love and ethical care. We aim to elevate hygiene standards in fresh butchery delivery.
              </p>
            </div>
            <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-brand-pink">
              <HeartIcon className="w-4 h-4 text-brand-red" />
              <span>Dedicated to healthy living and traditional taste</span>
            </div>
          </div>

          {/* Vision */}
          <div className="bg-brand-pink/50 border border-brand-border rounded-xl p-8 md:p-12 flex flex-col justify-between">
            <div>
              <span className="text-brand-red text-xs font-semibold uppercase tracking-wider block mb-3">Our Vision</span>
              <h3 className="text-2xl md:text-3xl font-bold text-brand-black mb-4">Setting the Benchmark in Organic Meat</h3>
              <p className="text-brand-grey text-sm md:text-base leading-relaxed mb-6">
                To become the most trusted organic meat delivery service known for complete transparency, environmental responsibility, and uncompromised customer satisfaction.
              </p>
            </div>
            <div className="pt-4 border-t border-brand-border flex items-center gap-2 text-xs text-brand-black/80 font-medium">
              <ShieldIcon className="w-4 h-4 text-brand-red" />
              <span>100% Halal certified and ethically managed farms</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
