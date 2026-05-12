// Navbar.jsx

import React from "react";
import "./Navbar.css";

import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  return (
    <nav className="navbar">

      <div className="logo">
        BeadAura <span className="circle">●</span>
      </div>

      <ul className="nav-links">
        <li>Design Studio</li>
        <li>Inspiration</li>
        <li>Contact</li>
      </ul>

      <div className="nav-buttons">

        <button
          type="button"
          className="login"
          onClick={() => navigate("/login")}
        >
          Login
        </button>

        <button
          type="button"
          className="signup"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>

      </div>
    </nav>
  );
}

export default Navbar;