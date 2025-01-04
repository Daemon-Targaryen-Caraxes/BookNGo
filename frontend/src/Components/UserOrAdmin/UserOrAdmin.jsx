import React from 'react'
import "./UserOrAdminStyles.css"
import { Link } from 'react-router-dom'

const UserOrAdmin = () => {
  return (
    <div className="container">
      <h1>Welcome to Booking!</h1>
      <div className="button-container">
        <Link to={"user"}><button id="userButton">Are you a User?</button></Link>
        <Link to={"admin"} ><button id="adminButton">Are you an Admin?</button></Link>
      </div>
    </div>
  )
}

export default UserOrAdmin
