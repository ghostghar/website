import Placeholder from "./Placeholder";
import { ThermometerIcon, FlaskIcon, DropletIcon } from "./Icons";

const items = [
  { icon: ThermometerIcon, title: "Temperature Control", desc: "Manufactured products team building core competencies standards." },
  { icon: FlaskIcon, title: "Laboratory Testing", desc: "Manufactured products team building core competencies standards." },
  { icon: DropletIcon, title: "Antibacterial Treatment", desc: "Manufactured products team building core competencies standards." },
];

export default function WhyChoose() {
  return (
    <section className="py-16">
      <div className="max-w-container mx-auto px-5 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-[34px] font-bold mb-5">
            Why People Choose <span className="text-brand-red">Gosht Ghar Meat</span>
          </h2>
          <p className="text-brand-grey max-w-md mb-9">
            Monotonectally promote proactive technologies with high standards
            in manufactured products team building core competencies.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {items.map((it) => (
              <div key={it.title} className="border border-brand-border rounded-md p-6">
                <it.icon className="text-brand-red mb-4" />
                <strong className="block text-[15px] mb-2">{it.title}</strong>
                <p className="text-brand-grey text-[13px]">{it.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <Placeholder label="Meat Processing Image" className="aspect-[4/5] rounded-md" />
      </div>
    </section>
  );
}
