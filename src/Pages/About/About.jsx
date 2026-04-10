import React from "react";
import { Link } from "react-router";
import {
  FaUtensils,
  FaAward,
  FaHeart,
  FaLeaf,
  FaStar,
  FaUsers,
  FaFire,
  FaGlassCheers,
} from "react-icons/fa";
import { MdRestaurantMenu } from "react-icons/md";
import Footer from "../../Component/Footer";

const About = () => {
  const stats = [
    { icon: <FaUsers />, number: "10K+", label: "Happy Customers" },
    { icon: <FaAward />, number: "15+", label: "Awards Won" },
    { icon: <MdRestaurantMenu />, number: "200+", label: "Menu Items" },
    { icon: <FaStar />, number: "4.9", label: "Average Rating" },
  ];

  const values = [
    {
      icon: <FaHeart className="text-4xl text-primary" />,
      title: "Passion for Food",
      description:
        "Every dish is crafted with love and dedication to bring you the finest dining experience.",
    },
    {
      icon: <FaLeaf className="text-4xl text-success" />,
      title: "Fresh Ingredients",
      description:
        "We source only the freshest, highest quality ingredients from local farms and trusted suppliers.",
    },
    {
      icon: <FaFire className="text-4xl text-secondary" />,
      title: "Authentic Flavors",
      description:
        "Traditional recipes meet modern techniques to create unforgettable taste experiences.",
    },
    {
      icon: <FaGlassCheers className="text-4xl text-accent" />,
      title: "Memorable Moments",
      description:
        "We create an atmosphere where every meal becomes a cherished memory with loved ones.",
    },
  ];

  const team = [
    {
      name: "Chef Marcus Chen",
      role: "Executive Chef",
      image:
        "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=400&fit=crop",
      description: "20+ years of culinary excellence",
    },
    {
      name: "Sarah Johnson",
      role: "Head Sommelier",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
      description: "Award-winning wine expert",
    },
    {
      name: "David Martinez",
      role: "Pastry Chef",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
      description: "Master of sweet creations",
    },
  ];

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <section
        className="relative h-[60vh] flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center text-white px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border border-accent/30 mb-6">
            <FaUtensils className="text-accent" />
            <span className="text-sm uppercase tracking-wider font-semibold">
              Our Story
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            About <span className="text-primary">Crave</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Where passion meets flavor, and every meal tells a story
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <FaFire className="text-primary" />
                <span className="text-sm uppercase tracking-wider font-semibold text-primary">
                  Since 2010
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Our Journey to
                <span className="text-primary"> Excellence</span>
              </h2>
              <p className="text-base-content/70 text-lg mb-4 leading-relaxed">
                Founded in 2010, Crave began as a small family-owned restaurant
                with a simple mission: to serve exceptional food that brings
                people together. What started as a dream in a modest kitchen has
                grown into a beloved dining destination.
              </p>
              <p className="text-base-content/70 text-lg mb-4 leading-relaxed">
                Our commitment to quality, authenticity, and innovation has
                earned us recognition from food critics and, more importantly,
                the loyalty of thousands of satisfied guests. Every dish we
                serve is a testament to our dedication to culinary excellence.
              </p>
              <p className="text-base-content/70 text-lg mb-6 leading-relaxed">
                Today, we continue to push boundaries while staying true to our
                roots, creating memorable dining experiences that keep our
                guests coming back for more.
              </p>
              <Link to="/menu" className="btn btn-primary gap-2 group">
                Explore Our Menu
                <MdRestaurantMenu className="text-lg group-hover:scale-110 transition-transform" />
              </Link>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&h=600&fit=crop"
                  alt="Restaurant interior"
                  className="rounded-2xl shadow-lg w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                />
                <img
                  src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500&h=400&fit=crop"
                  alt="Chef cooking"
                  className="rounded-2xl shadow-lg w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img
                  src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=400&fit=crop"
                  alt="Delicious food"
                  className="rounded-2xl shadow-lg w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
                <img
                  src="https://images.unsplash.com/photo-1551218808-94e220e084d2?w=500&h=600&fit=crop"
                  alt="Happy diners"
                  className="rounded-2xl shadow-lg w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center text-white transform hover:scale-110 transition-transform duration-300"
              >
                <div className="text-4xl mb-3 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-white/90 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <FaHeart className="text-primary" />
              <span className="text-sm uppercase tracking-wider font-semibold text-primary">
                What We Stand For
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our Core <span className="text-primary">Values</span>
            </h2>
            <p className="text-base-content/60 text-lg max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="card-body items-center text-center">
                  <div className="mb-4">{value.icon}</div>
                  <h3 className="card-title text-xl mb-3">{value.title}</h3>
                  <p className="text-base-content/70">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <FaUsers className="text-primary" />
              <span className="text-sm uppercase tracking-wider font-semibold text-primary">
                The Faces Behind Crave
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Meet Our <span className="text-primary">Team</span>
            </h2>
            <p className="text-base-content/60 text-lg max-w-2xl mx-auto">
              Talented professionals dedicated to creating extraordinary dining
              experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                <figure className="relative h-80 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold">{member.name}</h3>
                    <p className="text-primary font-semibold">{member.role}</p>
                  </div>
                </figure>
                <div className="card-body">
                  <p className="text-base-content/70 text-center">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition Section */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <FaAward className="text-primary" />
              <span className="text-sm uppercase tracking-wider font-semibold text-primary">
                Recognition
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Awards & <span className="text-primary">Achievements</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                year: "2024",
                award: "Best Asian Restaurant",
                org: "Food & Wine Magazine",
              },
              {
                year: "2023",
                award: "Excellence in Service",
                org: "Restaurant Association",
              },
              {
                year: "2023",
                award: "Top 10 Fine Dining",
                org: "City Dining Guide",
              },
              {
                year: "2022",
                award: "Chef of the Year",
                org: "Culinary Institute",
              },
              {
                year: "2022",
                award: "Best Wine Selection",
                org: "Wine Enthusiast",
              },
              {
                year: "2021",
                award: "People's Choice Award",
                org: "Local Food Awards",
              },
            ].map((award, index) => (
              <div
                key={index}
                className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-primary"
              >
                <div className="card-body">
                  <div className="flex items-start gap-4">
                    <div className="text-5xl text-primary/20 font-bold">
                      {award.year}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{award.award}</h3>
                      <p className="text-base-content/60 text-sm">
                        {award.org}
                      </p>
                    </div>
                    <FaAward className="text-2xl text-accent" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Experience Crave?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join us for an unforgettable dining experience. Reserve your table
            today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/reservations"
              className="btn btn-accent btn-lg gap-2 group"
            >
              Book a Table
              <FaGlassCheers className="text-lg group-hover:scale-110 transition-transform" />
            </Link>
            <Link
              to="/menu"
              className="btn btn-outline border-white text-white hover:bg-white hover:text-primary btn-lg gap-2"
            >
              View Menu
              <MdRestaurantMenu className="text-lg" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;
