import React, {useEffect, useState} from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import CategoryIcon from "@mui/icons-material/Category";
import ProductTable from "./ProductsTable";
import {useDispatch, useSelector} from "react-redux";
import { getAddress } from "../redux/actions/userActions";
import { useParams } from "react-router-dom";

const ProfileSection = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const {userInfo, userAddress} = useSelector((state) => state.user);
  const [showAccount, setShowAccount] = useState(true);
  const [showProductTab, setShowProductTab] = useState(false);

  const handleTab = (tabname) => {
    if (tabname === 'account'){
      setShowAccount(true);
      setShowProductTab(false);
    } else if (tabname === 'products'){
      setShowProductTab(true);
      setShowAccount(false);
    }
  }

  const addressId = params.id;

  useEffect(() => {
    dispatch(getAddress(addressId));
  }, [dispatch, addressId])

  console.log(userInfo)
  console.log(userAddress)
  return (
    <div className='px-4 md:px-24 mt-4 grid md:grid-cols-9 gap-5'>
      {/* Navigation bar for profile tabs */}
      <div className='md:col-span-2 bg-white shadow rounded p-4 max-h-80'>
        <button
          className={`flex gap-2 items-center text-gray-600 mt-3 ${
            showAccount && "bg-gray-100 rounded"
          } hover:bg-gray-100 hover:rounded px-3 py-2 cursor-pointer`}
          onClick={() => handleTab("account")}
        >
          <PersonOutlineIcon />
          <h3 className='text-lg my-auto'>My Account</h3>
        </button>
        <button
          className={`flex gap-2 items-center text-gray-600 mt-3 ${
            showProductTab && "bg-gray-100 rounded"
          } hover:bg-gray-100 hover:rounded px-3 py-2 cursor-pointer`}
          onClick={() => handleTab("products")}
        >
          <CategoryIcon />
          <h3 className='text-lg my-auto'>Products</h3>
        </button>
        <button className='flex gap-2 items-center text-gray-600 mt-3 hover:bg-gray-100 hover:rounded px-3 py-2 cursor-pointer'>
          <ShoppingBasketIcon />
          <h3 className='text-lg my-auto'>Orders</h3>
        </button>
      </div>
      <section className='md:col-span-7'>
        {/* My Account section */}
        {showAccount && (
          <section className=' flex flex-col gap-4 justify-center items-center shadow rouded p-4'>
            <div className='w-32 h-32 rounded-full border border-4 border-lime-400'>
              <img
                src='/assets/images/user-avatar.jpeg'
                alt='User'
                className='w-full h-full rounded-full object-cover'
              />
            </div>
            <div className='w-full flex flex-col items-center justify-center'>
              <div className='w-full flex items-center gap-5 justify-center'>
                <h2 className='font-semibold text-xl text-gray-700'>
                  {userInfo.full_name}
                </h2>
                <span className='px-4 bg-orange-200 rounded-sm py-1 text-red-500'>
                  Wholesaler
                </span>
              </div>
              <p className='text-gray-600'>{userInfo.email}</p>
              <p className='text-gray-600'>Tel: {userInfo.phone_number}</p>
              <p className='text-gray-600'>Username: {userInfo.username}</p>
            </div>
            <section className='grid grid-cols-1 md:grid-cols-5 flex flex-wrap gap-2 md:gap-6'>
              <div className='col-span-1 md:col-span-2 border my-3 rounded px-4 flex flex-col py-3'>
                <h6 className='text-start italic'>Location</h6>
                <div className='flex gap-3'>
                  <h6 className='font-semibold'>County</h6>
                  <p className='text-gray-600'>{userAddress.county}</p>
                </div>
                <div className='flex gap-3'>
                  <h6 className='font-semibold'>Town</h6>
                  <p className='text-gray-600'>Nairobi</p>
                </div>
                <div className='flex gap-3'>
                  <h6 className='font-semibold'>Village</h6>
                  <p className='text-gray-600'>Kangemi</p>
                </div>
              </div>
              <div className='col-span-1 md:col-span-3 border my-3 rounded px-4 flex flex-col py-3'>
                <h6 className='text-start italic'>Bio</h6>
                <p className='text-gray-600'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dolorem vitae deleniti maiores sint autem recusandae tempora
                  quasi eaque nihil. Eligendi tenetur possimus quibusdam nobis
                  distinctio odio ut, iusto atque voluptates?
                </p>
              </div>
            </section>
            {/* Edit user info section */}
            <section className='w-full border rounded p-4'>
              <h6 className='text-gray-600 font-semibold italic'>
                Edit User info
              </h6>
              <div className='grid md:grid-cols-9 flex gap-2'>
                <div className='col-span-1 md:col-span-3 mt-2'>
                  <label
                    for='fullName'
                    class='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Full Name
                  </label>
                  <div class='mt-2'>
                    <div class='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-400 px-2'>
                      <input
                        type='text'
                        name='full_name'
                        id='fullName'
                        autocomplete='username'
                        className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                        placeholder='Jane Smith'
                      />
                    </div>
                  </div>
                </div>
                <div className='col-span-1 md:col-span-3 mt-2'>
                  <label
                    for='username'
                    class='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Username
                  </label>
                  <div class='mt-2'>
                    <div class='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-400 px-2'>
                      <input
                        type='text'
                        name='username'
                        id='username'
                        autocomplete='username'
                        className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                        placeholder='janesmith'
                      />
                    </div>
                  </div>
                </div>
                <div className='col-span-1 md:col-span-3 mt-2'>
                  <label
                    for='email'
                    class='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Username
                  </label>
                  <div class='mt-2'>
                    <div class='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-400 px-2'>
                      <input
                        type='text'
                        name='email'
                        id='email'
                        autocomplete='username'
                        className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                        placeholder='janesmith098@gmail.com'
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='grid md:grid-cols-9 flex gap-2'>
                <div className='col-span-1 md:col-span-3 mt-2'>
                  <label
                    for='current_password'
                    class='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Current Password
                  </label>
                  <div class='mt-2'>
                    <div class='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-400 px-2'>
                      <input
                        type='text'
                        name='current_password'
                        id='current_password'
                        className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                        placeholder='********'
                      />
                    </div>
                  </div>
                </div>
                <div className='col-span-1 md:col-span-3 mt-2'>
                  <label
                    for='new_password'
                    class='block text-sm font-medium leading-6 text-gray-900'
                  >
                    New Password
                  </label>
                  <div class='mt-2'>
                    <div class='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-400 px-2'>
                      <input
                        type='text'
                        name='password'
                        id='new_password'
                        className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                        placeholder='********'
                      />
                    </div>
                  </div>
                </div>
                <div className='col-span-1 md:col-span-3 mt-2'>
                  <label
                    for='confirm_password'
                    class='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Confirm Password
                  </label>
                  <div class='mt-2'>
                    <div class='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-400 px-2'>
                      <input
                        type='text'
                        name='password_1'
                        id='confirm_password'
                        className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                        placeholder='********'
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='grid md:grid-cols-9 flex gap-2'>
                <div className='col-span-1 md:col-span-3 mt-2'>
                  <label
                    for='phone'
                    class='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Contact/Telephone
                  </label>
                  <div class='mt-2'>
                    <div class='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-400 px-2'>
                      <input
                        type='text'
                        name='phone_no'
                        id='phone'
                        className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                        placeholder='07** *** ***'
                      />
                    </div>
                  </div>
                </div>
                <div className='col-span-1 md:col-span-3 mt-2'>
                  <label
                    for='county'
                    class='block text-sm font-medium leading-6 text-gray-900'
                  >
                    County
                  </label>
                  <div class='mt-2'>
                    <div class='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-400 px-2'>
                      <input
                        type='text'
                        name='county'
                        id='county'
                        className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                        placeholder='Nyeri'
                      />
                    </div>
                  </div>
                </div>
                <div className='col-span-1 md:col-span-3 mt-2'>
                  <label
                    for='town'
                    class='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Town
                  </label>
                  <div class='mt-2'>
                    <div class='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-400 px-2'>
                      <input
                        type='text'
                        name='town'
                        id='town'
                        className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                        placeholder='Chaka'
                      />
                    </div>
                  </div>
                </div>
                <div className='col-span-1 md:col-span-3 mt-2'>
                  <label
                    for='village'
                    class='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Village/Ward/Shopping Centre
                  </label>
                  <div class='mt-2'>
                    <div class='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-400 px-2'>
                      <input
                        type='text'
                        name='village'
                        id='village'
                        className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                        placeholder='Kiganjo/Kirichu'
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button class='w-72 bg-lime-400 text-white px-4 py-1 rounded my-3'>
                Update details
              </button>
            </section>
          </section>
        )}
        {/* Products Section */}
        {showProductTab && (
          <section className='rounded p-4'>
            <h4 className='font-semibold text-xl text-gray-700 py-3'>
              Products
            </h4>
            <ProductTable />
          </section>
        )}
      </section>
    </div>
  );
};

export default ProfileSection;
