import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseCartQty,
  removefromcart,
} from "../../redux/actions/cartActions";

const CartSection = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const [subTotal, setSubTotal] = useState(0);

  const handleCartQty = (id, qty, type) => {
    if (type === "dec") {
      if (qty === 1) {
        dispatch(removefromcart(id));
      }
      dispatch(decreaseCartQty(id));
    } else if (type === "inc") {
      dispatch(addToCart(id));
    }
  };

  const handleRemoveCartItem = (id) => {
    dispatch(removefromcart(id));
  };

  useEffect(() => {
    const totals = cartItems
      .reduce((itemA, itemB) => itemA + itemB?.quantity * itemB.price, 0)
      .toFixed(2);
    setSubTotal(totals);
  }, [cartItems]);
  return (
    <div className='justify-center flex-1 px-4 py-6 mx-auto max-w-7xl lg:py-4 md:px-6'>
      <div className='p-8 bg-gray-50'>
        <h2 className='mb-8 text-3xl font-bold'>
          Your Cart
        </h2>
        <div className='flex flex-wrap -mx-4'>
          <div className='w-full px-4 mb-8 xl:w-8/12 xl:mb-0'>
            <div className='flex flex-wrap items-center mb-6 -mx-4 md:mb-8'>
              <div className='w-full md:block hidden px-4 mb-6 md:w-4/6 lg:w-6/12 md:mb-0'>
                <h2 className='font-bold text-gray-500'>
                  Product name
                </h2>
              </div>
              <div className='hidden px-4 lg:block lg:w-2/12'>
                <h2 className='font-bold text-gray-500'>
                  Price
                </h2>
              </div>
              <div className='hidden md:block px-4 md:w-1/6 lg:w-2/12 '>
                <h2 className='font-bold text-gray-500'>
                  Quantity
                </h2>
              </div>
              <div className='hidden md:block px-4 text-right md:w-1/6 lg:w-2/12 '>
                <h2 className='font-bold text-gray-500'>
                  Subtotal
                </h2>
              </div>
            </div>
            <div className='py-4 mb-8 border-t border-b border-gray-200'>
              {cartItems.map((item) => {
                const { id, name, image, price, quantity } = item;
                return (
                  <div
                    className='flex flex-wrap items-center mb-6 -mx-4 md:mb-8'
                    key={id}
                  >
                    <div className='w-full px-4 mb-6 md:w-4/6 lg:w-6/12 md:mb-0'>
                      <div className='flex flex-wrap items-center -mx-4'>
                        <div className='w-full px-4 mb-3 md:w-1/3'>
                          <div className='w-full h-96 md:h-24 md:w-24'>
                            <img
                              src={image}
                              alt={name}
                              className='object-cover w-full h-full'
                            />
                          </div>
                        </div>
                        <div className='w-2/3 px-4'>
                          <h2 className='mb-2 text-xl font-bold'>{name}</h2>
                          <p className='text-red-500 italic text-xs cursor-pointer' onClick={() => handleRemoveCartItem(id)}>
                            Remove
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className='hidden px-4 lg:block lg:w-2/12'>
                      <p className='text-lg font-bold text-lime-700'>
                        KES {price}
                      </p>
                      <span className='text-xs text-gray-500 line-through'>
                        KES {price + 0.1 * price}
                      </span>
                    </div>
                    <div className='w-auto px-4 md:w-1/6 lg:w-2/12 '>
                      <div className='inline-flex items-center px-4 font-semibold text-gray-500 border border-gray-200 rounded-md'>
                        <button
                          className='py-2 hover:text-gray-700'
                          onClick={() => handleCartQty(id, quantity, "dec")}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='16'
                            fill='currentColor'
                            className='bi bi-dash'
                            viewBox='0 0 16 16'
                          >
                            <path d='M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z'></path>
                          </svg>
                        </button>
                        <input
                          type='number'
                          className='w-12 px-2 py-4 text-center border-0 rounded-md bg-gray-50 md:text-right'
                          placeholder='1'
                          value={quantity}
                        />
                        <button
                          className='py-2 hover:text-gray-700'
                          onClick={() => handleCartQty(id, quantity, "inc")}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='16'
                            fill='currentColor'
                            className='bi bi-plus'
                            viewBox='0 0 16 16'
                          >
                            <path d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z'></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className='w-auto px-4 text-right md:w-1/6 lg:w-2/12 '>
                      <p className='text-lg font-bold text-lime-700'>
                        KES {price * quantity}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className='flex flex-wrap items-center gap-4'>
              <span className='text-gray-700'>
                Apply Coupon
              </span>
              <input
                type='text'
                className='flex-1 px-8 py-4 font-normal placeholder-gray-300 border md:flex-none md:mr-6'
                placeholder='x304k45'
                required=''
              />
              <button className='flex-1 inline-block px-8 py-4 font-bold text-center text-gray-100 bg-lime-700 rounded-md hover:bg-lime-800 md:flex-none'>
                Apply
              </button>
            </div>
          </div>
          <div className='w-full px-4 xl:w-4/12'>
            <div className='p-6 border border-blue-100 bg-blue-50 md:p-8'>
              <h2 className='mb-8 text-3xl font-bold text-gray-700'>
                Cart Summary
              </h2>
              <div className='flex items-center justify-between pb-4 mb-4 border-b border-gray-300'>
                <span className='text-gray-700'>
                  Subtotal
                </span>
                <span className='text-xl font-bold text-gray-700'>
                  KES {subTotal}
                </span>
              </div>
              <div className='flex items-center justify-between pb-4 mb-4 '>
                <span className='text-gray-700'>Tax</span>
                <span className='text-xl font-bold text-gray-700'>
                  0.00
                </span>
              </div>
              <div className='flex items-center justify-between pb-4 mb-4 '>
                <span className='text-gray-700'>
                  Order Total
                </span>
                <span className='text-xl font-bold text-gray-700'>
                  KES {subTotal}
                </span>
              </div>
              <h2 className='text-lg text-gray-500'>
                We offer:
              </h2>
              <div className='flex items-center mb-4 '>
                <img
                  src='https://i.postimg.cc/g22HQhX0/70599-visa-curved-icon.png'
                  alt=''
                  className='object-cover h-16 mr-2 w-26'
                />
                <img
                  src='https://i.postimg.cc/HW38JkkG/38602-mastercard-curved-icon.png'
                  alt=''
                  className='object-cover h-16 mr-2 w-26'
                />
                <img
                  src='https://i.postimg.cc/HL57j0V3/38605-paypal-straight-icon.png'
                  alt=''
                  className='object-cover h-16 mr-2 w-26'
                />
              </div>
              <div className='flex items-center justify-between '>
                <button className='block w-full py-4 font-bold text-center text-gray-100 uppercase bg-lime-700 rounded-md hover:bg-lime-800'>
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSection;
