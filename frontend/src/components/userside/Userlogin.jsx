import React, { useState } from "react";
import Header from "../header";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!userId || !password) {
      setError("Please enter both User ID and Password."); 
      return;
    }

    setError("");
    alert(`Logged in with User ID: ${userId}`);
    navigate("/TravelSearchForm");
  };

  return (
    <>
      <Header />
      <div className="container">
        <h2>Login Page</h2>
        <form onSubmit={handleLogin}>
          <input type="text"  placeholder="User ID"  value={userId}  onChange={(e) => setUserId(e.target.value)}  required/>
          <input type="password"  placeholder="Password"value={password}  onChange={(e) => setPassword(e.target.value) }required  />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
