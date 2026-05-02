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
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("userId", data.user._id); // 🔥 ADD THIS

      alert("Login successful");

      navigate("/designer"); // or "/" if your home route is "/"
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
    alert("Server error");
  }
};

  return (
    <div className="page">
      <div className="login-container">

        {/* LEFT SIDE */}
        <div className="login-left">
          <h3 className="logo">BeadAura<span className="circle">◯</span></h3>

          <h2>Welcome Back!</h2>
          <p>Sign in to continue designing your custom jewelry</p>

          <form onSubmit={handleSubmit}>
            <label>Email</label> <br />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            /> <br />

            <label>Password</label> <br />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            /> <br />

            <button type="submit">Sign In</button>
          </form>

          <div className="divider"><span>OR</span></div>

          <button className="google-btn">Continue with Google</button>

          <p className="signup">
            <span className="signup-link" onClick={() => navigate("/signup")}>
    Sign Up
  </span>

          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="login-right">
          <h1>Design Jewelry with Elegance</h1>
          <p>
            Create beautiful custom bead designs with colors, styles, and patterns
            tailored just for you.
          </p>
          <img src={bracelet} alt="Beaded bracelet" />
        </div>

      </div>
    </div>
  );
};

export default Login;