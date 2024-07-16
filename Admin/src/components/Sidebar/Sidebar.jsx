import React from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options-container">
        <div className="sidebar-option">
          <img src={assets.add_icon} alt="add icon pic" />
          <p>Add Items</p>
        </div>
        <div className="sidebar-option">
          <img src={assets.order_icon} alt="order icon pic" />
          <p>Display Items</p>
        </div>
        <div className="sidebar-option">
          <img src={assets.add_icon} alt="add icon pic" />
          <p>Orders</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
