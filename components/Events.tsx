import Placeholder from "./Placeholder";
import { events } from "@/lib/data";

export default function Events() {
  return (
    <section className="py-20 bg-brand-cream">
      <div className="max-w-container mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end mb-11">
          <h2 className="text-3xl md:text-[34px] font-bold leading-tight">
            Goshtghar <span className="text-brand-red">Upcoming</span>
            <br />
            Meat &amp; Farm Events
          </h2>
          <div>
            <p className="text-brand-grey mb-3">
              Learn more about our organic poultry farming, 100% Halal hand slaughtering standards, and cold-chain temperature preservation for maximum freshness.
            </p>
            <a href="#" className="text-sm font-semibold border-b border-brand-black pb-0.5">
              View All Post ↗
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((e, i) => (
            <div key={i} className="bg-white rounded-md overflow-hidden">
              <Placeholder label="Event Image" className="aspect-[4/3] rounded-none" />
              <div className="p-5">
                <div className="flex gap-3.5 text-xs text-brand-grey mb-2.5">
                  <span>{e.cat}</span>
                  <span>{e.date}</span>
                </div>
                <h4 className="text-[16px] font-semibold mb-2">{e.title}</h4>
                <p className="text-brand-grey text-sm">{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
