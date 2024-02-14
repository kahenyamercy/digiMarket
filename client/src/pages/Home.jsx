import React from "react";
import CategorySection from "../components/CategorySection";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import CheckIcon from "@mui/icons-material/Check";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import LoyaltyIcon from "@mui/icons-material/Loyalty";

const Home = () => {
  const { categoryList } = useSelector(
    (state) => state.category
  );
  return (
    <div className='w-full'>
      <Navbar />
      <section className='mt-3 md:mx-16 px-4 grid grid-cols-1 md:grid-cols-9 gap-2'>
        <div className='col-span-1 md:col-span-2 mobile-hide bg-lime-700 shadow rounded p-4 text-white'>
          <h2 className='uppercase text-xl border-b'>Categories</h2>
          {categoryList.map((category) => {
            return (
              <Link
                to={`/shop/category/${category.id}`}
                className='flex gap-2 items-center py-1 hover:underline'
                key={category.id}
              >
                <CheckIcon />
                <h6>{category.name}</h6>
              </Link>
            );
          })}
        </div>
        <div className='col-span-1 md:col-span-5'>
          <Carousel />
        </div>
        <div className='col-span-1 md:col-span-2 bg-lime-300 rounded py-4 px-2'>
          <div className='bg-white p-2 rounded'>
            <div className='flex gap-3 items-center mt-3'>
              <HelpOutlineIcon
                className='text-gray-600'
                style={{ fontSize: "32px" }}
              />
              <div>
                <h6 className='uppercase text-sm text-gray-600'>Help Center</h6>
                <p className='text-sm text-gray-400'>Guide to help center</p>
              </div>
            </div>
            <div className='flex gap-3 items-center mt-3'>
              <AgricultureIcon
                className='text-gray-600'
                style={{ fontSize: "36px" }}
              />
              <div>
                <h6 className='uppercase text-sm text-gray-600'>
                  Farmer's Choice
                </h6>
                <p className='text-sm text-gray-400'>
                  Helping farmer find market
                </p>
              </div>
            </div>
            <div className='flex gap-3 items-center mt-3'>
              <LoyaltyIcon
                className='text-gray-600'
                style={{ fontSize: "36px" }}
              />
              <div>
                <h6 className='uppercase text-sm text-gray-600'>
                  Wholesalers Market
                </h6>
                <p className='text-sm text-gray-400'>
                  Helping wholesalers get farm products
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-2 rounded mt-2 text-gray-800 flex flex-col items-center justify-center uppercase py-5">
            <h3>Call or Whatsapp</h3>
            <h1 className="font-semibold">0740924507 / 0768805755</h1>
            <h3>To Know more</h3>
          </div>
        </div>
      </section>
      <CategorySection />
    </div>
  );
};

export default Home;
