import React from 'react'
import SingleProduct from '../components/products/SingleProduct'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const ProductPage = () => {
  return (
    <main>
      <Navbar />
      <SingleProduct />
      <Footer />
    </main>
  );
}

export default ProductPage