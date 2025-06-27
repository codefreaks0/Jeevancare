import React from "react";
import { useNavigate } from 'react-router-dom';
import "./SplashScreen.css";

const SplashScreen = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/signin'); // Direct to SignupPage
  };

  return (
    <div className="splash-container">
      {/* Top-right pills image */}
      
      {/* Top-left bubbles image */}
      <img
        src="/images/bubbles.png"
        alt="Bubbles"
        className="splash-bubbles"
      />
      {/* Center logo */}
      <div className="splash-logo-wrapper">
        <img
          src="/images/logo.png"
          alt="Jeevancare Logo"
          className="splash-logo"
        />
        {/* <h1 className="splash-title">Jeevancare</h1> */}
        {/* <p className="splash-tagline">Medical app</p> */}
      </div>
      {/* Bottom-left stethoscope image */}
      <img
        src="/images/stethoscope.png"
        alt="Stethoscope"
        className="splash-stethoscope"
      />
      {/* Bottom-right bandage image */}
      <img
        src="/images/bandage.png"
        alt="Bandage"
        className="splash-bandage"
      />

      <button className="get-started-button" onClick={handleGetStartedClick}>Get Started</button>
    </div>
  );
};

export default SplashScreen; 