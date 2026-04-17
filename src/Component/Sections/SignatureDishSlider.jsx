import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronRight, FaChevronLeft, FaFire } from "react-icons/fa";

// Data
const signatureDishes = [
  {
    id: 1,
    name: "Truffle Wagyu Ramen",
    price: "৳850",
    description:
      "24-hour slow-cooked bone broth, A5 Wagyu slices, and shaved black truffle with handmade noodles.",
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=1200",
    tag: "Chef's Signature",
  },
  {
    id: 2,
    name: "Golden Dragon Roll",
    price: "৳720",
    description:
      "Crispy tempura shrimp topped with fresh mango, avocado, and spicy unagi glaze.",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=1200",
    tag: "Trending",
  },
  {
    id: 3,
    name: "Sichuan Fire Wok",
    price: "৳650",
    description:
      "Hand-pulled noodles tossed in fermented chili oil with crispy garlic and charred bok choy.",
    image:
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=1200",
    tag: "Spicy",
  },
];

const SignatureDishSlider = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
    }),
  };

  const nextStep = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % signatureDishes.length);
  };

  const prevStep = () => {
    setDirection(-1);
    setIndex(
      (prev) => (prev - 1 + signatureDishes.length) % signatureDishes.length,
    );
  };

  return (
    <section className="bg-base-100 py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-black text-center mb-10 text-base-content">
          Don't Miss <span className="text-primary">It</span>
        </h1>

        {/* CARD */}
        <div className="relative h-[650px] md:h-[750px] rounded-3xl overflow-hidden border border-base-300 shadow-[0_10px_40px_rgba(0,0,0,0.08)] bg-base-100">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
              }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Background */}
              <div className="absolute inset-0 z-0">
                <motion.img
                  src={signatureDishes[index].image}
                  className="w-full h-full object-cover opacity-40"
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1.05 }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />

                {/* LIGHT OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-r from-base-100 via-base-100/90 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-base-100/80 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full px-6 md:px-16 flex items-center">
                <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
                  {/* LEFT */}
                  <div className="max-w-xl">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.3em] text-sm mb-6"
                    >
                      <FaFire className="text-xl" />
                      {signatureDishes[index].tag}
                    </motion.div>

                    <motion.h2
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-5xl md:text-7xl font-black text-base-content mb-6"
                    >
                      {signatureDishes[index].name}
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="text-lg md:text-xl text-base-content/70 mb-10 italic border-l-4 border-primary pl-6"
                    >
                      "{signatureDishes[index].description}"
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="flex items-center gap-8"
                    >
                      <span className="text-3xl md:text-4xl font-bold text-primary">
                        {signatureDishes[index].price}
                      </span>

                      <button className="btn btn-primary rounded-full px-8">
                        Explore Dish
                      </button>
                    </motion.div>
                  </div>

                  {/* RIGHT IMAGE */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="hidden lg:flex justify-center"
                  >
                    <div className="relative">
                      <div className="absolute -inset-10 bg-primary/10 blur-[100px] rounded-full" />
                      <img
                        src={signatureDishes[index].image}
                        className="w-[420px] h-[420px] object-cover rounded-full border-[12px] border-base-300 shadow-xl"
                        alt="dish"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* NAV BUTTONS */}
          <div className="absolute bottom-10 right-10 flex gap-4 z-20">
            <button
              onClick={prevStep}
              className="w-12 h-12 border border-base-300 rounded-full flex items-center justify-center text-base-content hover:bg-base-200"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={nextStep}
              className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white"
            >
              <FaChevronRight />
            </button>
          </div>

          {/* INDICATORS */}
          <div className="absolute bottom-10 left-10 hidden md:flex gap-3 z-20">
            {signatureDishes.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === index ? "w-12 bg-primary" : "w-4 bg-base-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignatureDishSlider;

// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaChevronRight, FaChevronLeft, FaFire } from "react-icons/fa";

// // Data
// const signatureDishes = [
//   {
//     id: 1,
//     name: "Truffle Wagyu Ramen",
//     price: "৳850",
//     description: "24-hour slow-cooked bone broth, A5 Wagyu slices, and shaved black truffle with handmade noodles.",
//     image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=1200",
//     tag: "Chef's Signature"
//   },
//   {
//     id: 2,
//     name: "Golden Dragon Roll",
//     price: "৳720",
//     description: "Crispy tempura shrimp topped with fresh mango, avocado, and spicy unagi glaze.",
//     image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=1200",
//     tag: "Trending"
//   },
//   {
//     id: 3,
//     name: "Sichuan Fire Wok",
//     price: "৳650",
//     description: "Hand-pulled noodles tossed in fermented chili oil with crispy garlic and charred bok choy.",
//     image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=1200",
//     tag: "Spicy"
//   }
// ];

// const SignatureDishSlider = () => {
//   const [index, setIndex] = useState(0);
//   const [direction, setDirection] = useState(0);

//   const slideVariants = {
//     enter: (direction) => ({
//       x: direction > 0 ? 500 : -500,
//       opacity: 0,
//       scale: 0.9
//     }),
//     center: {
//       zIndex: 1,
//       x: 0,
//       opacity: 1,
//       scale: 1
//     },
//     exit: (direction) => ({
//       zIndex: 0,
//       x: direction < 0 ? 500 : -500,
//       opacity: 0,
//       scale: 0.9
//     })
//   };

//   const nextStep = () => {
//     setDirection(1);
//     setIndex((prevIndex) => (prevIndex + 1) % signatureDishes.length);
//   };

//   const prevStep = () => {
//     setDirection(-1);
//     setIndex((prevIndex) => (prevIndex - 1 + signatureDishes.length) % signatureDishes.length);
//   };

//   return (
//    <section className="bg-base-100 py-16">

//       <div className="max-w-7xl mx-auto px-4 md:px-8">

//         {/* Heading */}
//         <h1 className="text-4xl md:text-6xl font-black text-center mb-10 text-white">
//           DO IT <span className="text-primary">RIGHT</span>
//         </h1>

//         {/* CARD UI CONTAINER */}
//         <div className="relative h-[650px] md:h-[750px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.6)] bg-black">

//           <AnimatePresence initial={false} custom={direction}>
//             <motion.div
//               key={index}
//               custom={direction}
//               variants={slideVariants}
//               initial="enter"
//               animate="center"
//               exit="exit"
//               transition={{
//                 x: { type: "spring", stiffness: 300, damping: 30 },
//                 opacity: { duration: 0.4 }
//               }}
//               className="absolute inset-0 w-full h-full"
//             >

//               {/* Background */}
//               <div className="absolute inset-0 z-0">
//                 <motion.img
//                   initial={{ scale: 1.2, rotate: 1 }}
//                   animate={{ scale: 1.05, rotate: 0 }}
//                   transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
//                   src={signatureDishes[index].image}
//                   className="w-full h-full object-cover opacity-50 grayscale-[20%]"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
//               </div>

//               {/* Content */}
//               <div className="relative z-10 h-full px-6 md:px-16 flex items-center">
//                 <div className="grid lg:grid-cols-2 gap-12 items-center w-full">

//                   <div className="max-w-xl">
//                     <motion.div
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.3 }}
//                       className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.3em] text-sm mb-6"
//                     >
//                       <FaFire className="text-xl" />
//                       {signatureDishes[index].tag}
//                     </motion.div>

//                     <motion.h2
//                       initial={{ opacity: 0, x: -50 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.4, duration: 0.8 }}
//                       className="text-5xl md:text-7xl font-black text-white leading-none mb-6"
//                     >
//                       {signatureDishes[index].name}
//                     </motion.h2>

//                     <motion.p
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ delay: 0.6 }}
//                       className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed italic border-l-4 border-primary pl-6"
//                     >
//                       "{signatureDishes[index].description}"
//                     </motion.p>

//                     <motion.div
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.8 }}
//                       className="flex items-center gap-8"
//                     >
//                       <span className="text-3xl md:text-4xl font-bold text-primary">
//                         {signatureDishes[index].price}
//                       </span>
//                       <button className="bg-primary text-white px-8 py-3 rounded-full hover:scale-105 transition">
//                         Explore Dish
//                       </button>
//                     </motion.div>
//                   </div>

//                   {/* Right Image */}
//                   <motion.div
//                     initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
//                     animate={{ opacity: 1, scale: 1, rotate: 0 }}
//                     transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
//                     className="hidden lg:flex justify-center"
//                   >
//                     <div className="relative">
//                       <div className="absolute -inset-10 bg-primary/20 blur-[100px] rounded-full" />
//                       <img
//                         src={signatureDishes[index].image}
//                         className="w-[420px] h-[420px] object-cover rounded-full border-[14px] border-white/10 shadow-2xl"
//                         alt="Featured item"
//                       />
//                     </div>
//                   </motion.div>

//                 </div>
//               </div>
//             </motion.div>
//           </AnimatePresence>

//           {/* Buttons */}
//           <div className="absolute bottom-10 right-10 flex gap-4 z-20">
//             <button
//               onClick={prevStep}
//               className="w-12 h-12 border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/10"
//             >
//               <FaChevronLeft />
//             </button>
//             <button
//               onClick={nextStep}
//               className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white"
//             >
//               <FaChevronRight />
//             </button>
//           </div>

//           {/* Indicators */}
//           <div className="absolute bottom-10 left-10 hidden md:flex gap-3 z-20">
//             {signatureDishes.map((_, i) => (
//               <div
//                 key={i}
//                 className={`h-1.5 rounded-full transition-all duration-500 ${
//                   i === index ? "w-12 bg-primary" : "w-4 bg-white/20"
//                 }`}
//               />
//             ))}
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default SignatureDishSlider;

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaChevronRight, FaChevronLeft, FaFire } from "react-icons/fa";

// // Data using high-quality Unsplash images for a premium feel
// const signatureDishes = [
//   {
//     id: 1,
//     name: "Truffle Wagyu Ramen",
//     price: "৳850",
//     description: "24-hour slow-cooked bone broth, A5 Wagyu slices, and shaved black truffle with handmade noodles.",
//     image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=1200",
//     tag: "Chef's Signature"
//   },
//   {
//     id: 2,
//     name: "Golden Dragon Roll",
//     price: "৳720",
//     description: "Crispy tempura shrimp topped with fresh mango, avocado, and spicy unagi glaze.",
//     image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=1200",
//     tag: "Trending"
//   },
//   {
//     id: 3,
//     name: "Sichuan Fire Wok",
//     price: "৳650",
//     description: "Hand-pulled noodles tossed in fermented chili oil with crispy garlic and charred bok choy.",
//     image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=1200",
//     tag: "Spicy"
//   }
// ];

// const SignatureDishSlider = () => {
//   const [index, setIndex] = useState(0);
//   const [direction, setDirection] = useState(0);

//   const slideVariants = {
//     enter: (direction) => ({
//       x: direction > 0 ? 500 : -500,
//       opacity: 0,
//       scale: 0.9
//     }),
//     center: {
//       zIndex: 1,
//       x: 0,
//       opacity: 1,
//       scale: 1
//     },
//     exit: (direction) => ({
//       zIndex: 0,
//       x: direction < 0 ? 500 : -500,
//       opacity: 0,
//       scale: 0.9
//     })
//   };

//   const nextStep = () => {
//     setDirection(1);
//     setIndex((prevIndex) => (prevIndex + 1) % signatureDishes.length);
//   };

//   const prevStep = () => {
//     setDirection(-1);
//     setIndex((prevIndex) => (prevIndex - 1 + signatureDishes.length) % signatureDishes.length);
//   };

//   return (
//     <section className="relative h-[650px] md:h-[750px] bg-neutral overflow-hidden">
//       <AnimatePresence initial={false} custom={direction}>
//         <motion.div
//           key={index}
//           custom={direction}
//           variants={slideVariants}
//           initial="enter"
//           animate="center"
//           exit="exit"
//           transition={{
//             x: { type: "spring", stiffness: 300, damping: 30 },
//             opacity: { duration: 0.4 }
//           }}
//           className="absolute inset-0 w-full h-full"
//         >
//           {/* Parallax Background with Gradients */}
//           <div className="absolute inset-0 z-0">
//             <motion.img
//               initial={{ scale: 1.2, rotate: 1 }}
//               animate={{ scale: 1.05, rotate: 0 }}
//               transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
//               src={signatureDishes[index].image}
//               className="w-full h-full object-cover opacity-50 grayscale-[20%]"
//             />
//             <div className="absolute inset-0 bg-gradient-to-r from-neutral via-neutral/80 to-transparent" />
//             <div className="absolute inset-0 bg-gradient-to-t from-neutral to-transparent opacity-60" />
//           </div>

//           {/* Content Layer */}
//           <div className="relative z-10 container mx-auto h-full px-6 flex items-center">
//             <div className="grid lg:grid-cols-2 gap-12 items-center w-full">

//               <div className="max-w-xl">
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.3 }}
//                   className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.3em] text-sm mb-6"
//                 >
//                   <FaFire className="text-xl" />
//                   {signatureDishes[index].tag}
//                 </motion.div>

//                 <motion.h2
//                   initial={{ opacity: 0, x: -50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 0.4, duration: 0.8 }}
//                   className="text-6xl md:text-8xl font-black text-white leading-none mb-6"
//                 >
//                   {signatureDishes[index].name}
//                 </motion.h2>

//                 <motion.p
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.6 }}
//                   className="text-xl text-neutral-content/80 mb-10 leading-relaxed italic border-l-4 border-primary pl-6"
//                 >
//                   "{signatureDishes[index].description}"
//                 </motion.p>

//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.8 }}
//                   className="flex items-center gap-8"
//                 >
//                   <span className="text-4xl font-bold text-accent">{signatureDishes[index].price}</span>
//                   <button className="btn btn-primary btn-lg rounded-full px-12 shadow-2xl hover:scale-105 transition-transform">
//                     Explore Dish
//                   </button>
//                 </motion.div>
//               </div>

//               {/* Parallax Floating Plate Image */}
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
//                 animate={{ opacity: 1, scale: 1, rotate: 0 }}
//                 transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
//                 className="hidden lg:flex justify-center"
//               >
//                 <div className="relative">
//                   <div className="absolute -inset-10 bg-primary/20 blur-[100px] rounded-full" />
//                   <img
//                     src={signatureDishes[index].image}
//                     className="w-[450px] h-[450px] object-cover rounded-full border-[16px] border-white/5 shadow-2xl"
//                     alt="Featured item"
//                   />
//                 </div>
//               </motion.div>

//             </div>
//           </div>
//         </motion.div>
//       </AnimatePresence>

//       {/* Navigation Controls */}
//       <div className="absolute bottom-12 left-1/2 -translate-x-1/2 md:left-auto md:right-20 md:translate-x-0 z-30 flex gap-6">
//         <button
//           onClick={prevStep}
//           className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all group"
//         >
//           <FaChevronLeft className="group-hover:-translate-x-1 transition-transform" />
//         </button>
//         <button
//           onClick={nextStep}
//           className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white shadow-xl hover:bg-primary-focus transition-all group"
//         >
//           <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
//         </button>
//       </div>

//       {/* Progress Indicators */}
//       <div className="absolute bottom-12 left-20 hidden md:flex gap-3 z-30">
//         {signatureDishes.map((_, i) => (
//           <div
//             key={i}
//             className={`h-1.5 transition-all duration-500 rounded-full ${i === index ? 'w-12 bg-primary' : 'w-4 bg-white/20'}`}
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default SignatureDishSlider;
