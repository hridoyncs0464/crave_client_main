


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { FaFire } from "react-icons/fa";
import useAxios from "../../Hooks/useAxios";

const Categories = () => {
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categoryImages = {
    "Starters": "https://images.unsplash.com/photo-1599599810694-c6f40e9e5ad3?w=200&h=200&fit=crop",
    "Soups & Salads": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=200&fit=crop",
    "Noodles & Rice": "https://images.unsplash.com/photo-1555939594-58d7cb561d1a?w=200&h=200&fit=crop",
    "Curries & Stir-Fries": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop",
    "Main Course": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop",
    "Crave's Unique Dishes": "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=200&h=200&fit=crop",
    "Sides": "https://images.unsplash.com/photo-1606787620884-c5f76f8360b0?w=200&h=200&fit=crop",
    "Drinks": "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=200&h=200&fit=crop",
    "Desserts": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200&h=200&fit=crop",
    "Fun Add-Ons": "https://images.unsplash.com/photo-1609007656243-cf884477f571?w=200&h=200&fit=crop"
  };

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
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [axiosInstance]);

  const handleCategoryClick = (categoryId) => {
    navigate(`/menu?category=${categoryId}`);
  };

  return (
    <section className="py-20 bg-base-100 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-6">
            <FaFire className="text-primary text-sm" />
            <span className="text-sm uppercase tracking-widest font-semibold text-primary">
              Explore Our Cuisine
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {" "}Categories
            </span>
          </h2>
          <p className="text-base-content/60 text-lg max-w-2xl mx-auto">
            Discover a world of flavors across our carefully curated food categories
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="alert alert-error shadow-lg mb-6">
            <span>{error}</span>
          </div>
        )}

        {/* Circle Grid */}
        {!loading && !error && categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="flex flex-col items-center gap-3 cursor-pointer group w-24"
              >
                {/* Circle */}
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-base-300 group-hover:border-primary transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                  <img
                    src={
                      categoryImages[category.category_name] ||
                      "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=200&h=200&fit=crop"
                    }
                    alt={category.category_name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=200&h=200&fit=crop";
                    }}
                  />
                </div>

                {/* Label */}
                <span className="text-xs md:text-sm font-medium text-center text-base-content/70 group-hover:text-primary transition-colors duration-200 leading-tight">
                  {category.category_name}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && categories.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl font-bold text-base-content/60">No categories found</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Categories;












// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router";
// import { FaArrowRight, FaFire } from "react-icons/fa";
// import useAxios from "../../Hooks/useAxios";

// const Categories = () => {
//   const axiosInstance = useAxios();
//   const navigate = useNavigate();

//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // High-quality food images for each category
//   const categoryImages = {
//     "Starters": "https://images.unsplash.com/photo-1599599810694-c6f40e9e5ad3?w=500&h=500&fit=crop",
//     "Soups & Salads": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=500&fit=crop",
//     "Noodles & Rice": "https://images.unsplash.com/photo-1555939594-58d7cb561d1a?w=500&h=500&fit=crop",
//     "Curries & Stir-Fries": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop",
//     "Main Course": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop",
//     "Crave's Unique Dishes": "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=500&fit=crop",
//     "Sides": "https://images.unsplash.com/photo-1606787620884-c5f76f8360b0?w=500&h=500&fit=crop",
//     "Drinks": "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&h=500&fit=crop",
//     "Desserts": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=500&fit=crop",
//     "Fun Add-Ons": "https://images.unsplash.com/photo-1609007656243-cf884477f571?w=500&h=500&fit=crop"
//   };

//   // Fetch categories
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
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategories();
//   }, [axiosInstance]);

//   // Handle category click - navigate to menu with filter
//   const handleCategoryClick = (categoryId) => {
//     navigate(`/menu?category=${categoryId}`);
//   };

//   return (
//     <section className="py-20 bg-gradient-to-b from-base-100 to-base-100 relative">
//       {/* Background decorative elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
//         <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
//       </div>

//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         {/* Section Header */}
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border border-primary/20 bg-primary/5 mb-6">
//             <FaFire className="text-primary text-sm" />
//             <span className="text-sm uppercase tracking-widest font-semibold text-primary">
//               Explore Our Cuisine
//             </span>
//           </div>

//           <h2 className="text-4xl md:text-5xl font-bold mb-4">
//             Our
//             <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
//               {" "}Categories
//             </span>
//           </h2>
//           <p className="text-base-content/60 text-lg max-w-2xl mx-auto">
//             Discover a world of flavors across our carefully curated food categories
//           </p>
//         </div>

//         {/* Loading State */}
//         {loading && (
//           <div className="flex justify-center items-center py-20">
//             <span className="loading loading-spinner loading-lg text-primary"></span>
//           </div>
//         )}

//         {/* Error State */}
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

//         {/* Categories Grid */}
//         {!loading && !error && categories.length > 0 && (
//           <div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {categories.map((category) => (
//                 <div
//                   key={category.id}
//                   onClick={() => handleCategoryClick(category.id)}
//                   className="group cursor-pointer h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
//                 >
//                   {/* Image Container */}
//                   <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
//                     {/* Background Image */}
//                     <img
//                       src={categoryImages[category.category_name] || "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=500&h=500&fit=crop"}
//                       alt={category.category_name}
//                       className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                       loading="lazy"
//                       onError={(e) => {
//                         e.target.src = "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=500&h=500&fit=crop";
//                       }}
//                     />

//                     {/* Overlay Gradient */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/85 transition-all duration-300"></div>

//                     {/* Content */}
//                     <div className="absolute inset-0 flex flex-col justify-between p-6">
//                       {/* Top Accent Bar */}
//                       <div className="w-12 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full group-hover:w-16 transition-all duration-300"></div>

//                       {/* Category Name and Description */}
//                       <div>
//                         <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
//                           {category.category_name}
//                         </h3>
//                         <p className="text-white/70 text-sm mb-4">
//                           Explore delicious options in this category
//                         </p>

//                         {/* CTA Button */}
//                         <button className="w-full py-3 px-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 opacity-0 group-hover:opacity-100">
//                           <span>View Menu</span>
//                           <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
//                         </button>
//                       </div>

//                       {/* Floating Badge */}
//                       <div className="absolute top-4 right-4 px-3 py-1 bg-primary/90 text-white text-xs font-semibold rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
//                         Click to explore
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Empty State */}
//             {categories.length === 0 && (
//               <div className="text-center py-20">
//                 <p className="text-2xl font-bold text-base-content/60">
//                   No categories found
//                 </p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Categories;