import React, { useEffect } from "react";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../redux/actions/productActions";
import { addToCart } from "../../redux/actions/cartActions";

const ShopSection = () => {
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state.product);

  const handleCart = (productId) => {
    dispatch(addToCart(productId));
  };

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <section className='md:px-16 px-4 my-2'>
      <h2 className="my-2 text-gray-800 font-semibold text-2xl">All Products</h2>
      <div className='w-full grid grid-cols-1 md:grid-cols-5 gap-4 items-start'>
        {allProducts.length > 0 &&
          allProducts.map((product) => {
            return (
              <section
                class='col-span-1 p-2 border-blue-100 bg-blue-50 text-center transform duration-500 hover:-translate-y-2 cursor-pointer'
                key={product.id}
              >
                <img
                  src={product.image}
                  alt={product.img}
                  className='w-full object-cover'
                />
                <Link
                  to={`/shop/products/${product.id}`}
                  className='hover:underline'
                >
                  <h1 class='text-xl my-3'>{product.name}</h1>
                </Link>
                <p class='mb-3 text-md'>{product.description}</p>
                <h2 class='font-semibold mb-5'>KES {product.price}</h2>
                <button
                  class='p-2 px-6 bg-lime-700 text-white rounded-md hover:bg-lime-800'
                  onClick={() => handleCart(product.id)}
                >
                  Add To Cart
                </button>
              </section>
            );
          })}
      </div>
    </section>
  );
};

export default ShopSection;
