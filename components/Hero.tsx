import Placeholder from "./Placeholder";
import { ArrowIcon } from "./Icons";

export default function Hero() {
  return (
    <section className="relative bg-brand-pink overflow-hidden">
      <div className="max-w-container mx-auto px-5 grid grid-cols-1 lg:grid-cols-[60px_1fr_1fr] items-center gap-8 pt-10 pb-16">
        {/* Social rail */}
        <div className="hidden lg:flex flex-col items-center gap-4 text-xs font-bold text-brand-black/70">
          <a href="https://www.facebook.com/p/Gosht-Ghar-61577805696063/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red">FB</a>
          <a href="https://www.instagram.com/gosht_ghar" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red">IG</a>
          <span
            className="text-[11px] font-normal text-brand-grey mt-2"
            style={{ writingMode: "vertical-rl" }}
          >
            Follow on
          </span>
        </div>

        {/* Text */}
        <div className="text-center lg:text-left">
          <h4 className="text-xl font-medium mb-1 text-brand-red">100% Fresh & Organic</h4>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.05] mb-5 mx-auto lg:mx-0 text-brand-black">
            Premium Meat Delivered
          </h1>
          <p className="text-brand-grey max-w-sm mx-auto lg:mx-0 mb-7">
            Experience the finest quality, farm-fresh halal meat delivered straight to your doorstep in Karachi. Healthy, hygienic, and full of flavor.
          </p>
          <div className="flex justify-center lg:justify-start">
            <button className="inline-flex items-center gap-2 bg-brand-black hover:bg-black text-white font-semibold px-7 py-3.5 rounded-md transition-colors">
              <span>Shop Now</span>
              <ArrowIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="flex justify-center">
          <img 
            src="/images/banner_post-removebg-preview.png" 
            alt="Goshtghar Fresh Meat" 
            className="w-full max-w-[420px] lg:max-w-[500px] object-contain drop-shadow-2xl transition-transform duration-700 hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
}
