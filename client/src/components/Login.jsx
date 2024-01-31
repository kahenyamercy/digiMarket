import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo: user } = useSelector((state) => state.user);
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userInfo));
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className='register-cont'>
      <div className='register-wrapper'>
        <h1>Login to digiMarket</h1>
        <form onSubmit={handleSubmit}>
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

          <div className='register-input'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              placeholder='********'
              name='password'
              onChange={handleChange}
              value={userInfo.password}
            />
          </div>
          <button className='register-btn' type='submit'>
            Sign In
          </button>
          <p>
            Don't have an account?{" "}
            <Link to='/register' className='register-redirect'>
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
