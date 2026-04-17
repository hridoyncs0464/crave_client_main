import { FaStar, FaQuoteLeft } from "react-icons/fa";

const reviews = [
  {
    name: "Tasnim Akter",
    location: "Dhanmondi, Dhaka",
    rating: 5,
    review:
      "The Volcano Rice is absolutely insane — watching it get flambéed at the table was a show in itself. Best dining experience I've had in Dhaka. Came back three times already!",
    foodImage:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80",
    foodLabel: "Volcano Rice",
    avatar: "TA",
    avatarColor: "bg-primary",
  },
  {
    name: "Rifat Hossain",
    location: "Uttara, Dhaka",
    rating: 5,
    review:
      "Ordered the Ramen Burger on a dare and now it's my go-to order. The noodle buns are crispy and hold everything perfectly. The QR ordering system is super smooth too.",
    foodImage:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80",
    foodLabel: "Ramen Burger",
    avatar: "RH",
    avatarColor: "bg-secondary",
  },
  {
    name: "Nusrat Jahan",
    location: "Gulshan, Dhaka",
    rating: 5,
    review:
      "Crave's Famous Ramen has the most deeply flavoured broth I've had outside Japan. The soft-boiled egg alone is worth the trip. The green tea cheesecake afterwards sealed the deal.",
    foodImage:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80",
    foodLabel: "Crave's Famous Ramen",
    avatar: "NJ",
    avatarColor: "bg-accent",
  },
]; 

const Reviews = () => {
  return (
    <section className="bg-base-200 py-20 px-4">
      <div className="container mx-auto max-w-6xl">

        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">
            Real Guests · Real Reactions
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-base-content leading-tight">
            What Our Guests
            <span className="text-primary"> Are Saying</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="h-px w-16 bg-primary/30"></div>
            <FaStar className="text-accent text-xl" />
            <div className="h-px w-16 bg-primary/30"></div>
          </div>
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="group bg-base-100 rounded-3xl overflow-hidden shadow-md
                hover:shadow-xl transition-all duration-300 hover:-translate-y-2
                border border-base-300 hover:border-primary/20 flex flex-col"
            >
              {/* Food Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={review.foodImage}
                  alt={review.foodLabel}
                  className="w-full h-full object-cover group-hover:scale-110
                    transition-transform duration-500"
                />
                {/* Food label badge */}
                <div className="absolute bottom-3 left-3">
                  <span className="bg-primary text-white text-xs font-bold
                    px-3 py-1.5 rounded-full shadow-lg">
                    {review.foodLabel}
                  </span>
                </div>
                {/* Quote icon */}
                <div className="absolute top-3 right-3 w-9 h-9 rounded-full
                  bg-black/40 flex items-center justify-center backdrop-blur-sm">
                  <FaQuoteLeft className="text-white text-sm" />
                </div>
              </div>

              {/* Review Body */}
              <div className="p-6 flex flex-col flex-1">

                {/* Stars */}
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <FaStar key={i} className="text-accent text-sm" />
                  ))}
                </div>

                {/* Review text */}
                <p className="text-base-content/70 text-sm leading-relaxed flex-1 mb-5">
                  "{review.review}"
                </p>

                {/* Reviewer info */}
                <div className="flex items-center gap-3 pt-4 border-t border-base-300">
                  <div
                    className={`w-10 h-10 rounded-full ${review.avatarColor}
                    flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}
                  >
                    {review.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-base-content text-sm">{review.name}</p>
                    <p className="text-base-content/40 text-xs">{review.location}</p>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Trust stats bar */}
        {/* <div className="mt-14 flex flex-wrap justify-center gap-8 text-center">
          {[
            { value: "5,000+", label: "Happy Guests" },
            { value: "4.9★", label: "Average Rating" },
            { value: "50+", label: "Menu Items" },
            { value: "3 yrs", label: "Serving Dhaka" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-3xl font-black text-primary">{stat.value}</span>
              <span className="text-base-content/50 text-sm mt-1">{stat.label}</span>
            </div>
          ))}
        </div> */}

      </div>
    </section>
  );
};

export default Reviews; 