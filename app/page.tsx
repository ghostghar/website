import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import OnSale from "@/components/OnSale";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Products />
      <OnSale />
      <FAQ />
      <Footer />
    </main>
  );
}
