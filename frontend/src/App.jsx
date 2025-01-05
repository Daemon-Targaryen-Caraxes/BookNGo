import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/userside/Userlogin";
import SignUp from "./components/userside/Usersignup";
import AdminLogin from "./components/adminside/Adminlogin";
import TravelSearchForm from "./components/userside/TravelSearchForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/TravelSearchForm" element={<TravelSearchForm />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
