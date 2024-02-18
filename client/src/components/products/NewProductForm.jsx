import React, { useState } from "react";
import ErrorMessage from "../utilComponents/ErrorMessage";

const NewProductForm = () => {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    unit: "",
    description: "",
  });
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();
  };

  return (
    <form className='w-full border rounded p-4' onSubmit={handleCreateProduct}>
      <h6 className='text-gray-600 font-semibold italic'>New Product</h6>
      {/* <LoadingSpinner /> */}
      {/* {formErr && <ErrorMessage>{formErr}</ErrorMessage>} */}
      <div className='grid md:grid-cols-9 flex gap-2'>
        <div className='col-span-1 md:col-span-3 mt-2'>
          <label
            htmlFor='product_name'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Product Name
          </label>
          <div className='mt-2'>
            <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-400 px-2'>
              <input
                type='text'
                name='name'
                value={productData.name}
                onChange={handleChange}
                id='product_name'
                className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
              />
            </div>
          </div>
        </div>
        <div className='col-span-1 md:col-span-3 mt-2'>
          <label
            htmlFor='product_price'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Price
          </label>
          <div className='mt-2'>
            <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-400 px-2'>
              <input
                type='number'
                name='price'
                value={productData.price}
                onChange={handleChange}
                id='product_price'
                className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
              />
            </div>
          </div>
        </div>
        <div className='col-span-1 md:col-span-3 mt-2'>
          <label
            htmlFor='unit'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Unit (In words)
          </label>
          <div className='mt-2'>
            <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-400 px-2'>
              <input
                type='text'
                name='unit'
                value={productData.unit}
                onChange={handleChange}
                id='unit'
                placeholder="eg. 1Kg, 70Kg bag, 1 tonne vehicle etc."
                className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='grid md:grid-cols-9 flex gap-2'>
        <div className='col-span-1 md:col-span-3 mt-2'>
          <label
            htmlFor='description'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Description
          </label>
          <div className='mt-2'>
            <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-400 px-2'>
              <textarea
                name='description'
                rows={5}
                value={productData.description}
                onChange={handleChange}
                id='description'
                className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:outline-none focus:ring-0 sm:text-sm sm:leading-6'
              ></textarea>
            </div>
          </div>
        </div>
        <div className='col-span-1 md:col-span-3 mt-2'>
          <label
            htmlFor='new_image'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Product Images
          </label>
          <div className='mt-2'>
            <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-400 px-2'>
              <input
                type='file'
                name='image'
                onChange={(e) => setImage(e.target.files[0])}
                id='new_image'
                className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
              />
            </div>
          </div>
        </div>
      </div>
      <button
        type='submit'
        className='w-72 bg-lime-400 text-white px-4 py-1 rounded my-3'
      >
        Create Product
      </button>
    </form>
  );
};

export default NewProductForm;
