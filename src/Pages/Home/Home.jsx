import React from 'react';
import Banner from '../../Component/Header/Banner';
import Categories from '../../Component/Categories/Categories';
import WhyChooseUs from '../../Component/Sections/Whychooseus';
import Reviews from '../../Component/Sections/Reviews';
import LocationMap from '../../Component/Sections/LocationMap';
import SignatureDishSlider from '../../Component/Sections/SignatureDishSlider';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <SignatureDishSlider /> 
            <Categories></Categories>
          <WhyChooseUs></WhyChooseUs>
          <Reviews></Reviews>
          <LocationMap/>
        </div>
    );
};

export default Home;