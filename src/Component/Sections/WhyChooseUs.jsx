



import { useRef } from "react";

const features = [
  {
    num: "01",
    tag: "Culinary",
    icon: "👨‍🍳",
    title: "Master Chefs",
    description:
      "Trained across Thailand, Japan, and Korea — our chefs bring decades of authentic Asian culinary expertise to every dish.",
    img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
  },
  {
    num: "02",
    tag: "Freshness",
    icon: "🌿",
    title: "Fresh Ingredients",
    description:
      "Sourced daily from local markets. No freezer shortcuts — just honest, vibrant produce arriving straight to your plate.",
    img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80",
  },
  {
    num: "03",
    tag: "Flavour",
    icon: "🌶️",
    title: "Authentic Flavours",
    description:
      "Sichuan peppercorns, kaffir lime leaves — we import the real thing so every bite is a genuine cultural journey.",
    img: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=600&q=80",
  },
  {
    num: "04",
    tag: "Service",
    icon: "⚡",
    title: "Fast Table Service",
    description:
      "Scan, order, enjoy. QR-powered table ordering means your food starts cooking the moment you confirm.",
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
  },
  {
    num: "05",
    tag: "Signature",
    icon: "🔥",
    title: "Crave Originals",
    description:
      "Sushi Burritos, Ramen Burgers, Volcano Rice — our signature dishes exist nowhere else. Bold creativity in every bite.",
    img: "https://images.unsplash.com/photo-1562802378-063ec186a863?w=600&q=80",
  },
  {
    num: "06",
    tag: "Ambiance",
    icon: "🕯️",
    title: "Cosy Atmosphere",
    description:
      "Warm lighting, intimate seating, and a space designed to make every meal feel like a special occasion.",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="relative bg-base-100 py-24 px-4 overflow-hidden">
      {/* Ghost watermark text */}
      <span
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        font-black text-[280px] text-primary/[0.03] pointer-events-none
        select-none whitespace-nowrap tracking-tighter leading-none"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        CRAVE
      </span>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-px w-8 bg-primary/40" />
            <span className="text-primary text-[11px] font-medium tracking-[4px] uppercase">
              ✦ The Crave Difference ✦
            </span>
            <span className="h-px w-8 bg-primary/40" />
          </div>
          <h2
            className="text-5xl md:text-7xl font-black leading-[1.05] text-base-content"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Why Guests Keep
            <br />
            <em className="text-primary not-italic italic">Coming Back</em>
          </h2>
          <p className="mt-5 text-base-content/50 font-light text-base max-w-md mx-auto leading-relaxed">
            Six reasons every visit feels like the first — and never the last.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.num}
              className="group relative rounded-2xl overflow-hidden cursor-pointer h-96
                transition-all duration-500 ease-out
                hover:-translate-y-2 hover:scale-[1.01]
                hover:shadow-[0_40px_80px_rgba(192,57,43,0.18),0_20px_40px_rgba(0,0,0,0.12)]"
            >
              {/* Background image */}
              <img
                src={f.img}
                alt={f.title}
                className="absolute inset-0 w-full h-full object-cover
                  brightness-[0.55] saturate-110
                  group-hover:brightness-[0.4] group-hover:saturate-[1.3]
                  group-hover:scale-[1.08]
                  transition-all duration-700 ease-out"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1208]/95 via-[#1A1208]/50 to-transparent" />

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 w-full h-[3px] bg-primary
                scale-x-0 group-hover:scale-x-100 origin-left
                transition-transform duration-500 ease-out"
              />

              {/* Corner badges */}
              <span
                className="absolute top-5 left-5 text-[13px] font-bold text-white/30
                group-hover:text-accent/70 transition-colors duration-300"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {f.num}
              </span>
              <span
                className="absolute top-5 right-5 px-3 py-1 rounded-full
                border border-white/20 text-[11px] uppercase tracking-[2px] text-white/70
                group-hover:bg-primary group-hover:text-white group-hover:border-primary
                transition-all duration-300 backdrop-blur-sm"
              >
                {f.tag}
              </span>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-7">
                <div
                  className="w-12 h-12 rounded-xl border border-white/15 bg-white/8
                  flex items-center justify-center text-2xl mb-4
                  group-hover:bg-primary group-hover:border-primary group-hover:scale-110
                  transition-all duration-300 backdrop-blur-md"
                >
                  {f.icon}
                </div>
                <h3
                  className="text-2xl font-bold text-white mb-2
                  group-hover:text-accent transition-colors duration-300"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {f.title}
                </h3>
                <p
                  className="text-sm font-light text-white/60 leading-relaxed
                  max-h-0 overflow-hidden opacity-0
                  group-hover:max-h-24 group-hover:opacity-100
                  transition-all duration-500 ease-out"
                >
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </div>

       

        
      </div>
    </section>
  );
};

export default WhyChooseUs;






// import { FaFire, FaLeaf, FaClock, FaPepperHot } from "react-icons/fa";
// import { GiChefToque } from "react-icons/gi";
// import { MdDeliveryDining } from "react-icons/md";
// const features = [
//   {
//     icon: <GiChefToque className="text-4xl text-primary" />,
//     title: "Master Chefs",
//     description:
//       "Our chefs bring decades of authentic Asian culinary expertise — trained across Thailand, Japan, and Korea to deliver every dish with soul.",
//   },
//   {
//     icon: <FaLeaf className="text-4xl text-success" />,
//     title: "Fresh Ingredients",
//     description:
//       "Every ingredient is sourced daily from local markets. No freezer shortcuts — just honest, vibrant produce on your plate.",
//   },
//   {
//     icon: <FaPepperHot className="text-4xl text-secondary" />,
//     title: "Authentic Flavours",
//     description:
//       "From Sichuan peppercorns to kaffir lime leaves — we import the real thing so every bite is a genuine cultural experience.",
//   },
//   {
//     icon: <FaClock className="text-4xl text-accent" />,
//     title: "Fast Table Service",
//     description:
//       "Scan, order, enjoy. Our QR-powered table system means your food starts cooking the moment you confirm — no waiting, no fuss.",
//   },
//   {
//     icon: <FaFire className="text-4xl text-error" />,
//     title: "Crave Originals",
//     description:
//       "Sushi Burritos, Ramen Burgers, Volcano Rice — our signature dishes exist nowhere else. Bold creativity is baked into every menu.",
//   },
//   {
//     icon: <MdDeliveryDining className="text-4xl text-info" />,
//     title: "Cosy Atmosphere",
//     description:
//       "Warm lighting, intimate seating, and a space designed to make every meal feel like a special occasion — even a Tuesday dinner.",
//   },
// ];

// const WhyChooseUs = () => {
//   return (
//     <section className="bg-base-100 py-20 px-4">
//       <div className="container mx-auto max-w-6xl">

//         {/* Section Header */}
//         <div className="text-center mb-16">
//           <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">
//             The Crave Difference
//           </p>
//           <h2 className="text-4xl md:text-5xl font-black text-base-content leading-tight">
//             Why Guests Keep
//             <span className="text-primary"> Coming Back</span>
//           </h2>
//           <div className="flex items-center justify-center gap-3 mt-5">
//             <div className="h-px w-16 bg-primary/30"></div>
//             <FaFire className="text-primary text-xl" />
//             <div className="h-px w-16 bg-primary/30"></div>
//           </div>
//         </div>

//         {/* Features Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               className="group bg-base-200 hover:bg-primary/5 border border-base-300
//                 hover:border-primary/30 rounded-2xl p-7 transition-all duration-300
//                 hover:shadow-lg hover:-translate-y-1"
//             >
//               {/* Icon circle */}
//               <div
//                 className="w-16 h-16 rounded-2xl bg-base-100 flex items-center
//                 justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300"
//               >
//                 {feature.icon}
//               </div>

//               <h3 className="text-xl font-bold text-base-content mb-2">
//                 {feature.title}
//               </h3>
//               <p className="text-base-content/60 text-sm leading-relaxed">
//                 {feature.description}
//               </p>
//             </div>
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// };

// export default WhyChooseUs;