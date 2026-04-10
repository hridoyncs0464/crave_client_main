import { FaFire, FaLeaf, FaClock, FaPepperHot } from "react-icons/fa";
import { GiChefToque } from "react-icons/gi";
import { MdDeliveryDining } from "react-icons/md";

const features = [
  {
    icon: <GiChefToque className="text-4xl text-primary" />,
    title: "Master Chefs",
    description:
      "Our chefs bring decades of authentic Asian culinary expertise — trained across Thailand, Japan, and Korea to deliver every dish with soul.",
  },
  {
    icon: <FaLeaf className="text-4xl text-success" />,
    title: "Fresh Ingredients",
    description:
      "Every ingredient is sourced daily from local markets. No freezer shortcuts — just honest, vibrant produce on your plate.",
  },
  {
    icon: <FaPepperHot className="text-4xl text-secondary" />,
    title: "Authentic Flavours",
    description:
      "From Sichuan peppercorns to kaffir lime leaves — we import the real thing so every bite is a genuine cultural experience.",
  },
  {
    icon: <FaClock className="text-4xl text-accent" />,
    title: "Fast Table Service",
    description:
      "Scan, order, enjoy. Our QR-powered table system means your food starts cooking the moment you confirm — no waiting, no fuss.",
  },
  {
    icon: <FaFire className="text-4xl text-error" />,
    title: "Crave Originals",
    description:
      "Sushi Burritos, Ramen Burgers, Volcano Rice — our signature dishes exist nowhere else. Bold creativity is baked into every menu.",
  },
  {
    icon: <MdDeliveryDining className="text-4xl text-info" />,
    title: "Cosy Atmosphere",
    description:
      "Warm lighting, intimate seating, and a space designed to make every meal feel like a special occasion — even a Tuesday dinner.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-base-100 py-20 px-4">
      <div className="container mx-auto max-w-6xl">

        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">
            The Crave Difference
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-base-content leading-tight">
            Why Guests Keep
            <span className="text-primary"> Coming Back</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="h-px w-16 bg-primary/30"></div>
            <FaFire className="text-primary text-xl" />
            <div className="h-px w-16 bg-primary/30"></div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-base-200 hover:bg-primary/5 border border-base-300
                hover:border-primary/30 rounded-2xl p-7 transition-all duration-300
                hover:shadow-lg hover:-translate-y-1"
            >
              {/* Icon circle */}
              <div
                className="w-16 h-16 rounded-2xl bg-base-100 flex items-center
                justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300"
              >
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold text-base-content mb-2">
                {feature.title}
              </h3>
              <p className="text-base-content/60 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;