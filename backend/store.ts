import fs from "fs";
import path from "path";
import { connectToDatabase } from "./db/connect";
import { ProductModel } from "./models/Product";
import { CategoryModel } from "./models/Category";

// Data directory path
const DATA_DIR = path.join(process.cwd(), "data");
const PRODUCTS_FILE = path.join(DATA_DIR, "products.json");
const CATEGORIES_FILE = path.join(DATA_DIR, "categories.json");

// Default Initial Seed Categories
export const DEFAULT_CATEGORIES = [
  { id: "cat-1", name: "Chicken", slug: "chicken", description: "Fresh farm-raised chicken cuts" },
  { id: "cat-2", name: "Mutton", slug: "mutton", description: "Premium fresh goat & lamb meat" },
  { id: "cat-3", name: "Beef", slug: "beef", description: "100% Halal fresh beef cuts" },
  { id: "cat-4", name: "Fish", slug: "fish", description: "Fresh river & sea fish" },
  { id: "cat-5", name: "Ready to Cook", slug: "ready-to-cook", description: "Marinated & pre-portioned meats" },
  { id: "cat-6", name: "Organic Eggs", slug: "organic-eggs", description: "Farm fresh organic eggs" },
  { id: "cat-7", name: "BBQ Spices", slug: "bbq-spices", description: "Authentic spice blends for grilling" },
  { id: "cat-8", name: "Desi Ghee", slug: "desi-ghee", description: "Pure homemade desi ghee" },
];

export const DEFAULT_PRODUCTS: any[] = [];

// Helper functions for local JSON file persistence
function ensureDataDirExists() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function loadLocalProducts(): any[] {
  try {
    ensureDataDirExists();
    if (fs.existsSync(PRODUCTS_FILE)) {
      const data = fs.readFileSync(PRODUCTS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading local products JSON:", err);
  }
  saveLocalProducts(DEFAULT_PRODUCTS);
  return DEFAULT_PRODUCTS;
}

function saveLocalProducts(products: any[]) {
  try {
    ensureDataDirExists();
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing local products JSON:", err);
  }
}

function loadLocalCategories(): any[] {
  try {
    ensureDataDirExists();
    if (fs.existsSync(CATEGORIES_FILE)) {
      const data = fs.readFileSync(CATEGORIES_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading local categories JSON:", err);
  }
  saveLocalCategories(DEFAULT_CATEGORIES);
  return DEFAULT_CATEGORIES;
}

function saveLocalCategories(categories: any[]) {
  try {
    ensureDataDirExists();
    fs.writeFileSync(CATEGORIES_FILE, JSON.stringify(categories, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing local categories JSON:", err);
  }
}

export interface ProductInput {
  name: string;
  cat: string;
  catSlug?: string;
  newPrice: string;
  oldPrice?: string;
  tag?: string;
  sizes?: string;
  stock?: number;
  inStock?: boolean;
  image?: string;
  description?: string;
  isFeatured?: boolean;
}

export const dataStore = {
  // PRODUCTS
  getProducts: async (catSlug?: string, search?: string) => {
    // Check if MONGODB_URI is explicitly set
    if (process.env.MONGODB_URI) {
      try {
        const conn = await connectToDatabase();
        if (conn) {
          let query: any = {};
          if (catSlug && catSlug !== "all") query.catSlug = catSlug;
          if (search) query.name = { $regex: search, $options: "i" };
          const products = await ProductModel.find(query).sort({ createdAt: -1 });
          return products.map((p) => p.toJSON());
        }
      } catch (err) {
        console.warn("MongoDB connection failed, falling back to local storage.");
      }
    }

    // Local JSON File Mode
    let items = loadLocalProducts();
    if (catSlug && catSlug !== "all") {
      items = items.filter((p) => p.catSlug === catSlug);
    }
    if (search) {
      const s = search.toLowerCase();
      items = items.filter((p) => p.name.toLowerCase().includes(s) || p.cat.toLowerCase().includes(s));
    }
    return items;
  },

  getProductById: async (id: string) => {
    if (process.env.MONGODB_URI) {
      try {
        const conn = await connectToDatabase();
        if (conn) {
          const prod = await ProductModel.findById(id);
          return prod ? prod.toJSON() : null;
        }
      } catch (err) {
        console.warn("MongoDB fetch failed:", err);
      }
    }
    const products = loadLocalProducts();
    return products.find((p) => p.id === id) || null;
  },

  createProduct: async (input: ProductInput) => {
    const catSlug = input.catSlug || input.cat.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const payload = {
      name: input.name,
      cat: input.cat,
      catSlug,
      newPrice: input.newPrice,
      oldPrice: input.oldPrice || "",
      tag: input.tag || "Fresh",
      sizes: input.sizes || "500g, 1kg, 2kg",
      stock: typeof input.stock === "number" ? input.stock : 10,
      inStock: input.inStock !== false,
      image: input.image || "https://images.unsplash.com/photo-1604503468506-a8da13d82791?q=80&w=800&auto=format&fit=crop",
      description: input.description || "",
      isFeatured: input.isFeatured || false,
    };

    if (process.env.MONGODB_URI) {
      try {
        const conn = await connectToDatabase();
        if (conn) {
          const created = await ProductModel.create(payload);
          return created.toJSON();
        }
      } catch (err) {
        console.warn("MongoDB insert failed, saving to local file store:", err);
      }
    }

    // Local JSON File mode
    const products = loadLocalProducts();
    const newProd = {
      id: "prod-" + Date.now(),
      ...payload,
    };
    products.unshift(newProd);
    saveLocalProducts(products);
    return newProd;
  },

  updateProduct: async (id: string, input: Partial<ProductInput>) => {
    if (process.env.MONGODB_URI) {
      try {
        const conn = await connectToDatabase();
        if (conn) {
          const updated = await ProductModel.findByIdAndUpdate(id, input, { new: true });
          return updated ? updated.toJSON() : null;
        }
      } catch (err) {
        console.warn("MongoDB update failed:", err);
      }
    }

    const products = loadLocalProducts();
    const idx = products.findIndex((p) => p.id === id);
    if (idx !== -1) {
      products[idx] = { ...products[idx], ...input };
      if (input.cat) {
        products[idx].catSlug = input.catSlug || input.cat.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      }
      saveLocalProducts(products);
      return products[idx];
    }
    return null;
  },

  deleteProduct: async (id: string) => {
    if (process.env.MONGODB_URI) {
      try {
        const conn = await connectToDatabase();
        if (conn) {
          const res = await ProductModel.findByIdAndDelete(id);
          return !!res;
        }
      } catch (err) {
        console.warn("MongoDB delete failed:", err);
      }
    }

    let products = loadLocalProducts();
    const prevLen = products.length;
    products = products.filter((p) => p.id !== id);
    saveLocalProducts(products);
    return products.length < prevLen;
  },

  // CATEGORIES
  getCategories: async () => {
    if (process.env.MONGODB_URI) {
      try {
        const conn = await connectToDatabase();
        if (conn) {
          const categories = await CategoryModel.find().sort({ name: 1 });
          if (categories.length > 0) {
            return categories.map((c) => c.toJSON());
          }
        }
      } catch (err) {
        console.warn("MongoDB fetch categories failed:", err);
      }
    }
    return loadLocalCategories();
  },

  createCategory: async (name: string, description?: string) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const payload = { name, slug, description: description || "" };

    if (process.env.MONGODB_URI) {
      try {
        const conn = await connectToDatabase();
        if (conn) {
          const created = await CategoryModel.create(payload);
          return created.toJSON();
        }
      } catch (err) {
        console.warn("MongoDB category insert failed:", err);
      }
    }

    const categories = loadLocalCategories();
    const newCat = { id: "cat-" + Date.now(), ...payload };
    categories.push(newCat);
    saveLocalCategories(categories);
    return newCat;
  },

  // SEED
  seedDatabase: async () => {
    saveLocalProducts(DEFAULT_PRODUCTS);
    saveLocalCategories(DEFAULT_CATEGORIES);
    return { success: true, message: "Local JSON store reset & re-seeded with demo product and categories!" };
  }
};
