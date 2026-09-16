import Link from "next/link";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  breadcrumb?: string;
};

export default function PageHeader({ title, subtitle, breadcrumb }: PageHeaderProps) {
  return (
    <div className="bg-brand-pink py-14 border-b border-brand-border">
      <div className="max-w-container mx-auto px-5 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-brand-black mb-3">{title}</h1>
        {subtitle && <p className="text-brand-grey text-sm max-w-md mx-auto mb-4">{subtitle}</p>}
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-brand-grey">
          <Link href="/" className="hover:text-brand-red transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-brand-red">{breadcrumb || title}</span>
        </div>
      </div>
    </div>
  );
}
