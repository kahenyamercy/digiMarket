import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className='register-cont'>
      <div className='register-wrapper'>
        <h1>Login to digiMarket</h1>
        <form>
          <div className='register-input'>
            <label htmlFor='username'>Username</label>
            <input type='text' id='username' placeholder='johndoe' />
          </div>

          <div className='register-input'>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' placeholder='********' />
          </div>
          <button className='register-btn'>Sign In</button>
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
