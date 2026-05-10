// Dashboard.jsx

import React from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";


import {
  Gem,
  Palette,
  Heart,
  User,
  LogOut,
} from "lucide-react";

import bracelet from "../assets/bracelet.png";

function Dashboard() {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  return (

    <div className="dashboard">

      {/* SIDEBAR */}

      <div className="sidebar">

        <div className="sidebar-logo">
          BeadAura <span>●</span>
        </div>

        <div className="sidebar-menu">

  {/* DASHBOARD */}

  <button
    className="menu-item active"
    onClick={() => navigate("/dashboard")}
  >
    <Gem size={20} />
    <span>Dashboard</span>
  </button>

  {/* DESIGN STUDIO */}

  <button
    className="menu-item"
    onClick={() => navigate("/designer")}
  >
    <Palette size={20} />
    <span>Design Studio</span>
  </button>

  {/* SAVED DESIGNS */}

  <button
    className="menu-item"
    onClick={() => navigate("/saved-designs")}
  >
    <Heart size={20} />
    <span>Saved Designs</span>
  </button>

  {/* PROFILE */}

  <button
    className="menu-item"
    onClick={() => navigate("/profile")}
  >
    <User size={20} />
    <span>Profile</span>
  </button>

</div>

        <div className="logout">
          <LogOut size={20} />
          <span>Logout</span>
        </div>

      </div>

      {/* MAIN CONTENT */}

      <div className="dashboard-content">

        {/* TOP */}

        <div className="top-section">

          <div>
            <h1>
              Welcome back, {user?.name} 
            </h1>

            <p>
              Let’s create something beautiful today.
            </p>
          </div>

          <input
            type="text"
            placeholder="Search designs..."
            className="search"
          />

        </div>

        {/* CREATE SECTION */}

        <div className="section">

          <h2>
            What would you like to create?
          </h2>

          <div className="create-grid">

            {/* CARD 1 */}

            <div className="create-card">

              <div className="card-content">

                <h3>Create Bracelet</h3>

                <p>
                  Design your own custom
                  bracelet with elegance.
                </p>

                <button
  onClick={() => navigate("/designer")}
>
  Start Designing
</button>

              </div>

              <img
                src={bracelet}
                alt="bracelet"
              />

            </div>

            {/* CARD 2 */}

            <div className="create-card">

              <div className="card-content">

                <h3>Create Necklace</h3>

                <p>
                  Craft personalized
                  necklaces beautifully.
                </p>

                <button>
                  Create Necklace
                </button>

              </div>

              <img
                src={bracelet}
                alt="necklace"
              />

            </div>

            {/* CARD 3 */}

            <div className="create-card">

              <div className="card-content">

                <h3>Create Earrings</h3>

                <p>
                  Design elegant earrings
                  with custom beads.
                </p>

                <button>
                  Create Earrings
                </button>

              </div>

              <img
                src={bracelet}
                alt="earrings"
              />

            </div>

          </div>

        </div>

        {/* RECENT DESIGNS */}

        <div className="section">

          <div className="section-header">

            <h2>Inspirations</h2>

            <span>View all</span>

          </div>

          <div className="recent-grid">

            <div className="recent-card">
              <img
                src={bracelet}
                alt=""
              />

              <h4>Pink Pearl</h4>

              <p>Edited 2 days ago</p>
            </div>

            <div className="recent-card">
              <img
                src={bracelet}
                alt=""
              />

              <h4>Lavender Love</h4>

              <p>Edited 5 days ago</p>
            </div>

            <div className="recent-card">
              <img
                src={bracelet}
                alt=""
              />

              <h4>Golden Charm</h4>

              <p>Edited yesterday</p>
            </div>

            <div className="recent-card">
              <img
                src={bracelet}
                alt=""
              />

              <h4>Soft Blush</h4>

              <p>Edited 1 week ago</p>
            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Dashboard;