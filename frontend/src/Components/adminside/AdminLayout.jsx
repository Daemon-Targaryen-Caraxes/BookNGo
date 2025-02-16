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
            <li><Link to="/AddTransport" state={{ selectedOption: "bus" }}>ADD BUS</Link></li>
            <li><Link to="/AddTransport" state={{ selectedOption: "flight" }}>ADD FLIGHT</Link></li>
            <li><Link to="/enquiry">PASSENGER ENQUIRY</Link></li>
            <li><Link to="/addadmin">ADD NEW ADMIN</Link></li>
            <li><Link to="/editadminprofile">EDIT PROFILE</Link></li>
            <li><Link to="/changeadminprofile">CHANGE PROFILE</Link></li>
            <li><Link to="/changepassword">CHANGE</Link></li>
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
