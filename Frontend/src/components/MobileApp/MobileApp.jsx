import React from "react";
import "./MobileApp.css";
import { assets } from "../../assets/assets";

const MobileApp = () => {
  return (
    <div className="mobile-app" id="mobile-app">
      <p>On the go? Join Chewster Mobile</p>
      <div className="mobile-app-downloads">
        <img src={assets.app_store} alt="ios chewster store" />
        <img src={assets.play_store} alt="android chewster store" />
      </div>
    </div>
  );
};

export default MobileApp;
