import React from "react";

const Header = () => {
  return (
    <header style={headerStyle}>
      <h1 style={titleStyle}>WELCOME  TO  BOOKNGO</h1>
    </header>
  );
};

const headerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "25px", 
  color: "white",
};

const titleStyle = {
  margin: 0,
  fontSize: "55px",
};

export default Header;
