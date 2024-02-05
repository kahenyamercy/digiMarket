import React from "react";
import CategorySection from "../components/CategorySection";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className='w-full'>
      <Navbar />
      <CategorySection />
    </div>
  );
};

export default Home;
