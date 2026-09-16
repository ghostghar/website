import Placeholder from "./Placeholder";
import { ArrowIcon } from "./Icons";

export default function Hero() {
  return (
    <section className="relative bg-brand-pink overflow-hidden">
      <div className="max-w-container mx-auto px-5 grid grid-cols-1 lg:grid-cols-[60px_1fr_1fr] items-center gap-8 pt-10 pb-16">
        {/* Social rail */}
        <div className="hidden lg:flex flex-col items-center gap-4 text-xs font-bold text-brand-black/70">
          <a href="#" className="hover:text-brand-red">X</a>
          <a href="#" className="hover:text-brand-red">FB</a>
          <a href="#" className="hover:text-brand-red">IN</a>
          <a href="#" className="hover:text-brand-red">IG</a>
          <span
            className="text-[11px] font-normal text-brand-grey mt-2"
            style={{ writingMode: "vertical-rl" }}
          >
            Follow on
          </span>
        </div>

        {/* Text */}
        <div>
          <h4 className="text-xl font-medium mb-1">Meat Production</h4>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.05] mb-5">
            Leading Firm
          </h1>
          <p className="text-brand-grey max-w-sm mb-7">
            Distinctively integrate interoperable total linkage and covalent
            processes seamlessly generate.
          </p>
          <button className="inline-flex items-center gap-2 bg-brand-black hover:bg-black text-white font-semibold px-7 py-3.5 rounded-md transition-colors">
            <span>Shop Now</span>
            <ArrowIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Image */}
        <div className="flex justify-center">
          <Placeholder
            label="Hero Image (Bowl of Meat)"
            className="w-full max-w-[420px] aspect-square rounded-full"
          />
        </div>
      </div>
    </section>
  );
}
