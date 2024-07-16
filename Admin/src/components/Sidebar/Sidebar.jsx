import React from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options-container">
        <NavLink to="/add" className="sidebar-option">
          <img src={assets.add_icon} alt="add icon pic" />
          <p>Add Items</p>
        </NavLink>
        <NavLink to="/display_items" className="sidebar-option">
          <img src={assets.order_icon} alt="order icon pic" />
          <p>Display Items</p>
        </NavLink>
        <NavLink to="/orders" className="sidebar-option">
          <img src={assets.order_icon} alt="order icon pic" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
