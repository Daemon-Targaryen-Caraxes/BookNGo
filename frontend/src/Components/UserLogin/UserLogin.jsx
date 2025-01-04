import React from 'react'
import './UserLoginStyles.css'
import { Link, useLocation } from 'react-router-dom';

const UserLogin = () => {

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form id="loginForm">
        <div className="form-group"> <label for="username">Username:</label>
          <input type="text" id="username" required />
        </div>
        <div className="form-group"> <label for="password">Password:</label>
          <input type="password" id="password" required />
        </div> <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default UserLogin
