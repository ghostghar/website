import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <PageHeader
        title="About Goshtghar"
        subtitle="Leading meat production firm committed to providing fresh, 100% organic and hygienic meat."
        breadcrumb="About Us"
      />
      <About />
      <Testimonials />
      <Footer />
    </main>
  );
}
