// Login.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

import bracelet from "../assets/bracelet.png";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {

        // STORE USER DATA

        localStorage.setItem(
          "token",
          data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        localStorage.setItem(
          "userId",
          data.user._id
        );

        alert("Login successful");

        // ROLE BASED NAVIGATION

        const role = data.user.role;

        if (role === "admin") {

          navigate("/admin");

        }

        else if (role === "customer") {

          navigate("/dashboard");

        }

        else {

          alert("Incorrect credentials");

        }

      }

      else {

        alert(data.message);

      }

    }

    catch (error) {

      console.error(error);

      alert("Server error");

    }

  };

  return (

    <div className="login-page">

      <div className="login-card">

        {/* LEFT SIDE */}

        <div className="login-left">

          <div className="login-logo">
            BeadAura <span>●</span>
          </div>

          <h1>Welcome Back</h1>

          <p className="subtitle">
            Sign in to continue designing your
            custom jewelry.
          </p>

          <form onSubmit={handleSubmit}>

            {/* EMAIL */}

            <div className="input-group">

              <label>Email Address</label>

              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

            </div>

            {/* PASSWORD */}

            <div className="input-group">

              <div className="password-row">

                <label>Password</label>

                <span>
                  Forgot password?
                </span>

              </div>

              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

            </div>

            {/* BUTTON */}

            <button type="submit">
              Sign In
            </button>

          </form>

          {/* DIVIDER */}

          <div className="divider"></div>

          {/* SIGNUP */}

          <p className="signup-text">
            Don’t have an account?
          </p>

          <button
            className="create-btn"
            onClick={() => navigate("/signup")}
          >
            Create an account
          </button>

        </div>

        {/* RIGHT SIDE */}

        <div className="login-right">

          <div className="overlay"></div>

          <img
            src={bracelet}
            alt="bracelet"
          />

          <div className="right-content">

            <h2>
              Design Jewelry
              <br />
              With Elegance
            </h2>

            <p>
              Create beautiful custom bead
              designs with colors, styles,
              and patterns tailored just
              for you.
            </p>

          </div>

        </div>

      </div>

    </div>

  );

};

export default Login;