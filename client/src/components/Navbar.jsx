import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/userActions";
import { Link } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import LogoutIcon from "@mui/icons-material/Logout";
import HelpIcon from "@mui/icons-material/Help";
import ListIcon from "@mui/icons-material/List";

const Navbar = () => {
  const dispatch = useDispatch();
  const {cartItems} = useSelector((state) => state.cart);
  const {categoryList} = useSelector((state) => state.category);
  const {userInfo} = useSelector((state) => state.user);
  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleCategories = () => {
    const catSection = document.getElementById("categorySection");
    catSection.classList.toggle("category-list-hide");
  }
  return (
    <nav className=''>
      <section className='flex gap-4 md:gap-10 grid grid-cols-1 md:grid-cols-8 px-4 relative'>
        <div className='col-span-1 md:col-span-2 flex items-center'>
          <h1 className='mt-1 md:my-auto font-bold text-3xl md:text-4xl text-lime-700'>
            <Link to='/'>digiMarket</Link>
          </h1>
        </div>
        <div className='mb-4 md:pb-0 md:p-4 flex gap-1 col-span-1 md:col-span-4'>
          <input
            type='text'
            className='w-4/5 border border-gray px-3 py-2 rounded-lg text-lg'
            placeholder='Search product by name...'
          />
          <button className='w-1/5 bg-lime-700 px-4 py-2 text-white border border-white rounded-lg text-sm md:text-md'>
            Search
          </button>
        </div>
        <div className='col-span-1 md:col-span-2 flex items-center justify-center md:justify-end gap-2 md:gap-4 absolute top-1 right-1'>
          <Link
            to='/profile'
            className='flex bg-slate-100 p-2 rounded-full text-lime-700 cursor-pointer'
          >
            <PersonOutlineIcon />
          </Link>
          <Link
            to='/cart'
            className='flex bg-slate-100 p-2 rounded-full text-lime-700 cursor-pointer relative'
          >
            <ShoppingBasketIcon />
            {cartItems?.length > 0 && (
              <span className='w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white absolute top-0 right-0'>
                {cartItems.length}
              </span>
            )}
          </Link>
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
      <div className='flex h-12 justify-between px-4 bg-lime-300 text-gray-700 py-2'>
        <section
          className='flex items-center category-list category-list-hide'
          id='categorySection'
        >
          <ul className='flex gap-3'>
            {categoryList?.map((category) => {
              return (
                <li
                  className='text-gray-800 uppercase cursor-pointer my-auto border-b border-transparent hover:border-b hover:border-gray-700'
                  key={category.id}
                >
                  <Link to={`/shop/category/${category.id}`}>
                    {category.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
        <div className='flex gap-5 items-center'>
          {userInfo !== null && (
            <h1 className='my-auto font-semibold text-xl text-lime-800'>
              Hi, <span className='text-gray-800'>{userInfo?.full_name}</span>
            </h1>
          )}
          <button
            className='border border-gray-700 rounded px-1 cursor-pointer btn-hide'
            onClick={toggleCategories}
          >
            <ListIcon style={{ color: "#ffffff", fontSize: "32px" }} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
