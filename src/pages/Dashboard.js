import React from "react";

import "./Dashboard.css";

import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";

import bracelet from "../assets/bracelet.png";
import bracelet1 from "../assets/bracelet1.png";
import necklace from "../assets/necklace.png";
import earring from "../assets/earring.png";
import image from "../assets/image.png";
import image1 from "../assets/image1.avif";
import image2 from "../assets/image2.jpg";

function Dashboard() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (

    <div className="dashboard">

      {/* REUSABLE SIDEBAR */}

      <Sidebar active="dashboard" />

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

            {/* BRACELET */}

            <div className="create-card">

              <div className="card-content">

                <h3>Create Bracelet</h3>

                <p>
                  Design your own custom
                  bracelet with elegance.
                </p>

                <button
                  onClick={() =>
                    navigate("/designer")
                  }
                >
                  Start Designing
                </button>

              </div>

              <img
                src={bracelet1}
                alt="bracelet"
              />

            </div>

            {/* NECKLACE */}

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
                src={necklace}
                alt="necklace"
              />

            </div>

            {/* EARRINGS */}

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
                src={earring}
                alt="earrings"
              />

            </div>

          </div>

        </div>

        {/* INSPIRATIONS */}

        <div className="section">

          <div className="section-header">

            <h2>Inspirations</h2>

            <span>View all</span>

          </div>

          <div className="recent-grid">

            <div className="recent-card">

              <img
                src={image1}
                alt=""
              />

              <h4>Pink Pearl</h4>

              <p>Edited 2 days ago</p>

            </div>

            <div className="recent-card">

              <img
                src={image2}
                alt=""
              />

              <h4>Lavender Love</h4>

              <p>Edited 5 days ago</p>

            </div>

            <div className="recent-card">

              <img
                src={image}
                alt=""
              />

              <h4>Golden Charm</h4>

              <p>Edited yesterday</p>

            </div>

            <div className="recent-card">

              <img
                src={earring}
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