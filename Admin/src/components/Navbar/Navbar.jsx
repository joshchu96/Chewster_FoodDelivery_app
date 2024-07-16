import React from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo-container">
        <img className="logo" src={assets.logo} alt="chewster logo pic" />
        <img className="admin_icon" src={assets.admin_icon} alt="admin logo" />
      </div>
      <img className="profile" src={assets.profile_pic} alt="profile pic" />
    </div>
  );
};

export default Navbar;
