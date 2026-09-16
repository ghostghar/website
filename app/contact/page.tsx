import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <PageHeader
        title="Contact Us"
        subtitle="Have questions or custom meat delivery requests? Reach out to our customer support team."
        breadcrumb="Contact"
      />
      <ContactForm />
      <Footer />
    </main>
  );
}
