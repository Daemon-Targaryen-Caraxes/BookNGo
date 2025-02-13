import React from "react";
import { Outlet, Link } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="layout">
      <header className="header">
        <h1>BOOKNGO</h1>
      </header>
      <aside className="sidebar">
        <nav>
          <ul>
            <li><Link to="/selecttraveloption">HOME</Link></li>
            <li><Link to="/adminprofile">PROFILE</Link></li>
            <li><Link to="/TravelSearchForm" state={{ selectedOption: "bus" }}>BOOK BUS</Link></li>
            <li><Link to="/TravelSearchForm" state={{ selectedOption: "train" }}>BOOK TRAIN</Link></li>
            <li><Link to="/TravelSearchForm" state={{ selectedOption: "flight" }}>BOOK FLIGHT</Link></li>
            <li><Link to="/AddTransport" state={{ selectedOption: "train" }}>ADD TRAIN</Link></li>
            <li><Link to="/changepassword" state={{ selectedOption: "bus" }}>ADD BUS</Link></li>
            <li><Link to="/AddTransport" state={{ selectedOption: "flight" }}>ADD FLIGHT</Link></li>
            <li><Link to="/changepassword">PASSENGER ENQUIRY</Link></li>
            <li><Link to="/editprofile">EDIT PROFILE</Link></li>
            <li><Link to="/changeadminprofile">CHANGE PROFILE</Link></li>
            <li><Link to="/addadmin">LOGOUT</Link></li>
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

export default AdminLayout;
