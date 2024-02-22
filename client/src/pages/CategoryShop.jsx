import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listCategoryProducts } from "../redux/actions/productActions";
import { addToCart } from "../redux/actions/cartActions";

const CategoryShop = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const categoryId = Number(params.id);

  const { products } = useSelector((state) => state.product);

  const handleCart = (productId) => {
    dispatch(addToCart(productId));
  };

  useEffect(() => {
    dispatch(listCategoryProducts(categoryId));
  }, [dispatch, categoryId]);
  return (
    <div>
      <Navbar />
      <section>
        <div className='grid grid-cols-6 mt-3 px-12'>
          <div className='col-span-1 h-screen mr-4'>
            <div class='w-full px-4 py-4'>
              <div class='p-4 mb-5 bg-white border border-gray-200 dark:border-gray-900 dark:bg-gray-900'>
                <h2 class='text-2xl font-bold dark:text-gray-400'>
                  {" "}
                  Categories
                </h2>
                <div class='w-16 pb-2 mb-6 border-b border-rose-600 dark:border-gray-400'></div>
                <ul>
                  <li class='mb-4'>
                    <label for='' class='flex items-center dark:text-gray-400 '>
                      <input type='checkbox' class='w-4 h-4 mr-2' />
                      <span class='text-lg'>Biscuits</span>
                    </label>
                  </li>
                  <li class='mb-4'>
                    <label for='' class='flex items-center dark:text-gray-400 '>
                      <input type='checkbox' class='w-4 h-4 mr-2 ' />
                      <span class='text-lg'>Fruits</span>
                    </label>
                  </li>
                  <li class='mb-4'>
                    <label for='' class='flex items-center dark:text-gray-400'>
                      <input type='checkbox' class='w-4 h-4 mr-2' />
                      <span class='text-lg'>Seafood</span>
                    </label>
                  </li>
                  <li class='mb-4'>
                    <label for='' class='flex items-center dark:text-gray-400'>
                      <input type='checkbox' class='w-4 h-4 mr-2' />
                      <span class='text-lg'>Vegetables</span>
                    </label>
                  </li>
                  <li class='mb-4'>
                    <label for='' class='flex items-center dark:text-gray-400'>
                      <input type='checkbox' class='w-4 h-4 mr-2' />
                      <span class='text-lg'>Frozen Foods &amp; Staples</span>
                    </label>
                  </li>
                </ul>
              </div>
              <div class='p-4 mb-5 bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-900'>
                <h2 class='text-2xl font-bold dark:text-gray-400'>
                  Product Status
                </h2>
                <div class='w-16 pb-2 mb-6 border-b border-rose-600 dark:border-gray-400'></div>
                <ul>
                  <li class='mb-4'>
                    <label for='' class='flex items-center dark:text-gray-300'>
                      <input type='checkbox' class='w-4 h-4 mr-2' />
                      <span class='text-lg dark:text-gray-400'>In Stock</span>
                    </label>
                  </li>
                  <li class='mb-4'>
                    <label for='' class='flex items-center dark:text-gray-300'>
                      <input type='checkbox' class='w-4 h-4 mr-2' />
                      <span class='text-lg dark:text-gray-400'>On Sale</span>
                    </label>
                  </li>
                </ul>
              </div>
              <div class='p-4 mb-5 bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-900'>
                <h2 class='text-2xl font-bold dark:text-gray-400'>Brand</h2>
                <div class='w-16 pb-2 mb-6 border-b border-rose-600 dark:border-gray-400'></div>
                <ul>
                  <li class='mb-4'>
                    <label for='' class='flex items-center dark:text-gray-300'>
                      <input type='checkbox' class='w-4 h-4 mr-2' />
                      <span class='text-lg dark:text-gray-400'>Apple</span>
                    </label>
                  </li>
                  <li class='mb-4'>
                    <label for='' class='flex items-center dark:text-gray-300'>
                      <input type='checkbox' class='w-4 h-4 mr-2' />
                      <span class='text-lg dark:text-gray-400'>Oreo</span>
                    </label>
                  </li>
                  <li class='mb-4'>
                    <label for='' class='flex items-center dark:text-gray-300'>
                      <input type='checkbox' class='w-4 h-4 mr-2' />
                      <span class='text-lg dark:text-gray-400'>Mango</span>
                    </label>
                  </li>
                  <li class='mb-4'>
                    <label for='' class='flex items-center dark:text-gray-300'>
                      <input type='checkbox' class='w-4 h-4 mr-2' />
                      <span class='text-lg dark:text-gray-400'>Nebico</span>
                    </label>
                  </li>
                </ul>
              </div>
              <div class='p-4 mb-5 bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-900'>
                <h2 class='text-2xl font-bold dark:text-gray-400'>Price</h2>
                <div class='w-16 pb-2 mb-6 border-b border-rose-600 dark:border-gray-400'></div>
                <div>
                  <input
                    type='range'
                    class='w-full h-1 mb-4 bg-blue-100 rounded appearance-none cursor-pointer'
                    max='100'
                    value='50'
                  />
                  <div class='flex justify-between '>
                    <span class='inline-block text-lg font-bold text-blue-400 '>
                      $1
                    </span>
                    <span class='inline-block text-lg font-bold text-blue-400 '>
                      $500
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <section class='col-span-5 py-4'>
            {products.length === 0 && (
              <div className='p-6 border border-blue-100 bg-blue-50 md:p-8'>
                <h6 className='text-gray-600'>
                  No product matches that category!
                  <Link
                    to='/'
                    className='text-lime-700 font-semibold underline'
                  >
                    Go Back to Shop
                  </Link>
                </h6>
              </div>
            )}
            <div className='p-5 md:p-0 grid grid-cols-4 gap-4 items-start'>
              {products.length > 0 &&
                products.map((product) => {
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
        </div>
      </section>
    </div>
  );
};

export default CategoryShop;
