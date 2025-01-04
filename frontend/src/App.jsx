import HomePage from "./Components/HomePage/HomePage";
import './App.css'
import LoginPage from "./Components/UserLogin/UserLogin.jsx";
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import Signup from "./Components/Signup/Signup";
import SearchPage from "./Components/SearchPage/SearchPage";
import Train from "./Components/Train-ticket";
import SearchForm from "./Components/searchresult/TrainSearchResult.jsx";
import Paymentpages from "./Components/Paymentpages/Paymentpages.jsx";
import UserOrAdmin from "./Components/UserOrAdmin/UserOrAdmin.jsx";
import DoUHaveAccount from "./Components/DoUHaveAccount/DoUHaveAccount.jsx";
import UserLogin from "./Components/UserLogin/UserLogin.jsx";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/userside/Userlogin";
import SignUp from "./components/userside/Usersignup";
import AdminLogin from "./components/adminside/Adminlogin";
import TravelSearchForm from "./components/userside/TravelSearchForm";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" >
          <Route index element={<UserOrAdmin />} />
          <Route path="user" >
            <Route index element={<DoUHaveAccount />}></Route>
            <Route path="login" element={<UserLogin />}></Route>
          </Route>
          <Route path="admin">

          </Route>
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/payment" element={<Paymentpages />} />
        <Route path="/" element={<Home />} />
        <Route path="/TravelSearchForm" element={<TravelSearchForm/>}/>
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
