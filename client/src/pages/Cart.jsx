import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartSection from "../components/cart/CartSection";
import Toast from "../components/utilComponents/Toast";

const Cart = () => {
  return (
    <div className='w-full bg-gray-100'>
      <Toast />
      <Navbar />
      <div className='w-full md:w-10/12 md:mx-auto my-4'>
        <CartSection />
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
