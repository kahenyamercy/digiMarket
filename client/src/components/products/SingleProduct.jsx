import React, { useEffect } from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../redux/actions/productActions";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../utilComponents/LoadingSpinner";
import ErrorMessage from "../utilComponents/ErrorMessage";
import { getUserInfo } from "../../redux/actions/userActions";
import { addToCart } from "../../redux/actions/cartActions";

const SingleProduct = () => {
  const params = useParams();
  const productId = Number(params.id);
  const dispatch = useDispatch();
  const {loading, error, product} = useSelector((state) => state.product);
  const {loading: userLoading, error: userError, userDetails} = useSelector((state) => state.user)

  const handleCart = () => {
    dispatch(addToCart(productId));
  }

  useEffect(() => {
    dispatch(getProduct(productId))
  }, [dispatch, productId])

  useEffect(() => {
      dispatch(getUserInfo(product?.user_id))
  }, [dispatch, product])

  return (
    <div className='bg-white py-8'>
      {loading ? (
        <LoadingSpinner />
      ) : (
        error && <ErrorMessage>{error}</ErrorMessage>
      )}
      {userLoading ? (
        <LoadingSpinner />
      ) : (
        userError && <ErrorMessage>{userError}</ErrorMessage>
      )}
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col md:flex-row -mx-4'>
          <div className='md:flex-1 px-4'>
            <div className='h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4'>
              <img
                className='w-full h-full object-cover'
                src={product.image}
                alt={product.name}
              />
            </div>
            <div className='flex -mx-2 mb-4'>
              <div className='w-1/2 px-2'>
                <button className='w-full bg-lime-700 text-white py-2 px-4 rounded-full font-bold hover:bg-green-500 dark:hover:bg-gray-700' onClick={handleCart}>
                  Add to Cart
                </button>
              </div>
              <div className='w-1/2 px-2'>
                <button className='w-full bg-gray-200 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600'>
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
          <div className='md:flex-1 px-4'>
            <h2 className='text-2xl font-bold text-gray-800 dark:text-white mb-2'>
              {product.name}
            </h2>
            <div className='flex items-center my-2 gap-2'>
              <span className='font-bold text-gray-700 dark:text-gray-300'>
                Categories
              </span>
              {product.categories?.map((category) => {
                return (
                  <button
                    className='bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600'
                    key={category.id}
                  >
                    {category.name}
                  </button>
                );
              })}
            </div>
            <div className='flex mb-4'>
              <div className='mr-4'>
                <span className='font-bold text-gray-700 dark:text-gray-300'>
                  Price:
                </span>
                <span className='text-lime-700 dark:text-gray-300 ml-2'>
                  {" "}
                  KES {product.price}
                </span>
              </div>
              <div>
                <span className='font-bold text-gray-700 dark:text-gray-300'>
                  Location:
                </span>
                <span className='text-gray-600 ml-2'>
                  {userDetails?.address?.town} town,{" "}
                  {userDetails?.address?.county} county
                </span>
              </div>
            </div>
            <div className='mb-4'>
              <span className='font-bold text-gray-700 dark:text-gray-300'>
                Select Quantity:
              </span>
              <div className='flex items-center mt-2'>
                <button className='bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600'>
                  1
                </button>
                <button className='bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600'>
                  2
                </button>
                <button className='bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600'>
                  3
                </button>
                <button className='bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600'>
                  4
                </button>
                <button className='bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600'>
                  5
                </button>
              </div>
            </div>
            <div className='mb-4'>
              <span className='font-bold text-gray-700 dark:text-gray-300'>
                Product Description:
              </span>
              <p className='text-gray-600 dark:text-gray-300 text-sm mt-2'>
                {product.description}
              </p>
            </div>
            <section className='grid grid-cols-1 md:grid-cols-6'>
              <div className='col-span-1 md:col-span-4'>
                <span className='font-bold text-gray-700 dark:text-gray-300'>
                  Farmer Information:
                </span>
                <div className='border my-3 rounded px-4 flex flex-col py-3'>
                  <h6 className='text-start italic'>Location</h6>
                  <div className='flex gap-3'>
                    <h6 className='font-semibold'>Farmer's Name</h6>
                    <p className='text-gray-600'>{userDetails.full_name}</p>
                  </div>
                  <div className='flex gap-3'>
                    <h6 className='font-semibold'>County</h6>
                    <p className='text-gray-600'>
                      {userDetails?.address?.county}
                    </p>
                  </div>
                  <div className='flex gap-3'>
                    <h6 className='font-semibold'>Town</h6>
                    <p className='text-gray-600'>
                      {userDetails?.address?.town}
                    </p>
                  </div>
                  <div className='flex gap-3'>
                    <h6 className='font-semibold'>Village</h6>
                    <p className='text-gray-600'>
                      {userDetails?.address?.village}
                    </p>
                  </div>
                </div>
              </div>
              <div className='col-span-1 md:col-span-2 text-lime-700 flex md:flex-col gap-3 md:justify-center items-center'>
                <PhoneIcon
                  className='text-lime-700'
                  style={{ fontSize: "42px", zIndex: 1 }}
                />
                <h1 className='text-2xl font-semibold'>
                  {userDetails.phone_number}
                </h1>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
