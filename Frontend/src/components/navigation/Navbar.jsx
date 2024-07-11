import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { ChewsterContext } from "../../context/ChewsterContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Home");

  const { calcCartTotal } = useContext(ChewsterContext);

  return (
    <div className="navbar">
      <Link to="/">
        <img
          src={assets.logo}
          alt="Picture of Chewster Logo"
          className="logo"
        />
      </Link>

      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("Home")}
          className={menu === "Home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("Menu")}
          className={menu === "Menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href="#mobile-app"
          onClick={() => setMenu("Mobile-App")}
          className={menu === "Mobile-App" ? "active" : ""}
        >
          Mobile-App
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("About-Us")}
          className={menu === "About-Us" ? "active" : ""}
        >
          About Us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="search-icon" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="cart basket img" />
          </Link>
          <div className={calcCartTotal() === 0 ? "" : "dot"}></div>
        </div>
        <button
          onClick={() => {
            setShowLogin(true);
          }}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Navbar;
