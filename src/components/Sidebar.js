import React from "react";
import {
  useNavigate, useLocation,} from "react-router-dom";

import "./Sidebar.css";

import {
  Gem,
  Palette,
  Heart,
  User,
  LogOut,
  Circle,
} from "lucide-react";



function Sidebar({

  active,

  setMode,

  setSelectedCategory,

}) {

  const navigate = useNavigate();
const handleLogout = () => {

  localStorage.removeItem("token");

  localStorage.removeItem("user");

  localStorage.removeItem("userId");

  navigate("/login");

};
  

  const location = useLocation();

  return (

    <div className="sidebar">

      {/* LOGO */}

      <div className="sidebar-logo">
        BeadAura <span>●</span>
      </div>

      {/* MAIN MENU */}

      <div className="sidebar-menu">

        {/* DASHBOARD */}

        <button
          className={`menu-item ${
            active === "dashboard"
              ? "active"
              : ""
          }`}
          onClick={() =>
            navigate("/dashboard")
          }
        >
          <Gem size={20} />

          <span>Dashboard</span>
        </button>

        {/* DESIGN STUDIO */}

        <button
          className="sub-item studio-btn"

          onClick={() => {

            if (
              location.pathname !==
              "/designer"
            ) {
              navigate("/designer");
            }

            setMode?.("studio");

            setSelectedCategory?.(
              null
            );
          }}
        >
          <Palette size={20} />

          <span>Design Studio</span>
        </button>

      </div>

      {/* CREATE SECTION */}

      <div className="sidebar-section">

        <p className="section-title">
          CREATE
        </p>

       {/* BRACELETS */}

<button
  className="sub-item"

  onClick={() => {

    if (
      location.pathname !==
      "/designer"
    ) {
      navigate("/designer");
    }

    setMode?.("template");

    setSelectedCategory?.(
      "bracelets"
    );
  }}
>
  <Circle size={16} />

  Bracelets
</button>

{/* NECKLACES */}

<button
  className="sub-item"

  onClick={() => {

    if (
      location.pathname !==
      "/designer"
    ) {
      navigate("/designer");
    }

    setMode?.("template");

    setSelectedCategory?.(
      "necklaces"
    );
  }}
>
  <Circle size={16} />

  Necklaces
</button>

{/* EARRINGS */}

<button
  className="sub-item"

  onClick={() => {

    if (
      location.pathname !==
      "/designer"
    ) {
      navigate("/designer");
    }

    setMode?.("template");

    setSelectedCategory?.(
      "earrings"
    );
  }}
>
  <Circle size={16} />

  Earrings
</button>

      </div>

      {/* BOTTOM MENU */}

      <div className="sidebar-menu">

        {/* SAVED */}

        <button
          className={`menu-item ${
            active === "saved"
              ? "active"
              : ""
          }`}
          onClick={() =>
            navigate("/saved-designs")
          }
        >
          <Heart size={20} />

          <span>Saved Designs</span>
        </button>

        {/* PROFILE */}

        <button
          className={`menu-item ${
            active === "profile"
              ? "active"
              : ""
          }`}
          onClick={() =>
            navigate("/profile")
          }
        >
          <User size={20} />

          <span>Profile</span>
        </button>

      </div>

      {/* LOGOUT */}

      <div className="logout"
      onClick={handleLogout}>

        <LogOut size={20} />

        <span>Logout</span>

      </div>

    </div>
  );
}

export default Sidebar;