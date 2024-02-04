import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux"
import { listCategories } from '../redux/actions/categoryActions';

const CategorySection = () => {
  const dispatch = useDispatch()
  const {loading, error, categoryList}= useSelector((state) => state.category);
  
  useEffect(() => {
    dispatch(listCategories())
  }, [])

  console.log(categoryList)
  return (
    <div className='mx-4 md:mx-16 p-4 mt-3 bg-slate-100'>
      <div className='flex justify-between mx-4'>
        {error && <p className='text-red'>{error}</p>}
        {loading && <p className='text-amber-400'>Loading...</p>}
        <h2 className='font-semibold text-xl pb-3'>All Categories</h2>
        <h2 className='font-semibold text-xl pb-3'>View More</h2>
      </div>
      <div className='grid grid-cols-6'>
        {
          categoryList.map((category) => {
            return (
              <Link
                to={`/shop/category/${category.id}`}
                className='col-span-1 h-40 border border-white m-2 bg-white rounded-lg cursor-pointer'
                key={category.id}
              >
                <img
                  src={category.image}
                  alt='Fruits'
                  className='p-2 w-full h-32 object-cover'
                />
                <h4 className='text-center text-gray-800 font-semibold text-lg'>
                  {category.name}
                </h4>
              </Link>
            );
          })
        }
      </div>
    </div>
  );
}

export default CategorySection