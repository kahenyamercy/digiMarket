import React from "react";
import CategorySection from "../components/CategorySection";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";

const Home = () => {
  return (
    <div className='w-full'>
      <Navbar />
      <section className='mt-3 md:mx-16 px-4 grid grid-cols-9 gap-2'>
        <div className='col-span-2 bg-lime-300 rounded p-4 text-green-800'>Categories</div>
        <div className='col-span-5'>
          <Carousel />
        </div>
        <div className='col-span-2 bg-lime-300 rounded p-4 text-green-800'>Others</div>
      </section>
      <CategorySection />
    </div>
  );
};

export default Home;
