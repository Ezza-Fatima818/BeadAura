import React, {
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import "./ForgotPassword.css";

export default function ForgotPassword() {

  const [email, setEmail] =
    useState("");

  const navigate =
    useNavigate();

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const res =
          await fetch(

            "http://localhost:5000/api/auth/forgot-password",

            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                email,
              }),
            }
          );

        const text = await res.text();

console.log(text);

const data = JSON.parse(text);

        alert(data.message);

      } catch (err) {

        console.log(err);

        alert("Server error");

      }

    };

  return (

    <div className="forgot-page">

      <div className="forgot-card">

        <h1>
          Forgot Password
        </h1>

        <p>
          Enter your email to
          receive a reset link.
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <button type="submit">
            Send Reset Link
          </button>

        </form>

        <span
          className="back-login"
          onClick={() =>
            navigate("/login")
          }
        >
          Back to Login
        </span>

      </div>

    </div>

  );

}