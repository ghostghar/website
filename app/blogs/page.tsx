import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import Events from "@/components/Events";
import Footer from "@/components/Footer";

export default function BlogsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <PageHeader
        title="Blogs & Industry Events"
        subtitle="Stay updated with the latest news, butchery guides, and meat industry insights."
        breadcrumb="Blogs"
      />
      <Events />
      <Footer />
    </main>
  );
}
