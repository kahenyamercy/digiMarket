import React from "react";

const Register = () => {
  return (
    <div className='register-cont'>
      <div className='register-wrapper'>
        <h1>Register to digiMarket</h1>
        <form>
          <div className='register-input'>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' placeholder='johndoe@gmail.com' />
          </div>
          <div className='register-row'>
            <div className='register-input'>
              <label htmlFor='full_name'>Full Name</label>
              <input type='text' id='full_name' placeholder='John Doe' />
            </div>
            <div className='register-input'>
              <label htmlFor='username'>Username</label>
              <input type='text' id='username' placeholder='johndoe' />
            </div>
          </div>
          <div className='register-row'>
            <div className='register-input'>
              <label htmlFor='phone'>Phone</label>
              <input type='text' id='phone' placeholder='07********' />
            </div>
            <div className='register-input'>
              <label htmlFor='county'>County</label>
              <input type='text' id='county' placeholder='Nairobi' />
            </div>
          </div>
          <div className='register-row'>
            <div className='register-input'>
              <label htmlFor='town'>Town</label>
              <input type='text' id='town' placeholder='CBD' />
            </div>
            <div className='register-input'>
              <label htmlFor='county'>Village (Optional)</label>
              <input type='text' id='county' placeholder='Kamukunji' />
            </div>
          </div>
          <div className='register-row'>
            <div className='register-input'>
              <label htmlFor='password'>Role</label>
              <select>
                <option>---Role---</option>
                <option>Farmer</option>
                <option>Wholesaler</option>
                <option>Retailer</option>
              </select>
            </div>
            <div className='register-input'>
              <label htmlFor='password'>Password</label>
              <input type='password' id='password' placeholder='********' />
            </div>
          </div>
          <button className='register-btn'>Sign Up</button>
          <p>
            Already a user? <span className='register-redirect'>Login</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
