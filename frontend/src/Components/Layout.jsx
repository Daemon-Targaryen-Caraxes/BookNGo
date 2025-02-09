import React from "react";
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div className="layout">
      <header className="header">
        <h1>BOOKNGO</h1>
      </header>
      <aside className="sidebar">
        <nav>
          <ul>
            <li><Link to="/selecttraveloption">HOME</Link></li>
            <li><Link to="/userprofile">PROFILE</Link></li>
            <li><Link to="/TravelSearchForm" state={{ selectedOption: "bus" }}>BOOK BUS</Link></li>
            <li><Link to="/TravelSearchForm" state={{ selectedOption: "train" }}>BOOK TRAIN</Link></li>
            <li><Link to="/TravelSearchForm" state={{ selectedOption: "flight" }}>BOOK FLIGHT</Link></li>
            <li><Link to="/TravelSearchForm">BOOKED HISTORY</Link></li>
            <li><Link to="/changepassword">CHANGE PASSWORD</Link></li>
            <li><Link to="/TravelSearchForm">LOGOUT</Link></li>
          </ul>
        </nav>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
