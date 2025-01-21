import React from "react";

const Header = () => {
  return (
    <>
    <header style={headerStyle}>
      <h1 style={titleStyle}>WELCOME TO  BOOKNGO</h1>
    </header>
   </>
  );
};

const headerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "25px 0 0 0", 
  color: "white",
};

const titleStyle = {
  margin: 0,
  fontSize: "60px",
  textShadow: "3px 5px 0px rgba(161, 154, 154, 0.6)"
};

export default Header;
