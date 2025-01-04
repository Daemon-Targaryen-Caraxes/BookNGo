import React from "react";

const Header = () => {
  return (
    <header style={headerStyle}>
      <h1 style={titleStyle}>Ticket Reservation System</h1>
    </header>
  );
};

const headerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "25px",
  backgroundColor: "black",
  color: "white",
};

const titleStyle = {
  margin: 0,
  fontSize: "45px",
};

export default Header;
