import React, { useState } from 'react';
import Header from "../Header"
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/admin');
      if (!response.ok) {
        throw new Error('Failed to fetch admin data');
      }
      const data = await response.json();
      const admin = data.find(
        (admin) => admin.adminName === username && admin.password === password
      );
      if (admin) {
        setError(false);
        console.log('Login successfully');
        navigate('/enquiry');
      } else {
        setError(true);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError(true);
    }
  };

  return (
    <>
      <Header />
      <div className="login-container">
        <h2 className="admin-login text-5xl">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" style={{fontSize:"20px",color:'white'}}>adminName :</label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" required />
          </div>
          <div>
            <label htmlFor="password" style={{fontSize:"20px",color:'white'}}>Password :</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required />
          </div>
          {error && <p className="error">Wrong Password or Username</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}

export default AdminLogin;
