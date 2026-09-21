"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  loginAdmin,
  fetchProducts,
  fetchCategories,
  createProduct,
  updateProduct,
  deleteProduct,
  createCategory,
  seedDatabase,
  uploadProductImage,
  toggleTopPick,
} from "@/lib/apiClient";

export default function AdminDashboardPage() {
  // Auth state
  const [token, setToken] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const [loginUser, setLoginUser] = useState<string>("");
  const [loginPass, setLoginPass] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");

  // Data state
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Cloudinary Upload State
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCatFilter, setSelectedCatFilter] = useState<string>("all");


  const uploadFile = async (file: File) => {
    if (!file || !token) return;
    setIsUploadingImage(true);
    setUploadStatus("Uploading to Cloudinary...");
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64data = reader.result as string;
        const res = await uploadProductImage(base64data, token);
        if (res.success && res.url) {
          setProductForm((prev) => ({ ...prev, image: res.url }));
          setUploadStatus(res.isLocalFallback ? "Image loaded!" : "Uploaded to Cloudinary successfully!");
        } else {
          setUploadStatus(res.error || "Failed to upload image");
        }
        setIsUploadingImage(false);
      };
    } catch (err: any) {
      setUploadStatus(err.message || "Failed to upload image");
      setIsUploadingImage(false);
    }
  };

  const handleImageFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      uploadFile(file);
    } else {
      setUploadStatus("Please drop an image file.");
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // Modals
  const [isProductModalOpen, setIsProductModalOpen] = useState<boolean>(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState<boolean>(false);

  // Form State
  const [productForm, setProductForm] = useState({
    name: "",
    cat: "Fresh Chicken",
    catSlug: "chicken",
    newPrice: "",
    oldPrice: "",
    tag: "Fresh Farm",
    sizes: "500g, 1kg, 2kg",
    stock: 10,
    inStock: true,
    isFeatured: false,
    isTopPick: false,
    image: "",
    description: "",
    longDescription: "",
  });

  const [categoryForm, setCategoryForm] = useState({
    name: "",
    description: "",
  });

  // Check stored auth token on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("goshtghar_admin_token");
    if (savedToken) {
      setToken(savedToken);
    }
    setIsAuthLoading(false);
  }, []);

  // Fetch data when authenticated
  useEffect(() => {
    if (token) {
      loadDashboardData();
    }
  }, [token]);

  const loadDashboardData = async () => {
    setLoadingData(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        fetchProducts(),
        fetchCategories(),
      ]);
      if (prodRes.success) setProducts(prodRes.data || []);
      if (catRes.success) setCategories(catRes.data || []);
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    try {
      const res = await loginAdmin(loginUser, loginPass);
      if (res.success && res.token) {
        setToken(res.token);
        localStorage.setItem("goshtghar_admin_token", res.token);
        showStatus("success", "Admin authentication successful!");
      } else {
        setAuthError(res.error || "Invalid username or password");
      }
    } catch (err: any) {
      setAuthError(err.message || "Failed to log in. Please try again.");
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("goshtghar_admin_token");
    showStatus("success", "Logged out safely.");
  };

  const showStatus = (type: "success" | "error", text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  // Open Modal for Create or Edit
  const openAddProductModal = () => {
    setEditingProductId(null);
    setProductForm({
      name: "",
      cat: categories[0]?.name || "Fresh Chicken",
      catSlug: categories[0]?.slug || "chicken",
      newPrice: "",
      oldPrice: "",
      tag: "Fresh Farm",
      sizes: "500g, 1kg, 2kg",
      stock: 10,
      inStock: true,
      isFeatured: false,
      isTopPick: false,
      image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?q=80&w=800&auto=format&fit=crop",
      description: "",
      longDescription: "",
    });
    setIsProductModalOpen(true);
  };

  const openEditProductModal = (prod: any) => {
    setEditingProductId(prod.id);
    setProductForm({
      name: prod.name || "",
      cat: prod.cat || "Fresh Chicken",
      catSlug: prod.catSlug || "chicken",
      newPrice: prod.newPrice || "",
      oldPrice: prod.oldPrice || "",
      tag: prod.tag || "Fresh Farm",
      sizes: prod.sizes || "500g, 1kg, 2kg",
      stock: typeof prod.stock === "number" ? prod.stock : 10,
      inStock: prod.inStock !== false,
      isFeatured: prod.isFeatured || false,
      isTopPick: prod.isTopPick || false,
      image: prod.image || "",
      description: prod.description || "",
      longDescription: prod.longDescription || "",
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      if (editingProductId) {
        const res = await updateProduct(editingProductId, productForm, token);
        if (res.success) {
          showStatus("success", `Product "${productForm.name}" updated successfully!`);
          setIsProductModalOpen(false);
          loadDashboardData();
        } else {
          showStatus("error", res.error || "Failed to update product.");
        }
      } else {
        const res = await createProduct(productForm, token);
        if (res.success) {
          showStatus("success", `Product "${productForm.name}" created successfully!`);
          setIsProductModalOpen(false);
          loadDashboardData();
        } else {
          showStatus("error", res.error || "Failed to create product.");
        }
      }
    } catch (err: any) {
      showStatus("error", err.message || "An error occurred.");
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!token) return;
    try {
      const res = await deleteProduct(id, token);
      if (res.success) {
        showStatus("success", "Product deleted successfully.");
        setDeleteConfirmId(null);
        loadDashboardData();
      } else {
        showStatus("error", res.error || "Failed to delete product.");
      }
    } catch (err: any) {
      showStatus("error", err.message || "An error occurred.");
    }
  };

  const handleToggleTopPick = async (id: string, current: boolean) => {
    if (!token) return;
    try {
      const res = await toggleTopPick(id, !current, token);
      if (res.success) {
        showStatus("success", !current ? "Marked as Top Pick ✓" : "Removed from Top Picks");
        loadDashboardData();
      } else {
        showStatus("error", res.error || "Failed to update top pick status.");
      }
    } catch (err: any) {
      showStatus("error", err.message || "An error occurred.");
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !categoryForm.name) return;

    try {
      const res = await createCategory(categoryForm.name, categoryForm.description, token);
      if (res.success) {
        showStatus("success", `Category "${categoryForm.name}" added successfully!`);
        setCategoryForm({ name: "", description: "" });
        setIsCategoryModalOpen(false);
        loadDashboardData();
      } else {
        showStatus("error", res.error || "Failed to create category.");
      }
    } catch (err: any) {
      showStatus("error", err.message || "An error occurred.");
    }
  };

  const handleSeedDatabase = async () => {
    if (!token) return;
    try {
      const res = await seedDatabase(token);
      if (res.success) {
        showStatus("success", res.message || "Database seeded successfully!");
        loadDashboardData();
      } else {
        showStatus("error", res.error || "Failed to seed database.");
      }
    } catch (err: any) {
      showStatus("error", err.message || "Seed failed.");
    }
  };

  // Filter products by category & search
  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCatFilter === "all" || p.catSlug === selectedCatFilter;
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.cat.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-[#171717] flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ED1C24]"></div>
      </div>
    );
  }

  // --- 1. UNAUTHENTICATED LOGIN VIEW ---
  if (!token) {
    return (
      <div className="min-h-screen bg-[#171717] flex flex-col justify-center items-center px-4 py-12">
        <div className="w-full max-w-md bg-[#1C1C1C] border border-[#2A2A2A] rounded-2xl shadow-2xl p-8">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <span className="inline-block bg-[#ED1C24]/10 text-[#ED1C24] font-semibold text-xs tracking-widest uppercase px-3 py-1 rounded-full mb-3">
              Protected Admin Portal
            </span>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Goshtghar Admin
            </h1>
            <p className="text-gray-400 text-sm mt-2">
              Sign in to manage products, categories & store settings
            </p>
          </div>

          {authError && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Admin Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  required
                  value={loginUser}
                  onChange={(e) => setLoginUser(e.target.value)}
                  className="w-full bg-[#141414] border border-[#333] rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-[#ED1C24] transition"
                  placeholder="Enter username"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type="password"
                  required
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  className="w-full bg-[#141414] border border-[#333] rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-[#ED1C24] transition"
                  placeholder="Enter password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#ED1C24] hover:bg-[#C8151C] text-white font-bold py-3.5 px-6 rounded-xl transition duration-200 shadow-lg shadow-[#ED1C24]/20 flex items-center justify-center gap-2"
            >
              <span>Login to Dashboard</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>

          <div className="mt-8 text-center border-t border-[#2A2A2A] pt-4">
            <Link href="/" className="text-gray-400 hover:text-white text-xs transition">
              ← Return to Main Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --- 2. AUTHENTICATED ADMIN DASHBOARD VIEW ---
  return (
    <div className="min-h-screen bg-[#141414] text-gray-100 font-sans">
      {/* Top Admin Header */}
      <header className="bg-[#1C1C1C] border-b border-[#2A2A2A] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#ED1C24] rounded-lg flex items-center justify-center font-black text-white text-xl">
              G
            </div>
            <div>
              <span className="font-bold text-white text-lg tracking-tight">Goshtghar</span>
              <span className="ml-2 text-xs bg-[#ED1C24]/10 text-[#ED1C24] font-semibold px-2.5 py-0.5 rounded-full border border-[#ED1C24]/20">
                Admin Console
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/shop"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 text-xs text-gray-300 hover:text-white bg-[#262626] px-3 py-1.5 rounded-lg border border-[#333] transition"
            >
              <span>Visit Shop</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 font-medium px-3.5 py-1.5 rounded-lg border border-red-500/20 transition flex items-center gap-1.5"
            >
              <span>Logout</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toast Status Notification */}
        {statusMessage && (
          <div
            className={`mb-6 p-4 rounded-xl border flex items-center justify-between ${
              statusMessage.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : "bg-red-500/10 border-red-500/30 text-red-400"
            }`}
          >
            <div className="flex items-center gap-3 text-sm font-medium">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{statusMessage.text}</span>
            </div>
            <button
              onClick={() => setStatusMessage(null)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        )}

        {/* Dashboard Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          <div className="bg-[#1C1C1C] border border-[#2A2A2A] rounded-xl p-5">
            <div className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Total Products</div>
            <div className="text-3xl font-extrabold text-white mt-2">{products.length}</div>
            <div className="text-xs text-gray-500 mt-1">Active in store backend</div>
          </div>

          <div className="bg-[#1C1C1C] border border-[#2A2A2A] rounded-xl p-5">
            <div className="text-gray-400 text-xs uppercase tracking-wider font-semibold">In Stock Items</div>
            <div className="text-3xl font-extrabold text-emerald-400 mt-2">
              {products.filter((p) => p.inStock !== false).length}
            </div>
            <div className="text-xs text-gray-500 mt-1">Ready for delivery</div>
          </div>

          <div className="bg-[#1C1C1C] border border-[#2A2A2A] rounded-xl p-5">
            <div className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Categories</div>
            <div className="text-3xl font-extrabold text-[#ED1C24] mt-2">{categories.length}</div>
            <div className="text-xs text-gray-500 mt-1">Active product categories</div>
          </div>

          <div className="bg-[#1C1C1C] border border-[#2A2A2A] rounded-xl p-5 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wider font-semibold mb-1">
              <span>📌</span> Top Picks
            </div>
            <div className="text-3xl font-extrabold text-amber-400 mt-1">
              {products.filter((p) => p.isTopPick).length}
              <span className="text-sm text-gray-500 font-normal ml-1">/ 4</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">Shown on homepage</div>
          </div>


        </div>

        {/* Action Bar */}
        <div className="bg-[#1C1C1C] border border-[#2A2A2A] rounded-xl p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-[#141414] border border-[#333] rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-[#ED1C24]"
              />
              <svg className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Category Filter Dropdown */}
            <select
              value={selectedCatFilter}
              onChange={(e) => setSelectedCatFilter(e.target.value)}
              className="w-full sm:w-auto bg-[#141414] border border-[#333] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#ED1C24]"
            >
              <option value="all">All Categories ({products.length})</option>
              {categories.map((c) => (
                <option key={c.id || c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 sm:flex sm:flex-row items-center gap-3 w-full md:w-auto sm:justify-end">
            <button
              onClick={() => setIsCategoryModalOpen(true)}
              className="bg-[#262626] hover:bg-[#333] text-gray-200 font-semibold px-4 py-2 rounded-lg border border-[#3A3A3A] text-sm transition"
            >
              + Add Category
            </button>

            <button
              onClick={openAddProductModal}
              className="bg-[#ED1C24] hover:bg-[#C8151C] text-white font-bold px-4 py-2 rounded-lg text-sm transition shadow-lg shadow-[#ED1C24]/20 flex items-center justify-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Product</span>
            </button>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-[#1C1C1C] border border-[#2A2A2A] rounded-xl overflow-hidden shadow-xl">
          {loadingData ? (
            <div className="p-12 text-center text-gray-400">
              <div className="animate-spin inline-block w-8 h-8 border-2 border-current border-t-transparent text-[#ED1C24] rounded-full mb-3"></div>
              <div>Loading store catalog...</div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="p-12 text-center text-gray-400">
              <div className="text-4xl mb-3">🛒</div>
              <h3 className="text-lg font-semibold text-white">No products found</h3>
              <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
                No products match your filter criteria or no products have been created yet. Click below to add a product or seed default items.
              </p>
              <div className="mt-5 flex justify-center gap-3">
                <button
                  onClick={openAddProductModal}
                  className="bg-[#ED1C24] hover:bg-[#C8151C] text-white text-xs font-bold px-4 py-2 rounded-lg transition"
                >
                  + Add First Product
                </button>
                <button
                  onClick={handleSeedDatabase}
                  className="bg-[#262626] hover:bg-[#333] text-gray-300 text-xs font-medium px-4 py-2 rounded-lg border border-[#333] transition"
                >
                  Seed Sample Data
                </button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto pb-4">
              <table className="w-full text-left text-sm text-gray-300 min-w-[800px]">
                <thead className="bg-[#141414] text-xs uppercase tracking-wider text-gray-400 border-b border-[#2A2A2A]">
                  <tr>
                    <th className="py-3.5 px-4">Product Details</th>
                    <th className="py-3.5 px-4 hidden sm:table-cell">Category</th>
                    <th className="py-3.5 px-4">Price</th>
                    <th className="py-3.5 px-4 hidden md:table-cell">Tag</th>
                    <th className="py-3.5 px-4">Stock</th>
                    <th className="py-3.5 px-4 hidden lg:table-cell text-center">Top Pick</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2A2A2A]">
                  {filteredProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-[#222222] transition">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={prod.image || "https://images.unsplash.com/photo-1604503468506-a8da13d82791?q=80&w=800&auto=format&fit=crop"}
                            alt={prod.name}
                            className="w-11 h-11 object-cover rounded-lg border border-[#333] bg-[#141414]"
                          />
                          <div>
                            <div className="font-semibold text-white text-sm flex items-center gap-1.5">
                              {prod.name}
                              {prod.isFeatured && (
                                <span title="Featured Deal">
                                  <svg className="w-4 h-4 text-[#ED1C24]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-gray-500 font-mono">Weight: 1kg</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 hidden sm:table-cell">
                        <span className="bg-[#262626] text-gray-300 text-xs px-2.5 py-1 rounded-md border border-[#3A3A3A]">
                          {prod.cat}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-emerald-400 text-sm">Rs {prod.newPrice}</div>
                        {prod.oldPrice && (
                          <div className="text-xs text-gray-500 line-through">Rs {prod.oldPrice}</div>
                        )}
                      </td>
                      <td className="py-3.5 px-4 hidden md:table-cell">
                        {prod.tag ? (
                          <span className="bg-[#ED1C24]/10 text-[#ED1C24] border border-[#ED1C24]/20 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                            {prod.tag}
                          </span>
                        ) : (
                          <span className="text-gray-600 text-xs">-</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        {prod.inStock !== false ? (
                          <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            In Stock ({prod.stock || 10})
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs text-red-400 font-medium">
                            <span className="w-2 h-2 rounded-full bg-red-500"></span>
                            Out of Stock
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* Top Pick Toggle */}
                          <button
                            onClick={() => handleToggleTopPick(prod.id, prod.isTopPick || false)}
                            className={`p-2 rounded-lg border transition ${
                              prod.isTopPick
                                ? "bg-amber-500/20 border-amber-500/40 text-amber-400"
                                : "bg-[#262626] border-[#3A3A3A] text-gray-500 hover:text-amber-400 hover:border-amber-500/30"
                            }`}
                            title={prod.isTopPick ? "Remove from Top Picks" : "Add to Top Picks (max 4)"}
                          >
                            📌
                          </button>
                          <button
                            onClick={() => openEditProductModal(prod)}
                            className="bg-[#262626] hover:bg-[#333] text-gray-200 p-2 rounded-lg border border-[#3A3A3A] transition"
                            title="Edit Product"
                          >
                            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(prod.id)}
                            className="bg-[#262626] hover:bg-red-500/20 text-gray-200 p-2 rounded-lg border border-[#3A3A3A] hover:border-red-500/30 transition"
                            title="Delete Product"
                          >
                            <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* --- ADD / EDIT PRODUCT MODAL --- */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1C1C1C] border border-[#2A2A2A] rounded-2xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-[#2A2A2A] flex items-center justify-between shrink-0">
              <h2 className="text-xl font-bold text-white">
                {editingProductId ? "Edit Product" : "Add New Product"}
              </h2>
              <button
                type="button"
                onClick={() => setIsProductModalOpen(false)}
                className="text-gray-400 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="flex flex-col overflow-hidden">
              <div className="p-6 space-y-4 overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full bg-[#141414] border border-[#333] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#ED1C24]"
                    placeholder="e.g. Fresh Farm Boneless Chicken"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">
                    Category *
                  </label>
                  <select
                    value={productForm.cat}
                    onChange={(e) => {
                      const selected = categories.find((c) => c.name === e.target.value);
                      setProductForm({
                        ...productForm,
                        cat: e.target.value,
                        catSlug: selected?.slug || e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                      });
                    }}
                    className="w-full bg-[#141414] border border-[#333] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#ED1C24]"
                  >
                    {categories.map((c) => (
                      <option key={c.id || c.slug} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>



                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">
                    Price (Rs.) *
                  </label>
                  <input
                    type="text"
                    required
                    value={productForm.newPrice}
                    onChange={(e) => setProductForm({ ...productForm, newPrice: e.target.value })}
                    className="w-full bg-[#141414] border border-[#333] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#ED1C24]"
                    placeholder="e.g. 950"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">
                    Original Price (Rs. Optional)
                  </label>
                  <input
                    type="text"
                    value={productForm.oldPrice}
                    onChange={(e) => setProductForm({ ...productForm, oldPrice: e.target.value })}
                    className="w-full bg-[#141414] border border-[#333] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#ED1C24]"
                    placeholder="e.g. 1100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">
                    Weight / Portions
                  </label>
                  <input
                    type="text"
                    value={productForm.sizes}
                    onChange={(e) => setProductForm({ ...productForm, sizes: e.target.value })}
                    className="w-full bg-[#141414] border border-[#333] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#ED1C24]"
                    placeholder="e.g. 500g, 1kg, 2kg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#141414] border border-[#333] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#ED1C24]"
                  />
                </div>

                <div className="sm:col-span-2 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold text-gray-300 uppercase">
                      Product Image (Cloudinary Direct Upload)
                    </label>
                    {uploadStatus && (
                      <span className={`text-xs font-semibold ${uploadStatus.includes("successfully") || uploadStatus.includes("loaded") ? "text-emerald-400" : "text-amber-400"}`}>
                        {uploadStatus}
                      </span>
                    )}
                  </div>

                  {/* Cloudinary File Upload Box */}
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`border-2 border-dashed rounded-xl p-4 text-center bg-[#141414] transition ${
                      isDragging
                        ? "border-[#ED1C24] bg-[#ED1C24]/5 scale-[1.01]"
                        : "border-[#333] hover:border-[#ED1C24]/50"
                    }`}
                  >
                    <input
                      type="file"
                      id="cloudinaryImageInput"
                      accept="image/*"
                      onChange={handleImageFileSelect}
                      className="hidden"
                    />
                    <label
                      htmlFor="cloudinaryImageInput"
                      className="cursor-pointer flex flex-col items-center justify-center gap-2"
                    >
                      {isUploadingImage ? (
                        <div className="flex items-center gap-2 text-sm text-[#ED1C24] font-medium py-2">
                          <div className="animate-spin w-5 h-5 border-2 border-current border-t-transparent rounded-full"></div>
                          <span>Uploading image to Cloudinary...</span>
                        </div>
                      ) : (
                        <>
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isDragging ? "bg-[#ED1C24]/20 text-[#ED1C24]" : "bg-[#ED1C24]/10 text-[#ED1C24]"
                          }`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-white">
                              {isDragging ? "Drop image here" : "Click or Drag & Drop to Upload"}
                            </span>
                            <p className="text-xs text-gray-500 mt-0.5">Automated upload to Cloudinary &amp; auto-attached to product</p>
                          </div>
                        </>
                      )}
                    </label>
                  </div>

                  {/* Live Image Preview & URL input */}
                  {productForm.image && (
                    <div className="flex items-center gap-3 p-3 bg-[#262626] rounded-xl border border-[#333]">
                      <img
                        src={productForm.image}
                        alt="Preview"
                        className="w-14 h-14 object-cover rounded-lg border border-[#444] bg-[#141414]"
                      />
                      <div className="flex-1 overflow-hidden">
                        <div className="text-xs font-semibold text-gray-300 uppercase mb-1">Attached Image URL</div>
                        <input
                          type="text"
                          value={productForm.image}
                          onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                          className="w-full bg-[#141414] border border-[#333] rounded-lg px-2.5 py-1 text-xs text-white font-mono focus:outline-none focus:border-[#ED1C24]"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="w-full bg-[#141414] border border-[#333] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#ED1C24]"
                    placeholder="Describe cut quality, freshness guarantee..."
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">
                    Long Description (For Details Tab)
                  </label>
                  <textarea
                    rows={4}
                    value={productForm.longDescription}
                    onChange={(e) => setProductForm({ ...productForm, longDescription: e.target.value })}
                    className="w-full bg-[#141414] border border-[#333] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#ED1C24]"
                    placeholder="Enter full details, farm source, or halaal info..."
                  />
                </div>

                <div className="sm:col-span-2 flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-2">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="inStockCheck"
                      checked={productForm.inStock}
                      onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                      className="w-4 h-4 accent-[#ED1C24] rounded"
                    />
                    <label htmlFor="inStockCheck" className="text-sm font-semibold text-gray-200">
                      Product is available in stock
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="isFeaturedCheck"
                      checked={productForm.isFeatured}
                      onChange={(e) => setProductForm({ ...productForm, isFeatured: e.target.checked })}
                      className="w-4 h-4 accent-[#ED1C24] rounded"
                    />
                    <label htmlFor="isFeaturedCheck" className="text-sm font-semibold text-brand-pink flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-[#ED1C24]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      Mark as Featured Deal
                    </label>
                  </div>
                </div>
              </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 px-6 py-4 border-t border-[#2A2A2A] shrink-0">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="w-full sm:w-auto bg-[#262626] hover:bg-[#333] text-gray-300 text-sm font-medium px-5 py-2.5 rounded-xl border border-[#3A3A3A] transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-[#ED1C24] hover:bg-[#C8151C] text-white text-sm font-bold px-6 py-2.5 rounded-xl transition shadow-lg shadow-[#ED1C24]/20"
                >
                  {editingProductId ? "Save Changes" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- ADD CATEGORY MODAL --- */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1C1C1C] border border-[#2A2A2A] rounded-2xl w-full max-w-md shadow-2xl flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-[#2A2A2A] flex items-center justify-between shrink-0">
              <h2 className="text-xl font-bold text-white">Add New Category</h2>
              <button
                type="button"
                onClick={() => setIsCategoryModalOpen(false)}
                className="text-gray-400 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCategory} className="flex flex-col overflow-hidden">
              <div className="p-6 space-y-4 overflow-y-auto">
                <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                  className="w-full bg-[#141414] border border-[#333] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#ED1C24]"
                  placeholder="e.g. Organic Eggs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={categoryForm.description}
                  onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                  className="w-full bg-[#141414] border border-[#333] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#ED1C24]"
                  placeholder="e.g. Fresh farm eggs delivered daily"
                />
              </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 px-6 py-4 border-t border-[#2A2A2A] shrink-0">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="w-full sm:w-auto bg-[#262626] hover:bg-[#333] text-gray-300 text-sm font-medium px-4 py-2 rounded-xl border border-[#3A3A3A] transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-[#ED1C24] hover:bg-[#C8151C] text-white text-sm font-bold px-5 py-2 rounded-xl transition"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- DELETE CONFIRMATION MODAL --- */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1C1C1C] border border-[#2A2A2A] rounded-2xl w-full max-w-md p-6 text-center shadow-2xl">
            <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Delete Product?</h3>
            <p className="text-sm text-gray-400 mb-6">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>

            <div className="flex flex-col-reverse sm:flex-row justify-center gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="w-full sm:w-auto bg-[#262626] hover:bg-[#333] text-gray-300 text-sm font-medium px-5 py-2.5 rounded-xl border border-[#3A3A3A] transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteProduct(deleteConfirmId)}
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition shadow-lg shadow-red-600/20"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
