import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import Categories from "@/components/Categories";
import Footer from "@/components/Footer";

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <PageHeader
        title="Meat Categories"
        subtitle="Explore our fresh premium meat selection categorized for your convenient shopping experience."
        breadcrumb="Categories"
      />
      <Categories />
      <Footer />
    </main>
  );
}
