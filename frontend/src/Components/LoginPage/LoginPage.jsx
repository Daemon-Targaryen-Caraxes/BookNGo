import React from 'react'
import './LoginPageStyles.css'
import { Link, useLocation } from 'react-router-dom';

const LoginPage = () => {
  const location = useLocation();

  return (
    <form action="" className='login-page'>
      <h1 className='login-page-header'>Login To Your Account</h1>
      <label htmlFor="user-name">User Name:</label>
      <input type="text" id='user-name' placeholder='Enter Your User Name' /><br /><br />
      <label htmlFor="password">Passaword:</label>
      <input type="text" id='password' placeholder='Enter Your Password' /><br />
      <a className='forgot-password' href="www.google.com">Forget Password ?</a><br />
      <div className='buttons'>
        <Link to={'/signup'}><button className='signup' type="button" value="Signup" >Signup</button></Link>
        <Link to={'/'}><button type="submit" value="Submit" className='submit'>Submit</button></Link>
      </div>
    </form>
  )
}

export default LoginPage
