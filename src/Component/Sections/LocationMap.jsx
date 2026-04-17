import React from "react";

const LocationMap = () => {
  return (
    <div className="bg-base-200 py-16 px-4 md:px-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        
        {/* LEFT SIDE - INFO */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Visit Crave Restaurant
          </h2>

          <p className="text-base-content/70 mb-6">
            Experience the taste of Asia right in your neighborhood. 
            Visit us for a cozy dining experience or reserve your table online.
          </p>

          <div className="space-y-3">
            <p><span className="font-semibold">📍 Address:</span> Dhanmondi, Dhaka, Bangladesh</p>
            <p><span className="font-semibold">📞 Phone:</span> +880 1234-567890</p>
            <p><span className="font-semibold">⏰ Hours:</span> 11:00 AM – 11:00 PM</p>
          </div>

          <div className="mt-6">
            <a href="/reservations" className="btn btn-primary">
              Reserve a Table
            </a>
          </div>
        </div>

        {/* RIGHT SIDE - MAP */}
        <div className="w-full h-[350px] md:h-[450px] rounded-xl overflow-hidden shadow-lg">
<iframe
  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1823.5047313199832!2d90.26367600000002!3d23.924718999999993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjPCsDU1JzI5LjAiTiA5MMKwMTUnNDkuMiJF!5e0!3m2!1sen!2sbd!4v1776401702835!5m2!1sen!2sbd"
  width="600"
  height="450"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  className="w-full h-full"
></iframe>        </div>

      </div>
    </div>
  );
};

export default LocationMap;   