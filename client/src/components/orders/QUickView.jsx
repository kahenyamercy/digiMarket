import React from "react";
import OrderSummarry from "./OrderSummary";
import { useDispatch } from "react-redux";
import { closeOrderModal } from "../../redux/slices/orderSlices";

const QuickView = () => {
  const dispatch = useDispatch();

  const handleModal = () => {
    dispatch(closeOrderModal());
  };
  return (
    <div className='bg-white relative'>
      <OrderSummarry isModal={true} />
      <button
        aria-label='show Menu'
        className='absolute top-4 right-4  md:top-6 md:right-6 focus:outline-none focus:ring-2  focus:ring-gray-800'
        onClick={handleModal}
      >
        <svg
          width='16'
          height='16'
          viewBox='0 0 16 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M13.3346 13.3337L2.66797 2.66699M13.3346 2.66699L2.66797 13.3337'
            stroke='#1F2937'
            strokeLinecap='square'
          />
        </svg>
      </button>
    </div>
  );
};

export default QuickView;
