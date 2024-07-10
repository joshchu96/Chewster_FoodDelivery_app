import React from "react";
import "./Header.css";

const Header = () => {
  console.log("Header rendered");
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order your food here</h2>
        <p>
          Select from a array of amazing dishes crafted using the freshest
          ingredients
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
