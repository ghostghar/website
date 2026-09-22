export type Product = {
  id: string;
  tag?: string;
  cat: string;
  catSlug: string;
  name: string;
  oldPrice?: string;
  newPrice: string;
  sizes?: string;
  description?: string;
  features?: string[];
  stock?: number;
  inStock?: boolean;
  image?: string;
  rating?: number;
};

export type Category = {
  slug: string;
  name: string;
  desc: string;
  itemCount: number;
};

export const categories: Category[] = [
  { slug: "chicken", name: "Fresh Chicken", desc: "100% fresh, organic farm-raised chicken cuts.", itemCount: 4 },
  { slug: "mutton", name: "Mutton Meat", desc: "Tender, fresh halal mutton & lamb cuts.", itemCount: 2 },
  { slug: "live-chicken", name: "Live Chicken", desc: "Healthy, active live chicken directly from organic farms.", itemCount: 1 },
  { slug: "eggs", name: "Farm Fresh Eggs", desc: "Nutritious, organic free-range farm eggs.", itemCount: 2 },
  { slug: "desi-products", name: "Desi Products", desc: "Authentic organic desi ghee, butter & traditional items.", itemCount: 2 },
];

export const products: Product[] = [];

export const onsaleProducts: Product[] = [];

export type EventItem = {
  cat: string;
  date: string;
  title: string;
  desc: string;
};

export const events: EventItem[] = [
  { cat: "Organic Poultry", date: "Farm Fresh Update", title: "100% Free-Range Organic Grain Feeding Standard", desc: "Our farm poultry is raised naturally on organic grains without synthetic growth hormones or antibiotics." },
  { cat: "Halal Butchery", date: "Fresh Guide", title: "Hygienic Vacuum Sealing & Cold Chain Process", desc: "Discover how Gosht Ghar maintains strictly 2°C - 4°C temperature control from dressing to doorstep." },
  { cat: "Farm Fresh", date: "Organic Quality", title: "Direct Organic Farm Sourcing in Punjab", desc: "Connecting families with grass-fed goat mutton and healthy farm-raised chicken daily." },
];
