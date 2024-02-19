import React from "react";
import "./Modal.css";
import { useSelector } from "react-redux";

function Modal({ children }) {
  const { isOrderModalOpen, orderOpened } = useSelector((state) => state.order);

  console.log(orderOpened);

  return (
    <div>
      {isOrderModalOpen && (
        <div className='modal-overlay w-full'>
          <div className='modal-content bg-white'>{children}</div>
        </div>
      )}
    </div>
  );
}

export default Modal;
