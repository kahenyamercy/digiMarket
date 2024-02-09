import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/actions/userActions";
import LoadingSpinner from "../components/utilComponents/LoadingSpinner";
import ErrorMessage from "../components/utilComponents/ErrorMessage";

const Register = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { loading, error, success } = user;

  const [userInfo, setUserInfo] = useState({
    username: "",
    full_name: "",
    email: "",
    phone_number: "",
    password: "",
    county: "",
    town: "",
    village: "",
    role: "",
  });

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(userInfo));
  };

  useEffect(() => {
    if (success) {
      setUserInfo({
        username: "",
        full_name: "",
        email: "",
        phone_number: "",
        password: "",
        county: "",
        town: "",
        village: "",
        role: "",
      });
    }
  }, [success]);

  return (
    <div className='register-cont'>
      <div className='register-wrapper'>
        <h1>Register to digiMarket</h1>
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={handleSubmit}>
          <div className='register-input'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              placeholder='johndoe@gmail.com'
              name='email'
              onChange={handleChange}
              value={userInfo.email}
            />
          </div>
          <div className='register-row'>
            <div className='register-input'>
              <label htmlFor='full_name'>Full Name</label>
              <input
                type='text'
                id='full_name'
                placeholder='John Doe'
                name='full_name'
                onChange={handleChange}
                value={userInfo.full_name}
              />
            </div>
            <div className='register-input'>
              <label htmlFor='username'>Username</label>
              <input
                type='text'
                id='username'
                placeholder='johndoe'
                name='username'
                onChange={handleChange}
                value={userInfo.username}
              />
            </div>
          </div>
          <div className='register-row'>
            <div className='register-input'>
              <label htmlFor='phone'>Phone</label>
              <input
                type='text'
                id='phone'
                placeholder='07********'
                name='phone_number'
                onChange={handleChange}
                value={userInfo.phone_number}
              />
            </div>
            <div className='register-input'>
              <label htmlFor='county'>County</label>
              <input
                type='text'
                id='county'
                placeholder='Nairobi'
                name='county'
                onChange={handleChange}
                value={userInfo.county}
              />
            </div>
          </div>
          <div className='register-row'>
            <div className='register-input'>
              <label htmlFor='town'>Town</label>
              <input
                type='text'
                id='town'
                placeholder='CBD'
                name='town'
                onChange={handleChange}
                value={userInfo.town}
              />
            </div>
            <div className='register-input'>
              <label htmlFor='village'>Village (Optional)</label>
              <input
                type='text'
                id='village'
                placeholder='Kamukunji'
                name='village'
                onChange={handleChange}
                value={userInfo.village}
              />
            </div>
          </div>
          <div className='register-row'>
            <div className='register-input'>
              <label htmlFor='password'>Role</label>
              <select name='role' onChange={handleChange}>
                <option value=''>---Role---</option>
                <option value='farmer'>Farmer</option>
                <option value='wholesaler'>Wholesaler</option>
                <option value='retailer'>Retailer</option>
              </select>
            </div>
            <div className='register-input'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                placeholder='********'
                name='password'
                onChange={handleChange}
                value={userInfo.role}
              />
            </div>
          </div>
          <button className='register-btn' type='submit'>
            Sign Up
          </button>
          <p>
            Already a user?{" "}
            <Link to='/login' className='register-redirect'>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
