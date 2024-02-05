import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/userActions";
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className='flex h-14 gap-3 justify-end items-center px-4 bg-lime-300 text-gray-700'>
      <Link to='/' className='bg-white border border-white rounded px-4 py-1'>
        Home
      </Link>
      <h1 className='my-auto'>Hi {userInfo?.full_name}</h1>
      <button
        className='bg-white border border-white rounded px-4 py-1'
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
