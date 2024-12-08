import React from 'react'
import './SignupStyles.css'

const Signup = () => {
  return (
    <div className="container">
      <h1 className="h1">Signup With Your Details </h1>
      <form className="signup" action="">
        <label htmlFor="Name:">Name:</label>
        <input className="name" type="text" id="Name" placeholder="Name" />
        <label htmlFor="Phone No">Phone No:</label>
        <input type="text" id="Phone No" placeholder="" />
        <label htmlFor="Email:">Email:</label>
        <input className="email" type="text" id="Email" placeholder="Ex:project@gmail.com" />
        Your Gender:
        <label htmlFor="male">Male</label>
        <input type="radio" id="Male" value="Male" name='gender' />
        <label htmlFor="female">Female</label>
        <input type="radio" id='Female' value="Female" name='gender' />
        <label htmlFor="others">Others</label>
        <input type="radio" id='others' value="others" name='gender' />
        <label htmlFor="Aadhar:">Aadhar No:</label>
        <input type="Number" id="Aadhar No" placeholder="**** **** ****" />
        <label htmlFor="Email:">User ID:</label>
        <input className="userid" type="text" id="User ID" placeholder="*" />
        <label htmlFor="Email:">Password:</label>
        <input className="password" type="Number" id="Password" placeholder="" />
        <label htmlFor="Email:">Confirm <br />Password:</label>
        <input className="password" type="Number" id="Password" placeholder="*" />
        <button className="button">Signin</button>
        <p className="p1">Already have an account? Log in</p>
        <label htmlFor=""></label>
        <input className="signup-with-google" id="password" type="Number" placeholder="Signup with Google" />
      </form>
    </div>
  )
}

export default Signup
