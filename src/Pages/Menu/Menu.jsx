// // // import React, { useState, useEffect } from "react";
// // // import useAxios from "../../hooks/useAxios";
// // // import { FaLeaf, FaStar } from "react-icons/fa";

// // // const Menu = () => {
// // //   const axiosInstance = useAxios(); // Initialize axios exactly like Register.jsx

// // //   const [menuItems, setMenuItems] = useState([]);
// // //   const [categories, setCategories] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);

// // //   // Filter states
// // //   const [selectedCategory, setSelectedCategory] = useState("all");
// // //   const [sortPrice, setSortPrice] = useState("default");

// // //   // Fetch categories on mount
// // //   useEffect(() => {
// // //     const fetchCategories = async () => {
// // //       try {
// // //         const response = await axiosInstance.get("/api/categories");
// // //         if (response.data.success) {
// // //           setCategories(response.data.data);
// // //         }
// // //       } catch (err) {
// // //         console.error("Error fetching categories:", err.message);
// // //         setError("Failed to fetch categories");
// // //       }
// // //     };

// // //     fetchCategories();
// // //   }, [axiosInstance]);

// // //   // Fetch menu items with filters
// // //   useEffect(() => {
// // //     const fetchMenuItems = async () => {
// // //       setLoading(true);
// // //       setError(null);
// // //       try {
// // //         const params = new URLSearchParams();

// // //         if (selectedCategory !== "all") {
// // //           params.append("category", selectedCategory);
// // //         }

// // //         if (sortPrice !== "default") {
// // //           params.append("sortPrice", sortPrice);
// // //         }

// // //         const response = await axiosInstance.get(
// // //           `/api/menu?${params.toString()}`
// // //         );

// // //         if (response.data.success) {
// // //           setMenuItems(response.data.data);
// // //         }
// // //       } catch (err) {
// // //         console.error("Error fetching menu items:", err.message);
// // //         setError("Failed to fetch menu items");
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchMenuItems();
// // //   }, [selectedCategory, sortPrice, axiosInstance]);

// // //   return (
// // //     <div className="min-h-screen bg-base-100">
// // //       {/* Hero Section */}
// // //       <div className="bg-gradient-to-r from-primary to-accent py-12 text-center">
// // //         <h1 className="text-5xl font-black text-white mb-2">🔥 Our Menu</h1>
// // //         <p className="text-white/90 text-lg">
// // //           Discover authentic Asian cuisine crafted with passion
// // //         </p>
// // //       </div>

// // //       {/* Main Container */}
// // //       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
// // //         {/* Filter Section */}
// // //         <div className="mb-8 bg-base-200 p-6 rounded-lg shadow-md">
// // //           <h2 className="text-2xl font-bold mb-4">Filter & Sort</h2>

// // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //             {/* Category Filter */}
// // //             <div>
// // //               <label className="block text-sm font-semibold mb-2">
// // //                 Category
// // //               </label>
// // //               <select
// // //                 value={selectedCategory}
// // //                 onChange={(e) => setSelectedCategory(e.target.value)}
// // //                 className="select select-bordered w-full"
// // //               >
// // //                 <option value="all">All Categories</option>
// // //                 {categories.map((category) => (
// // //                   <option key={category.id} value={category.id}>
// // //                     {category.category_name}
// // //                   </option>
// // //                 ))}
// // //               </select>
// // //             </div>

// // //             {/* Price Sort */}
// // //             <div>
// // //               <label className="block text-sm font-semibold mb-2">
// // //                 Sort by Price
// // //               </label>
// // //               <select
// // //                 value={sortPrice}
// // //                 onChange={(e) => setSortPrice(e.target.value)}
// // //                 className="select select-bordered w-full"
// // //               >
// // //                 <option value="default">Default</option>
// // //                 <option value="low-to-high">Low to High</option>
// // //                 <option value="high-to-low">High to Low</option>
// // //               </select>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Error Message */}
// // //         {error && (
// // //           <div className="alert alert-error shadow-lg mb-6">
// // //             <svg
// // //               xmlns="http://www.w3.org/2000/svg"
// // //               className="stroke-current flex-shrink-0 h-6 w-6"
// // //               fill="none"
// // //               viewBox="0 0 24 24"
// // //             >
// // //               <path
// // //                 strokeLinecap="round"
// // //                 strokeLinejoin="round"
// // //                 strokeWidth="2"
// // //                 d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
// // //               />
// // //             </svg>
// // //             <span>{error}</span>
// // //           </div>
// // //         )}

// // //         {/* Loading State */}
// // //         {loading && (
// // //           <div className="flex justify-center items-center py-20">
// // //             <span className="loading loading-spinner loading-lg text-primary"></span>
// // //           </div>
// // //         )}

// // //         {/* Menu Items Grid */}
// // //         {!loading && !error && menuItems.length > 0 && (
// // //           <div>
// // //             <h3 className="text-2xl font-bold mb-6">
// // //               {selectedCategory === "all"
// // //                 ? "All Dishes"
// // //                 : `${
// // //                     categories.find((c) => c.id === parseInt(selectedCategory))
// // //                       ?.category_name || "Selected Category"
// // //                   } (${menuItems.length})`}
// // //             </h3>

// // //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //               {menuItems.map((item) => (
// // //                 <div
// // //                   key={item.id}
// // //                   className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow border border-base-300"
// // //                 >
// // //                   {/* Card Header with Badge */}
// // //                   <div className="card-body">
// // //                     <div className="flex justify-between items-start gap-2">
// // //                       <div className="flex-1">
// // //                         <h2 className="card-title text-lg">{item.item_name}</h2>
// // //                         <p className="text-xs text-base-content/60 mt-1">
// // //                           {item.category_name}
// // //                         </p>
// // //                       </div>

// // //                       {/* Unique Dish Badge */}
// // //                       {item.is_unique && (
// // //                         <div className="badge badge-warning gap-1">
// // //                           <FaStar className="text-yellow-500" />
// // //                           Unique
// // //                         </div>
// // //                       )}
// // //                     </div>

// // //                     {/* Ingredients */}
// // //                     <p className="text-sm text-base-content/70 line-clamp-2">
// // //                       <FaLeaf className="inline mr-1 text-success" />
// // //                       {item.ingredients}
// // //                     </p>

// // //                     {/* Price and Action */}
// // //                     <div className="card-actions justify-between items-center mt-4">
// // //                       <span className="text-xl font-bold text-primary">
// // //                         ৳{item.price_bdt}
// // //                       </span>
// // //                       <button className="btn btn-primary btn-sm rounded-md">
// // //                         Add to Cart
// // //                       </button>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* Empty State */}
// // //         {!loading && !error && menuItems.length === 0 && (
// // //           <div className="text-center py-20">
// // //             <p className="text-2xl font-bold text-base-content/60">
// // //               No items found in this category
// // //             </p>
// // //             <button
// // //               onClick={() => {
// // //                 setSelectedCategory("all");
// // //                 setSortPrice("default");
// // //               }}
// // //               className="btn btn-primary mt-4"
// // //             >
// // //               Reset Filters
// // //             </button>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Menu;

// // import React, { useState, useEffect } from "react";
// // import { useSearchParams } from "react-router";
// // import useAxios from "../../hooks/useAxios";
// // import { FaLeaf, FaStar } from "react-icons/fa";

// // const Menu = () => {
// //   const axiosInstance = useAxios();
// //   const [searchParams] = useSearchParams();

// //   const [menuItems, setMenuItems] = useState([]);
// //   const [categories, setCategories] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   // Filter states - get category from URL params if available
// //   const urlCategory = searchParams.get("category");
// //   const [selectedCategory, setSelectedCategory] = useState(urlCategory || "all");
// //   const [sortPrice, setSortPrice] = useState("default");

// //   // Fetch categories on mount
// //   useEffect(() => {
// //     const fetchCategories = async () => {
// //       try {
// //         const response = await axiosInstance.get("/api/categories");
// //         if (response.data.success) {
// //           setCategories(response.data.data);
// //         }
// //       } catch (err) {
// //         console.error("Error fetching categories:", err.message);
// //         setError("Failed to fetch categories");
// //       }
// //     };

// //     fetchCategories();
// //   }, [axiosInstance]);

// //   // Update selectedCategory when URL changes
// //   useEffect(() => {
// //     if (urlCategory) {
// //       setSelectedCategory(urlCategory);
// //     }
// //   }, [urlCategory]);

// //   // Fetch menu items with filters
// //   useEffect(() => {
// //     const fetchMenuItems = async () => {
// //       setLoading(true);
// //       setError(null);
// //       try {
// //         let endpoint = "/api/menu";
// //         const params = new URLSearchParams();

// //         // Add category filter if not "all"
// //         if (selectedCategory && selectedCategory !== "all") {
// //           params.append("category", selectedCategory);
// //         }

// //         // Add price sort if not "default"
// //         if (sortPrice !== "default") {
// //           params.append("sortPrice", sortPrice);
// //         }

// //         // Build full URL
// //         if (params.toString()) {
// //           endpoint += `?${params.toString()}`;
// //         }

// //         console.log("Fetching from:", endpoint); // Debug log

// //         const response = await axiosInstance.get(endpoint);

// //         if (response.data.success) {
// //           setMenuItems(response.data.data);
// //         }
// //       } catch (err) {
// //         console.error("Error fetching menu items:", err.message);
// //         setError("Failed to fetch menu items");
// //         setMenuItems([]);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchMenuItems();
// //   }, [selectedCategory, sortPrice, axiosInstance]);

// //   // Get current category name
// //   const getCurrentCategoryName = () => {
// //     if (selectedCategory === "all") return "All Dishes";
// //     const found = categories.find((c) => c.id === parseInt(selectedCategory));
// //     return found ? `${found.category_name} (${menuItems.length})` : "Selected Category";
// //   };

// //   return (
// //     <div className="min-h-screen bg-base-100">
// //       {/* Hero Section */}
// //       <div className="bg-gradient-to-r from-primary to-accent py-12 text-center">
// //         <h1 className="text-5xl font-black text-white mb-2">🔥 Our Menu</h1>
// //         <p className="text-white/90 text-lg">
// //           {selectedCategory && selectedCategory !== "all"
// //             ? `${categories.find((c) => c.id === parseInt(selectedCategory))?.category_name || "Category"} Menu`
// //             : "Discover authentic Asian cuisine crafted with passion"}
// //         </p>
// //       </div>

// //       {/* Main Container */}
// //       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
// //         {/* Filter Section */}
// //         <div className="mb-8 bg-base-200 p-6 rounded-lg shadow-md">
// //           <h2 className="text-2xl font-bold mb-4">Filter & Sort</h2>

// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //             {/* Category Filter */}
// //             <div>
// //               <label className="block text-sm font-semibold mb-2">
// //                 Category
// //               </label>
// //               <select
// //                 value={selectedCategory}
// //                 onChange={(e) => setSelectedCategory(e.target.value)}
// //                 className="select select-bordered w-full"
// //               >
// //                 <option value="all">All Categories</option>
// //                 {categories.map((category) => (
// //                   <option key={category.id} value={category.id}>
// //                     {category.category_name}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>

// //             {/* Price Sort */}
// //             <div>
// //               <label className="block text-sm font-semibold mb-2">
// //                 Sort by Price
// //               </label>
// //               <select
// //                 value={sortPrice}
// //                 onChange={(e) => setSortPrice(e.target.value)}
// //                 className="select select-bordered w-full"
// //               >
// //                 <option value="default">Default</option>
// //                 <option value="low-to-high">Low to High (৳)</option>
// //                 <option value="high-to-low">High to Low (৳)</option>
// //               </select>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Error Message */}
// //         {error && (
// //           <div className="alert alert-error shadow-lg mb-6">
// //             <svg
// //               xmlns="http://www.w3.org/2000/svg"
// //               className="stroke-current flex-shrink-0 h-6 w-6"
// //               fill="none"
// //               viewBox="0 0 24 24"
// //             >
// //               <path
// //                 strokeLinecap="round"
// //                 strokeLinejoin="round"
// //                 strokeWidth="2"
// //                 d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
// //               />
// //             </svg>
// //             <span>{error}</span>
// //           </div>
// //         )}

// //         {/* Loading State */}
// //         {loading && (
// //           <div className="flex justify-center items-center py-20">
// //             <span className="loading loading-spinner loading-lg text-primary"></span>
// //           </div>
// //         )}

// //         {/* Menu Items Grid */}
// //         {!loading && !error && menuItems.length > 0 && (
// //           <div>
// //             <h3 className="text-3xl font-bold mb-8 text-center">
// //               {getCurrentCategoryName()}
// //             </h3>

// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //               {menuItems.map((item) => (
// //                 <div
// //                   key={item.id}
// //                   className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 border border-base-300 hover:border-primary transform hover:scale-105"
// //                 >
// //                   {/* Card Header with Badge */}
// //                   <div className="card-body">
// //                     <div className="flex justify-between items-start gap-2">
// //                       <div className="flex-1">
// //                         <h2 className="card-title text-lg text-primary">
// //                           {item.item_name}
// //                         </h2>
// //                         <p className="text-xs text-base-content/60 mt-1">
// //                           {item.category_name}
// //                         </p>
// //                       </div>

// //                       {/* Unique Dish Badge */}
// //                       {item.is_unique && (
// //                         <div className="badge badge-warning gap-1 animate-pulse">
// //                           <FaStar className="text-yellow-500" />
// //                           Unique
// //                         </div>
// //                       )}
// //                     </div>

// //                     {/* Ingredients */}
// //                     <p className="text-sm text-base-content/70 line-clamp-2 my-2">
// //                       <FaLeaf className="inline mr-2 text-success" />
// //                       {item.ingredients}
// //                     </p>

// //                     {/* Divider */}
// //                     <div className="divider my-2"></div>

// //                     {/* Price and Action */}
// //                     <div className="card-actions justify-between items-center">
// //                       <span className="text-2xl font-black text-primary">
// //                         ৳{item.price_bdt.toFixed(0)}
// //                       </span>
// //                       <button className="btn btn-primary btn-sm rounded-md font-semibold hover:scale-110 transition-transform">
// //                         Add to Cart
// //                       </button>
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         )}

// //         {/* Empty State */}
// //         {!loading && !error && menuItems.length === 0 && (
// //           <div className="text-center py-20">
// //             <div className="mb-4 text-6xl">🔍</div>
// //             <p className="text-2xl font-bold text-base-content/60 mb-4">
// //               No items found in this category
// //             </p>
// //             <p className="text-base-content/50 mb-6">
// //               Try selecting a different category or sort option
// //             </p>
// //             <button
// //               onClick={() => {
// //                 setSelectedCategory("all");
// //                 setSortPrice("default");
// //               }}
// //               className="btn btn-primary"
// //             >
// //               View All Items
// //             </button>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Menu;
// import React, { useState, useEffect } from "react";
// import { useSearchParams } from "react-router";
// import useAxios from "../../hooks/useAxios";
// import { FaLeaf, FaStar } from "react-icons/fa";

// const Menu = () => {
//   const axiosInstance = useAxios();
//   const [searchParams] = useSearchParams();

//   const [menuItems, setMenuItems] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Filter states - get category from URL params if available
//   const urlCategory = searchParams.get("category");
//   const [selectedCategory, setSelectedCategory] = useState(urlCategory || "all");
//   const [sortPrice, setSortPrice] = useState("default");

//   // Fetch categories on mount
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axiosInstance.get("/api/categories");
//         if (response.data.success) {
//           setCategories(response.data.data);
//         }
//       } catch (err) {
//         console.error("Error fetching categories:", err.message);
//         setError("Failed to fetch categories");
//       }
//     };

//     fetchCategories();
//   }, [axiosInstance]);

//   // Update selectedCategory when URL changes
//   useEffect(() => {
//     if (urlCategory) {
//       setSelectedCategory(urlCategory);
//     }
//   }, [urlCategory]);

//   // Fetch menu items with filters
//   useEffect(() => {
//     const fetchMenuItems = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         let endpoint = "/api/menu";
//         const params = new URLSearchParams();

//         // Add category filter if not "all"
//         if (selectedCategory && selectedCategory !== "all") {
//           params.append("category", selectedCategory);
//         }

//         // Add price sort if not "default"
//         if (sortPrice !== "default") {
//           params.append("sortPrice", sortPrice);
//         }

//         // Build full URL
//         if (params.toString()) {
//           endpoint += `?${params.toString()}`;
//         }

//         console.log("Fetching from:", endpoint); // Debug log

//         const response = await axiosInstance.get(endpoint);

//         if (response.data.success) {
//           setMenuItems(response.data.data);
//         }
//       } catch (err) {
//         console.error("Error fetching menu items:", err.message);
//         setError("Failed to fetch menu items");
//         setMenuItems([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMenuItems();
//   }, [selectedCategory, sortPrice, axiosInstance]);

//   // Get current category name
//   const getCurrentCategoryName = () => {
//     if (selectedCategory === "all") return "All Dishes";
//     const found = categories.find((c) => c.id === parseInt(selectedCategory));
//     return found ? `${found.category_name} (${menuItems.length})` : "Selected Category";
//   };

//   return (
//     <div className="min-h-screen bg-base-100">
//       {/* Hero Section */}
//       <div className="bg-gradient-to-r from-primary to-accent py-12 text-center">
//         <h1 className="text-5xl font-black text-white mb-2">🔥 Our Menu</h1>
//         <p className="text-white/90 text-lg">
//           {selectedCategory && selectedCategory !== "all"
//             ? `${categories.find((c) => c.id === parseInt(selectedCategory))?.category_name || "Category"} Menu`
//             : "Discover authentic Asian cuisine crafted with passion"}
//         </p>
//       </div>

//       {/* Main Container */}
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* Filter Section */}
//         <div className="mb-8 bg-base-200 p-6 rounded-lg shadow-md">
//           <h2 className="text-2xl font-bold mb-4">Filter & Sort</h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Category Filter */}
//             <div>
//               <label className="block text-sm font-semibold mb-2">
//                 Category
//               </label>
//               <select
//                 value={selectedCategory}
//                 onChange={(e) => setSelectedCategory(e.target.value)}
//                 className="select select-bordered w-full"
//               >
//                 <option value="all">All Categories</option>
//                 {categories.map((category) => (
//                   <option key={category.id} value={category.id}>
//                     {category.category_name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Price Sort */}
//             <div>
//               <label className="block text-sm font-semibold mb-2">
//                 Sort by Price
//               </label>
//               <select
//                 value={sortPrice}
//                 onChange={(e) => setSortPrice(e.target.value)}
//                 className="select select-bordered w-full"
//               >
//                 <option value="default">Default</option>
//                 <option value="low-to-high">Low to High (৳)</option>
//                 <option value="high-to-low">High to Low (৳)</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="alert alert-error shadow-lg mb-6">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="stroke-current flex-shrink-0 h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
//               />
//             </svg>
//             <span>{error}</span>
//           </div>
//         )}

//         {/* Loading State */}
//         {loading && (
//           <div className="flex justify-center items-center py-20">
//             <span className="loading loading-spinner loading-lg text-primary"></span>
//           </div>
//         )}

//         {/* Menu Items Grid */}
//         {!loading && !error && menuItems.length > 0 && (
//           <div>
//             <h3 className="text-3xl font-bold mb-8 text-center">
//               {getCurrentCategoryName()}
//             </h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {menuItems.map((item) => (
//                 <div
//                   key={item.id}
//                   className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 border border-base-300 hover:border-primary transform hover:scale-105"
//                 >
//                   {/* Card Header with Badge */}
//                   <div className="card-body">
//                     <div className="flex justify-between items-start gap-2">
//                       <div className="flex-1">
//                         <h2 className="card-title text-lg text-primary">
//                           {item.item_name}
//                         </h2>
//                         <p className="text-xs text-base-content/60 mt-1">
//                           {item.category_name}
//                         </p>
//                       </div>

//                       {/* Unique Dish Badge */}
//                       {item.is_unique && (
//                         <div className="badge badge-warning gap-1 animate-pulse">
//                           <FaStar className="text-yellow-500" />
//                           Unique
//                         </div>
//                       )}
//                     </div>

//                     {/* Ingredients */}
//                     <p className="text-sm text-base-content/70 line-clamp-2 my-2">
//                       <FaLeaf className="inline mr-2 text-success" />
//                       {item.ingredients}
//                     </p>

//                     {/* Divider */}
//                     <div className="divider my-2"></div>

//                     {/* Price and Action */}
//                     <div className="card-actions justify-between items-center">
//                       <span className="text-2xl font-black text-primary">
//                         ৳{typeof item.price_bdt === 'number' ? item.price_bdt.toFixed(0) : parseInt(item.price_bdt)}
//                       </span>
//                       <button className="btn btn-primary btn-sm rounded-md font-semibold hover:scale-110 transition-transform">
//                         Add to Cart
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Empty State */}
//         {!loading && !error && menuItems.length === 0 && (
//           <div className="text-center py-20">
//             <div className="mb-4 text-6xl">🔍</div>
//             <p className="text-2xl font-bold text-base-content/60 mb-4">
//               No items found in this category
//             </p>
//             <p className="text-base-content/50 mb-6">
//               Try selecting a different category or sort option
//             </p>
//             <button
//               onClick={() => {
//                 setSelectedCategory("all");
//                 setSortPrice("default");
//               }}
//               className="btn btn-primary"
//             >
//               View All Items
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Menu;   

import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import useAxios from "../../Hooks/useAxios";
import useCart from "../../Hooks/useCart";
import { FaLeaf, FaStar } from "react-icons/fa";
import { FiShoppingCart, FiPlus, FiMinus } from "react-icons/fi";
import { MdTableRestaurant } from "react-icons/md";

const Menu = () => {
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // ✅ Cart hook - gives us everything we need
  const { cartItems, addToCart, updateQuantity, cartCount, tableNumber } = useCart();

  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get category from URL params if available
  const urlCategory = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState(urlCategory || "all");
  const [sortPrice, setSortPrice] = useState("default");

  // ✅ Helper: preserve ?table=X in all navigation
  const tableParam = tableNumber ? `?table=${tableNumber}` : "";

  // ✅ Helper: find item in cart
  const getCartItem = (id) => cartItems.find((i) => i.id === id);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/api/categories");
        if (response.data.success) {
          setCategories(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching categories:", err.message);
        setError("Failed to fetch categories");
      }
    };
    fetchCategories();
  }, [axiosInstance]);

  // Update selectedCategory when URL changes
  useEffect(() => {
    if (urlCategory) {
      setSelectedCategory(urlCategory);
    }
  }, [urlCategory]);

  // Fetch menu items with filters
  useEffect(() => {
    const fetchMenuItems = async () => {
      setLoading(true);
      setError(null);
      try {
        let endpoint = "/api/menu";
        const params = new URLSearchParams();

        if (selectedCategory && selectedCategory !== "all") {
          params.append("category", selectedCategory);
        }
        if (sortPrice !== "default") {
          params.append("sortPrice", sortPrice);
        }
        if (params.toString()) {
          endpoint += `?${params.toString()}`;
        }

        const response = await axiosInstance.get(endpoint);
        if (response.data.success) {
          setMenuItems(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching menu items:", err.message);
        setError("Failed to fetch menu items");
        setMenuItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMenuItems();
  }, [selectedCategory, sortPrice, axiosInstance]);

  const getCurrentCategoryName = () => {
    if (selectedCategory === "all") return "All Dishes";
    const found = categories.find((c) => c.id === parseInt(selectedCategory));
    return found
      ? `${found.category_name} (${menuItems.length})`
      : "Selected Category";
  };

  return (
    <div className="min-h-screen bg-base-100">

      {/* ===== HERO SECTION ===== */}
      <div className="bg-gradient-to-r from-primary to-accent py-12 text-center">
        <h1 className="text-5xl font-black text-white mb-2">🔥 Our Menu</h1>
        <p className="text-white/90 text-lg">
          {selectedCategory && selectedCategory !== "all"
            ? `${
                categories.find((c) => c.id === parseInt(selectedCategory))
                  ?.category_name || "Category"
              } Menu`
            : "Discover authentic Asian cuisine crafted with passion"}
        </p>

        {/* ✅ Table number badge inside hero */}
        {tableNumber ? (
          <div className="inline-flex items-center gap-2 bg-white/20 text-white
            px-4 py-2 rounded-full mt-4 text-sm font-semibold">
            <MdTableRestaurant className="text-lg" />
            Ordering for Table {tableNumber}
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 bg-yellow-400/30 text-white
            px-4 py-2 rounded-full mt-4 text-sm font-medium">
            ⚠️ No table detected — scan your table QR code to order
          </div>
        )}
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* ===== FILTER SECTION ===== */}
        <div className="mb-8 bg-base-200 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Filter & Sort</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.category_name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Sort by Price</label>
              <select
                value={sortPrice}
                onChange={(e) => setSortPrice(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="default">Default</option>
                <option value="low-to-high">Low to High (৳)</option>
                <option value="high-to-low">High to Low (৳)</option>
              </select>
            </div>
          </div>
        </div>

        {/* ===== ERROR STATE ===== */}
        {error && (
          <div className="alert alert-error shadow-lg mb-6">
            <svg xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* ===== LOADING STATE ===== */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        )}

        {/* ===== MENU ITEMS GRID ===== */}
        {!loading && !error && menuItems.length > 0 && (
          <div>
            <h3 className="text-3xl font-bold mb-8 text-center">
              {getCurrentCategoryName()}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map((item) => {
                // ✅ Check if this item is already in cart
                const cartItem = getCartItem(item.id);

                return (
                  <div
                    key={item.id}
                    className="card bg-base-100 shadow-md hover:shadow-xl transition-all
                      duration-300 border border-base-300 hover:border-primary transform hover:scale-105"
                  >
                    <div className="card-body">

                      {/* Name + Unique badge */}
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex-1">
                          <h2 className="card-title text-lg text-primary">
                            {item.item_name}
                          </h2>
                          <p className="text-xs text-base-content/60 mt-1">
                            {item.category_name}
                          </p>
                        </div>
                        {item.is_unique && (
                          <div className="badge badge-warning gap-1 animate-pulse">
                            <FaStar className="text-yellow-500" />
                            Unique
                          </div>
                        )}
                      </div>

                      {/* Ingredients */}
                      <p className="text-sm text-base-content/70 line-clamp-2 my-2">
                        <FaLeaf className="inline mr-2 text-success" />
                        {item.ingredients}
                      </p>

                      <div className="divider my-2"></div>

                      {/* Price + Cart controls */}
                      <div className="card-actions justify-between items-center">
                        <span className="text-2xl font-black text-primary">
                          ৳{typeof item.price_bdt === "number"
                            ? item.price_bdt.toFixed(0)
                            : parseInt(item.price_bdt)}
                        </span>
   
                        {/* ✅ If NOT in cart → Add button */}
                        {/* ✅ If IN cart → +/- quantity controls */}
                        {!cartItem ? (
                          <button
                            className="btn btn-primary btn-sm rounded-md font-semibold
                              hover:scale-110 transition-transform gap-1"
                            onClick={() => addToCart(item)}
                          >
                            <FiShoppingCart className="text-sm" />
                            Add to Cart
                          </button>
                        ) : (
                          <div className="flex items-center gap-2">
                            <button
                              className="btn btn-outline btn-primary btn-sm btn-circle"
                              onClick={() =>
                                updateQuantity(item.id, cartItem.quantity - 1)
                              }
                            >
                              <FiMinus />
                            </button>
                            <span className="font-bold text-primary w-5 text-center">
                              {cartItem.quantity}
                            </span>
                            <button
                              className="btn btn-primary btn-sm btn-circle"
                              onClick={() =>
                                updateQuantity(item.id, cartItem.quantity + 1)
                              }
                            >
                              <FiPlus />
                            </button>
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===== EMPTY STATE ===== */}
        {!loading && !error && menuItems.length === 0 && (
          <div className="text-center py-20">
            <div className="mb-4 text-6xl">🔍</div>
            <p className="text-2xl font-bold text-base-content/60 mb-4">
              No items found in this category
            </p>
            <p className="text-base-content/50 mb-6">
              Try selecting a different category or sort option
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSortPrice("default");
              }}
              className="btn btn-primary"
            >
              View All Items
            </button>
          </div>
        )}

      </div>

      {/* ===== FLOATING VIEW CART BUTTON ===== */}
      {/* ✅ Only appears when at least 1 item is in cart */}
      {cartCount > 0 && (
        <div className="fixed bottom-6 left-0 right-0 flex justify-center z-50 px-4">
          <button
            className="btn btn-primary btn-lg shadow-2xl gap-3 px-10 rounded-full"
            onClick={() => navigate(`/cart${tableParam}`)}
          >
            <FiShoppingCart className="text-xl" />
            View Cart
            <span className="badge badge-sm bg-white text-primary font-bold">
              {cartCount} {cartCount === 1 ? "item" : "items"}
            </span>
          </button>
        </div>
      )}

    </div>
  );
};

export default Menu;