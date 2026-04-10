import React from "react";
import { Link } from "react-router";
import { FaUtensils, FaWineGlassAlt, FaStar, FaArrowRight } from "react-icons/fa";
import { MdRestaurantMenu } from "react-icons/md";

const Banner = () => {
  return (
    <section 
      className="hero min-h-screen"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="hero-overlay bg-black/60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-3xl">
          {/* Icon Badge */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border border-accent/30">
              <FaUtensils className="text-accent  text-sm" />
              <span className="text-sm uppercase tracking-wider text-accent font-semibold">
                Welcome to Crave
              </span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Crave the
            <span className="text-primary"> Experience</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl mb-10 text-white/80 max-w-2xl mx-auto">
            Experience exceptional dining with carefully crafted dishes made
            from the finest ingredients. Book your table today.
          </p>

          {/* CTA Buttons with Icons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/reservations" 
              className="btn btn-primary btn-wide gap-2 group"
            >
              Reserve a Table
              <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/menu" 
              className="btn btn-outline btn-wide gap-2 border-white text-white hover:bg-white/10 hover:border-white"
            >
              <MdRestaurantMenu className="text-lg" />
              View Menu
            </Link>
          </div>

          {/* Features with Icons */}
          <div className="mt-16 pt-8 border-t border-white/20">
            <div className="flex flex-wrap justify-center gap-8 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <FaUtensils className="text-primary" />
                <span>Fine Dining</span>
              </div>
              <div className="flex items-center gap-2">
                <FaWineGlassAlt className="text-secondary" />
                <span>Premium Selection</span>
              </div>
              <div className="flex items-center gap-2">
                <FaStar className="text-accent" />
                <span>Award Winning</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;