import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate(); // ✅ THIS WAS MISSING

  return (
    <nav className="navbar">

      <div className="logo">
        BEADAURA <span className="circle">◯</span>
      </div>

      <ul className="nav-links">
        <li>About Us</li>
        <li>Contact Us</li>
      </ul>

      <div className="nav-buttons">

        <button
          className="login"
          onClick={() => navigate("/login")}
        >
          Login
        </button>

        <button
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