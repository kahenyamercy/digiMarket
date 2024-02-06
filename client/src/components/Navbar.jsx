import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/userActions";
import { Link } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import LogoutIcon from "@mui/icons-material/Logout";
import HelpIcon from "@mui/icons-material/Help";

const Navbar = () => {
  const dispatch = useDispatch();
  const {userInfo} = useSelector((state) => state.user);
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <nav className=''>
      <section className='flex gap-10 grid grid-cols-8 px-4'>
        <div className='col-span-2 flex items-center'>
          <h1 className='my-auto font-bold text-4xl text-lime-700'>
            digiMarket
          </h1>
        </div>
        <div className='p-4 flex gap-1 col-span-4'>
          <input
            type='text'
            className='w-4/5 border border-gray px-3 py-2 rounded-lg text-lg'
            placeholder='Search product by name...'
          />
          <button className='w-1/5 bg-lime-700 px-4 py-2 text-white border border-white rounded-lg'>
            Search
          </button>
        </div>
        <div className='col-span-2 flex items-center justify-end gap-4'>
          <div className='flex bg-slate-100 p-2 rounded-full text-lime-700 cursor-pointer'>
            <PersonOutlineIcon />
          </div>
          <div className='flex bg-slate-100 p-2 rounded-full text-lime-700 cursor-pointer'>
            <ShoppingBasketIcon />
          </div>
          <div
            className='flex bg-slate-100 p-2 rounded-full text-lime-700 cursor-pointer'
            onClick={handleLogout}
          >
            <LogoutIcon />
          </div>
          <div className='flex bg-slate-100 p-2 rounded-full text-lime-700 cursor-pointer'>
            <HelpIcon />
          </div>
        </div>
      </section>
      <div className='flex h-12 justify-between s-center px-4 bg-lime-300 text-gray-700 py-2'>
        <section className='flex items-center'>
          <ul className='flex gap-3'>
            <li className='text-gray-800 uppercase cursor-pointer my-auto border-b border-transparent hover:border-b hover:border-gray-700'>
              Fruits
            </li>
            <li className='text-gray-800 uppercase cursor-pointer my-auto border-b border-transparent hover:border-b hover:border-gray-700'>
              Vegetables
            </li>
            <li className='text-gray-800 uppercase cursor-pointer my-auto border-b border-transparent hover:border-b hover:border-gray-700'>
              Grains
            </li>
            <li className='text-gray-800 uppercase cursor-pointer my-auto border-b border-transparent hover:border-b hover:border-gray-700'>
              Legumes
            </li>
            <li className='text-gray-800 uppercase cursor-pointer my-auto border-b border-transparent hover:border-b hover:border-gray-700'>
              Potatoes
            </li>
            <li className='text-gray-800 uppercase cursor-pointer my-auto border-b border-transparent hover:border-b hover:border-gray-700'>
              Fibres
            </li>
            <li className='text-gray-800 uppercase cursor-pointer my-auto border-b border-transparent hover:border-b hover:border-gray-700'>
              Nuts
            </li>
            <li className='text-gray-800 uppercase cursor-pointer my-auto border-b border-transparent hover:border-b hover:border-gray-700'>
              Cereals
            </li>
            <li className='text-gray-800 uppercase cursor-pointer my-auto border-b border-transparent hover:border-b hover:border-gray-700'>
              Animal Products
            </li>
          </ul>
        </section>
        <div className='flex items-center'>
          <h1 className='my-auto font-semibold text-xl text-lime-800'>
            Hi, <span className='text-gray-800'>{userInfo?.full_name}</span>
          </h1>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
