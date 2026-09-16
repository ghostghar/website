import { TruckIcon, ShieldIcon, CardIcon, HeartIcon } from "./Icons";

const features = [
  { icon: TruckIcon, title: "Free Shipping", desc: "For orders from $50" },
  { icon: ShieldIcon, title: "Satisfied Or Refunded", desc: "Guaranteed Product Warranty" },
  { icon: CardIcon, title: "Payment Secure", desc: "Get 100% Payment Safe" },
  { icon: HeartIcon, title: "100% Safety & Secure", desc: "Call Us Anytime & Anywhere" },
];

export default function FeaturesBar() {
  return (
    <section className="bg-brand-black py-8">
      <div className="max-w-container mx-auto px-5 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <div
            key={f.title}
            className={`flex items-center gap-4 text-white ${
              i < features.length - 1 ? "lg:border-r lg:border-white/10" : ""
            } pr-2`}
          >
            <f.icon className="w-7 h-7 text-brand-red shrink-0" />
            <div className="text-sm leading-tight">
              <strong className="block text-[15px] mb-0.5">{f.title}</strong>
              <span className="text-gray-400">{f.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
