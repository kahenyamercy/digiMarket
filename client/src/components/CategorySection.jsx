import React from 'react'
import { Link } from 'react-router-dom';

const CategorySection = () => {
  return (
    <div className='mx-4 md:mx-16 p-4 mt-3 bg-slate-100'>
      <div className='flex justify-between mx-4'>
        <h2 className='font-semibold text-xl pb-3'>All Categories</h2>
        <h2 className='font-semibold text-xl pb-3'>View More</h2>
      </div>
      <div className='grid grid-cols-6'>
        <Link to={`/shop/category/2`} className='col-span-1 h-40 border border-white mx-2 bg-white rounded-lg cursor-pointer'>
          <img
            src='https://thumbs2.imgbox.com/02/6b/KbXCFtrf_t.jpeg'
            alt='Fruits'
            className='p-2 w-full h-32 object-cover'
          />
          <h4 className='text-center text-gray-800 font-semibold text-lg'>
            Fruits
          </h4>
        </Link>
      </div>
    </div>
  );
}

export default CategorySection