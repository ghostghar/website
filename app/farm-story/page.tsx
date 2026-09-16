import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";

export default function FarmStoryPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <PageHeader
        title="Our Farm Story"
        subtitle="Discover how Goshtghar raises healthy, organic poultry & livestock with traditional ethical farming."
        breadcrumb="Our Farm Story"
      />
      
      <section className="py-16 bg-white">
        <div className="max-w-container mx-auto px-5 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-brand-red font-semibold text-sm mb-2 block">Ethical & Natural Farming</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-black mb-5 leading-tight">
              Pure, Fresh &amp; Hygienic Meat Directly From Our Organic Farms
            </h2>
            <p className="text-brand-grey text-base leading-relaxed mb-6">
              At <strong className="text-brand-black">Goshtghar</strong>, we take pride in maintaining 100% natural, free-range environments for our poultry and livestock. Our birds and farm animals are fed clean, natural diets without harmful chemicals or growth hormones.
            </p>
            <p className="text-brand-grey text-base leading-relaxed mb-6">
              Every step from farm care to fresh butchering follows strict hygiene standards to deliver wholesome, nutritious meat directly to your doorstep.
            </p>
            <div className="flex gap-4">
              <div className="border-l-4 border-brand-red pl-4">
                <span className="block text-2xl font-bold text-brand-black">100%</span>
                <span className="text-xs text-brand-grey">Organic &amp; Halal</span>
              </div>
              <div className="border-l-4 border-brand-red pl-4">
                <span className="block text-2xl font-bold text-brand-black">Daily</span>
                <span className="text-xs text-brand-grey">Fresh Farm Cuts</span>
              </div>
            </div>
          </div>

          <div className="relative bg-brand-cream/50 p-8 rounded-md border border-brand-border">
            <h3 className="text-xl font-bold text-brand-black mb-4">Our Farm Commitments</h3>
            <ul className="space-y-4 text-sm text-brand-black/90">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-brand-red text-white flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3 h-3 stroke-white" viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                </span>
                <span><strong>Pure Feed:</strong> 100% natural grain feed with no artificial additives or preservatives.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-brand-red text-white flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3 h-3 stroke-white" viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                </span>
                <span><strong>Ethical Environment:</strong> Spacious free-range farms ensuring healthy, stress-free animals.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-brand-red text-white flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3 h-3 stroke-white" viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                </span>
                <span><strong>Strict Hygiene:</strong> Temperature-controlled fresh processing to lock in taste and nutrients.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
