import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
import MobileApp from "../MobileApp/MobileApp";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img className="logo" src={assets.logo} alt="img of chewster logo" />
          <p>
            Craving something delicious? Let Chewster bring your favorite meals
            right to your doorstep. Fresh, fast, and always satisfying.
          </p>
          <MobileApp />
          <div className="footer-social">
            <img className="x" src={assets.x_icon} alt="x icon" />
            <img
              className="in"
              src={assets.linkedin_icon}
              alt="linkedin icon"
            />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>Get to Know Us</li>
            <li>Order Delivery</li>
            <li>Get Chewster for Business</li>
            <li>Get Chewsters for Deliveries</li>
            <li>Become a Chewster</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Connect With Us</h2>
          <ul>
            <li>+1-555-123-4567</li>
            <li>supportchu@chewster.com</li>
            <li>LinkedIn</li>
            <li>GlassDoor</li>
            <li>Chewster Central</li>
          </ul>
        </div>
      </div>
      <p className="footer-copyright">
        &copy; 2024 Chewster. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
