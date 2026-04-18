import React from "react";
import Banner from "../../Component/Header/Banner";
import Categories from "../../Component/Categories/Categories";
import Reviews from "../../Component/Sections/Reviews";
import LocationMap from "../../Component/Sections/LocationMap";
import SignatureDishSlider from "../../Component/Sections/SignatureDishSlider";
import WhyChooseUs from "../../Component/Sections/WhyChooseUs";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <SignatureDishSlider />
      <Categories></Categories>
      <WhyChooseUs></WhyChooseUs>
      <Reviews></Reviews>
      <LocationMap />
    </div>
  );
};

export default Home;
 