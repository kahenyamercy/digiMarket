import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listCategoryProducts } from "../redux/actions/productActions";

const CategoryShop = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const categoryId = Number(params.id);

  const {products} = useSelector((state) => state.product)


useEffect(() => {
  dispatch(listCategoryProducts(categoryId))
}, [dispatch, categoryId])
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
            <div className='p-5 md:p-0 grid grid-cols-4 gap-4 items-start'>
              {products.length > 0 &&
                products.map((product) => {
                  return (
                    <section
                      class='col-span-1 py-10 bg-purple-50 text-center transform duration-500 hover:-translate-y-2 cursor-pointer'
                      key={product.id}
                    >
                      <img
                        src={product.image}
                        alt={product.img}
                        className='w-full object-cover p-3'
                      />
                      <div class='w-full space-x-1 flex justify-center mt-10'>
                        <svg
                          class='w-4 h-4 mx-px fill-current text-orange-600'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 14 14'
                        >
                          <path d='M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z'></path>
                        </svg>
                        <svg
                          class='w-4 h-4 mx-px fill-current text-orange-600'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 14 14'
                        >
                          <path d='M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z'></path>
                        </svg>
                        <svg
                          class='w-4 h-4 mx-px fill-current text-orange-600'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 14 14'
                        >
                          <path d='M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z'></path>
                        </svg>
                        <svg
                          class='w-4 h-4 mx-px fill-current text-orange-600'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 14 14'
                        >
                          <path d='M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z'></path>
                        </svg>
                        <svg
                          class='w-4 h-4 mx-px fill-current text-gray-300'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 14 14'
                        >
                          <path d='M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z'></path>
                        </svg>
                      </div>
                      <h1 class='text-3xl my-5'>{product.name}</h1>
                      <p class='mb-5'>{product.description}</p>
                      <h2 class='font-semibold mb-5'>KES {product.price}</h2>
                      <button class='p-2 px-6 bg-purple-500 text-white rounded-md hover:bg-purple-600'>
                        Add To Cart
                      </button>
                    </section>
                  );
                })}
              {products.length === 0 && <p>No products found!</p>}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default CategoryShop;
