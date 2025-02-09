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
            <li><Link to="/TravelSearchForm">Add bus</Link></li>
            <li><Link to="/changepassword">Add train</Link></li>
            <li><Link to="/TravelSearchForm">Add flight</Link></li>
            <li><Link to="/changepassword">passenger enquiry</Link></li>
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
