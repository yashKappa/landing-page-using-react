import React from 'react';
import './Login.css';
function Login() {
  return (
    <div className='page'>    
      <form action='login'>
        <div className='login'>
          <div className='place'>
          <label className='font' htmlFor="username">Username</label>
          <input type="text" id="username" placeholder='Username' name="username" />
          </div>
          <div className='place'>
          <label className='font' htmlFor="password">Password</label>
          <input placeholder='Password' type="password" id="password" name="password" />
          </div>
        <button className='submit' type="submit">Login</button>
        </div>
        </form>
    </div>
  );
}

export default Login;
