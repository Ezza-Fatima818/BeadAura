import React, {
  useState
} from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import "./ResetPassword.css";

export default function ResetPassword() {

  const { token } =
    useParams();

  const navigate =
    useNavigate();

  const [password,
    setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword
  ] = useState("");

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      // PASSWORD MATCH

      if (
        password !==
        confirmPassword
      ) {

        return alert(
          "Passwords do not match"
        );

      }

      try {

        const res =
          await fetch(

            `http://localhost:5000/api/auth/reset-password/${token}`,

            {

              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                password,
              }),
            }
          );

        const data =
          await res.json();

        alert(data.message);

        if (res.ok) {

          navigate("/login");

        }

      } catch (err) {

        console.log(err);

        alert("Server error");

      }

    };

  return (

    <div className="reset-page">

      <div className="reset-card">

        <div className="reset-left">

          {/* LOGO */}

          <div className="reset-logo">

            BeadAura <span>●</span>

          </div>

          {/* TITLE */}

          <h1>
            Reset Password
          </h1>

          {/* SUBTITLE */}

          <p className="subtitle">

            Create a strong new
            password for your
            BeadAura account.

          </p>

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
          >

            {/* PASSWORD */}

            <div className="input-group">

              <label>
                New Password
              </label>

              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                required
              />

            </div>

            {/* CONFIRM */}

            <div className="input-group">

              <label>
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="••••••••"
                value={
                  confirmPassword
                }
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                required
              />

            </div>

            {/* BUTTON */}

            <button type="submit">

              Update Password

            </button>

          </form>
          <p className="back-login-text">

  Remember your password?

  <span
    onClick={() =>
      navigate("/login")
    }
  >

    Back to Login

  </span>

</p>

        </div>

      </div>

    </div>

  );

}