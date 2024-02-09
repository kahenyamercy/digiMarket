import React, { useState } from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import CategoryIcon from "@mui/icons-material/Category";
import ProductTable from "./ProductsTable";
import { useSelector } from "react-redux";
import LoadingSpinner from "./utilComponents/LoadingSpinner";
import ErrorMessage from "./utilComponents/ErrorMessage";

const ProfileSection = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [showAccount, setShowAccount] = useState(true);
  const [showProductTab, setShowProductTab] = useState(false);
  const [userData, setUserData] = useState(userInfo);
  const [userAddressData, setUserAddressData] = useState(userInfo.address);
  const [passData, setPassData] = useState({
    current_password: "",
    password: "",
    confirm_password: "",
  });
  const [formErr, setFormErr] = useState(null);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e) => {
    setUserAddressData({ ...userAddressData, [e.target.name]: e.target.value });
  };

  const handlePassChange = (e) => {
    setPassData({ ...passData, [e.target.name]: e.target.value });
  };

  const handleTab = (tabname) => {
    if (tabname === "account") {
      setShowAccount(true);
      setShowProductTab(false);
    } else if (tabname === "products") {
      setShowProductTab(true);
      setShowAccount(false);
    }
  };

  const handleUpdateUserDetails = (e) => {
    e.preventDefault();
    setFormErr(null);
    if (passData.password !== "") {
      if (passData.current_password === "") {
        setFormErr("Current password required!");
      }
      if (passData.confirm_password !== passData.password) {
        setFormErr("Password must match!");
      }
    }
  };
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
                  <p className='text-gray-600'>{userInfo?.address?.county}</p>
                </div>
                <div className='flex gap-3'>
                  <h6 className='font-semibold'>Town</h6>
                  <p className='text-gray-600'>{userInfo?.address?.town}</p>
                </div>
                <div className='flex gap-3'>
                  <h6 className='font-semibold'>Village</h6>
                  <p className='text-gray-600'>{userInfo?.address?.village}</p>
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
            <form
              className='w-full border rounded p-4'
              onSubmit={handleUpdateUserDetails}
            >
              <h6 className='text-gray-600 font-semibold italic'>
                Edit User info
              </h6>
              <LoadingSpinner />
              {formErr && (
                <ErrorMessage>{formErr}</ErrorMessage>
              )}
              <div className='grid md:grid-cols-9 flex gap-2'>
                <div className='col-span-1 md:col-span-3 mt-2'>
                  <label
                    htmlFor='fullName'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Full Name
                  </label>
                  <div className='mt-2'>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-400 px-2'>
                      <input
                        type='text'
                        name='full_name'
                        value={userData.full_name}
                        onChange={handleChange}
                        id='fullName'
                        className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                        placeholder='Jane Smith'
                      />
                    </div>
                  </div>
                </div>
                <div className='col-span-1 md:col-span-3 mt-2'>
                  <label
                    htmlFor='username'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Username
                  </label>
                  <div className='mt-2'>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-400 px-2'>
                      <input
                        type='text'
                        name='username'
                        value={userData.username}
                        onChange={handleChange}
                        id='username'
                        className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                        placeholder='janesmith'
                      />
                    </div>
                  </div>
                </div>
                <div className='col-span-1 md:col-span-3 mt-2'>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Email
                  </label>
                  <div className='mt-2'>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-400 px-2'>
                      <input
                        type='text'
                        name='email'
                        value={userData.email}
                        onChange={handleChange}
                        id='email'
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
                    htmlFor='current_password'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Current Password
                  </label>
                  <div className='mt-2'>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-400 px-2'>
                      <input
                        type='password'
                        name='current_password'
                        value={passData.current_password}
                        onChange={handlePassChange}
                        id='current_password'
                        className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                        placeholder='********'
                      />
                    </div>
                  </div>
                </div>
                <div className='col-span-1 md:col-span-3 mt-2'>
                  <label
                    htmlFor='new_password'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    New Password
                  </label>
                  <div className='mt-2'>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-400 px-2'>
                      <input
                        type='password'
                        name='password'
                        value={passData.password}
                        onChange={handlePassChange}
                        id='new_password'
                        className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                        placeholder='********'
                      />
                    </div>
                  </div>
                </div>
                <div className='col-span-1 md:col-span-3 mt-2'>
                  <label
                    htmlFor='confirm_password'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Confirm Password
                  </label>
                  <div className='mt-2'>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-400 px-2'>
                      <input
                        type='password'
                        name='confirm_password'
                        value={passData.confirm_password}
                        onChange={handlePassChange}
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
                    htmlFor='phone'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Contact/Telephone
                  </label>
                  <div className='mt-2'>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-400 px-2'>
                      <input
                        type='text'
                        name='phone_number'
                        value={userData.phone_number}
                        onChange={handleChange}
                        id='phone'
                        className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                        placeholder='07** *** ***'
                      />
                    </div>
                  </div>
                </div>
                <div className='col-span-1 md:col-span-3 mt-2'>
                  <label
                    htmlFor='county'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    County
                  </label>
                  <div className='mt-2'>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-400 px-2'>
                      <input
                        type='text'
                        name='county'
                        value={userAddressData.county}
                        onChange={handleAddressChange}
                        id='county'
                        className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                        placeholder='Nyeri'
                      />
                    </div>
                  </div>
                </div>
                <div className='col-span-1 md:col-span-3 mt-2'>
                  <label
                    htmlFor='town'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Town
                  </label>
                  <div className='mt-2'>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-400 px-2'>
                      <input
                        type='text'
                        name='town'
                        value={userAddressData.town}
                        onChange={handleAddressChange}
                        id='town'
                        className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                        placeholder='Chaka'
                      />
                    </div>
                  </div>
                </div>
                <div className='col-span-1 md:col-span-3 mt-2'>
                  <label
                    htmlFor='village'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Village/Ward/Shopping Centre
                  </label>
                  <div className='mt-2'>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-400 px-2'>
                      <input
                        type='text'
                        name='village'
                        value={userAddressData.village}
                        onChange={handleAddressChange}
                        id='village'
                        className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                        placeholder='Kiganjo/Kirichu'
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button
                type='submit'
                className='w-72 bg-lime-400 text-white px-4 py-1 rounded my-3'
              >
                Update details
              </button>
            </form>
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
