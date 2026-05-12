import React, {
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import "./Signup.css";

import bracelet
from "../assets/bracelet.png";

const Signup = () => {

  const navigate =
    useNavigate();

  const [formData,
    setFormData] =
    useState({

      name: "",

      email: "",

      password: "",

      confirmPassword: ""
    });

  const [loading,
    setLoading] =
    useState(false);

  /* HANDLE INPUT */

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value
    });

  };

  /* PASSWORD VALIDATION */

  const validatePassword =
    (password) => {

      const strongPassword =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

      return strongPassword.test(
        password
      );

    };

  /* SUBMIT */

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      // PASSWORD MATCH
      if (
        formData.password !==
        formData.confirmPassword
      ) {

        return alert(
          "Passwords do not match"
        );

      }

      // STRONG PASSWORD
      if (
        !validatePassword(
          formData.password
        )
      ) {

        return alert(

          "Password must contain:\n\n" +

          "• 8+ characters\n" +

          "• Uppercase letter\n" +

          "• Lowercase letter\n" +

          "• Number\n" +

          "• Special character"

        );

      }

      try {

        setLoading(true);

        const res =
          await fetch(

            "http://localhost:5000/api/auth/signup",

            {

              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({

                name:
                  formData.name,

                email:
                  formData.email,

                password:
                  formData.password,
              }),
            }
          );

        const data =
          await res.json();

        if (!res.ok) {

          alert(
            data.message
          );

          setLoading(false);

          return;
        }

        alert(
          "Account created successfully"
        );

        navigate("/login");

      } catch (err) {

        console.log(err);

        alert(
          "Server error"
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="signup-page">

      <div className="signup-card">

        {/* LEFT */}

        <div className="signup-left">

          <div className="signup-logo">

            BeadAura <span>●</span>

          </div>

          <h1>
            Create Account
          </h1>

          

          <form
            onSubmit={handleSubmit}
          >

            {/* NAME */}

            <div className="input-group">

              <label>
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>

            {/* EMAIL */}

            <div className="input-group">

              <label>
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>

            {/* PASSWORD */}

            <div className="input-group">

              <label>
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />

            </div>

            {/* CONFIRM PASSWORD */}

            <div className="input-group">

              <label>
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={
                  formData.confirmPassword
                }
                onChange={handleChange}
                required
              />

            </div>

            {/* BUTTON */}

            <button type="submit">

              {loading
                ? "Creating..."
                : "Create Account"}

            </button>

          </form>

          {/* DIVIDER */}

          <div className="divider"></div>

          {/* LOGIN */}

          <p className="signup-text">

            Already have an account?

          </p>

          <button
            className="login-btn"
            onClick={() =>
              navigate("/login")
            }
          >

            Sign In

          </button>

        </div>

        {/* RIGHT */}

        <div className="signup-right">

          <div className="overlay"></div>

          <img
            src={bracelet}
            alt="bracelet"
          />

          <div className="right-content">

            <h2>

              Luxury Jewelry
              <br />
              Crafted By You

            </h2>

            <p>

              Personalize bracelets,
              necklaces, and earrings
              with elegant designs
              and premium beads.

            </p>

          </div>

        </div>

      </div>

    </div>

  );
};

export default Signup;