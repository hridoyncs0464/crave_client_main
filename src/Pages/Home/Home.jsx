import React from 'react';
import Banner from '../../Component/Header/Banner';
import Footer from '../../Component/Footer';
import Categories from '../../Component/Categories/Categories';
import WhyChooseUs from '../../Component/Sections/Whychooseus';
import Reviews from '../../Component/Sections/Reviews';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Categories></Categories>
          <WhyChooseUs></WhyChooseUs>
          <Reviews></Reviews>
            <Footer></Footer>
        </div>
    );
};

export default Home;