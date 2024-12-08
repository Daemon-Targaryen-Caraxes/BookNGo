import React from 'react'
import { Link } from 'react-router-dom'
import './SignupStyles.css'

const Signup = () => {
  return (
    <div className="form-container">
      <h1 className="h1">Signup With Your Details </h1>
      <form className="signup" action="/">
        <div>
          <label htmlFor="Name:">Name:</label>
          <input className="name" type="text" id="Name" placeholder="Name" />
        </div>
        <div>
          <label htmlFor="Phone No">Phone No:</label>
          <input type="text" id="Phone No" placeholder="" />
        </div>
        <div>
          <label htmlFor="Email:">Email:</label>
          <input className="email" type="text" id="Email" placeholder="Ex:project@gmail.com" />
        </div>
        <div className="gender">
          Gender:
          <input type="radio" id="Male" value="Male" name='gender' />
          <label htmlFor="male"> Male</label>
          <input type="radio" id='Female' value="Female" name='gender' />
          <label htmlFor="female">Female</label>
          <input type="radio" id='others' value="others" name='gender' />
          <label htmlFor="others">Others</label>
        </div>
        <div>
          <label htmlFor="Aadhar:">Aadhar No:</label>
          <input type="Number" id="Aadhar No" placeholder="**** **** ****" />
        </div>
        <div>
          <label htmlFor="Email:">User ID:</label>
          <input className="userid" type="text" id="User ID" placeholder="*" />
        </div>
        <div>
          <label htmlFor="Email:">Password:</label>
          <input className="password" type="Number" id="Password" placeholder="" />
        </div>
        <div>
          <label htmlFor="Email:">Confrm <br />Password:</label>
          <input className="password" type="Number" id="Password" placeholder="*" />
        </div>
        <Link><button className="signup-button">Signup</button></Link>
        <Link to={"/login"}>Already have an account? Login</Link>
      </form>
    </div>
  )
}

export default Signup
