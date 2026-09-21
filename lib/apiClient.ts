export const API_BASE = ""; // Relative paths for Next.js Vercel API routes

export async function loginAdmin(username: string, password: string) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}

export async function fetchProducts(cat?: string, search?: string) {
  const params = new URLSearchParams();
  if (cat) params.set("cat", cat);
  if (search) params.set("search", search);
  const query = params.toString() ? `?${params.toString()}` : "";
  const res = await fetch(`/api/products${query}`, { cache: "no-store" });
  return res.json();
}

export async function fetchTopPicks() {
  const res = await fetch("/api/products?topPick=true", { cache: "no-store" });
  return res.json();
}

export async function fetchCategories() {
  const res = await fetch("/api/categories", { cache: "no-store" });
  return res.json();
}

export async function createProduct(productData: any, token: string) {
  const res = await fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });
  return res.json();
}

export async function updateProduct(id: string, productData: any, token: string) {
  const res = await fetch(`/api/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });
  return res.json();
}

export async function toggleTopPick(id: string, isTopPick: boolean, token: string) {
  const res = await fetch(`/api/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ isTopPick }),
  });
  return res.json();
}

export async function deleteProduct(id: string, token: string) {
  const res = await fetch(`/api/products/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export async function createCategory(name: string, description: string, token: string) {
  const res = await fetch("/api/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, description }),
  });
  return res.json();
}

export async function seedDatabase(token: string) {
  const res = await fetch("/api/seed", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export async function uploadProductImage(imageData: string, token: string) {
  const res = await fetch("/api/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ image: imageData }),
  });
  return res.json();
}
