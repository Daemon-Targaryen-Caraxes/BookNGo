import React, { useEffect, useState } from 'react';
import "./AdminLoginStyles.css"
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [fetchedUsername, setFetchedUsername] = useState('');
  const [fetchedPassword, setFetchPassword] = useState('');
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/admin");
      const data = await response.json();
      setFetchedUsername(data.adminName);
      setFetchPassword(data.password);
    }
    fetchData();
  }, [isClicked]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsClicked(true);
    
    if(fetchedUsername === username && fetchedPassword === password){
      console.log('Login successfully');
      navigate('/enquiry');
    } else {
      console.log("not");
    }

  };

  console.log(fetchedUsername, fetchedPassword);
  return (
    <div className="login-container">
      <h2 className='admin-login'>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;
