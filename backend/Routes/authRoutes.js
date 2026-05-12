const express = require("express");

const router = express.Router();

const bcrypt = require("bcryptjs");

const crypto = require("crypto");

const nodemailer =
  require("nodemailer");

const User =
  require("../models/User");

/* ===================================
   SIGNUP
=================================== */

router.post(
  "/signup",
  async (req, res) => {

    try {

      const {
        name,
        email,
        password
      } = req.body;

      // CHECK EXISTING USER

      const existingUser =
        await User.findOne({
          email
        });

      if (existingUser) {

        return res.status(400).json({
          message:
            "User already exists",
        });

      }

      // HASH PASSWORD

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      // CREATE USER

      const user =
        await User.create({

          name,

          email,

          password:
            hashedPassword,

          role: "customer",
        });

      res.status(201).json({

        message:
          "Signup successful",

        user: {

          id: user._id,

          name: user.name,

          email: user.email,
        },
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          "Server error",
      });

    }

  }
);

/* ===================================
   LOGIN
=================================== */

router.post(
  "/login",
  async (req, res) => {

    try {

      const {
        email,
        password
      } = req.body;

      // FIND USER

      const user =
        await User.findOne({
          email
        });

      if (!user) {

        return res.status(400).json({
          message:
            "Invalid email or password",
        });

      }

      // CHECK PASSWORD

      let isMatch;

if (
  user.password.startsWith("$2a$") ||
  user.password.startsWith("$2b$")
) {

  isMatch = await bcrypt.compare(
    password,
    user.password
  );

} else {

  isMatch = password === user.password;

}

      if (!isMatch) {

        return res.status(400).json({
          message:
            "Invalid email or password",
        });

      }

      res.json({

        message:
          "Login successful",

        user: {

          _id: user._id,

          name: user.name,

          email: user.email,

          role: user.role,
        },
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          "Server error",
      });

    }

  }
);

/* ===================================
   FORGOT PASSWORD
=================================== */

router.post(
  "/forgot-password",
  async (req, res) => {

    try {

      const user =
        await User.findOne({

          email:
            req.body.email,
        });

      if (!user) {

        return res.status(404).json({
          message:
            "User not found",
        });

      }

      // CREATE TOKEN

      const resetToken =
        crypto.randomBytes(32)
          .toString("hex");

      user.resetPasswordToken =
        resetToken;

      user.resetPasswordExpire =
        Date.now() +
        15 * 60 * 1000;

      await user.save();

      // RESET URL

      const resetUrl =
        `http://localhost:3000/reset-password/${resetToken}`;

      // EMAIL TRANSPORTER

      const transporter =
        nodemailer.createTransport({

          service: "gmail",

          auth: {

            user:
              process.env.EMAIL_USER,

            pass:
              process.env.EMAIL_PASS,
          },
        });

      // SEND EMAIL

      await transporter.sendMail({

        from:
          process.env.EMAIL_USER,

        to: user.email,

        subject:
          "BeadAura Password Reset",

        html: `

          <h2>Password Reset</h2>

          <p>
            Click below to reset your password:
          </p>

          <a href="${resetUrl}">
            Reset Password
          </a>

          <p>
            Link expires in 15 minutes.
          </p>

        `,
      });

      res.json({

        message:
          "Reset link sent successfully",
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          err.message,
      });

    }

  }
);

/* ===================================
   RESET PASSWORD
=================================== */

router.post(
  "/reset-password/:token",
  async (req, res) => {

    try {

      const user =
        await User.findOne({

          resetPasswordToken:
            req.params.token,

          resetPasswordExpire: {
            $gt: Date.now(),
          },
        });

      // USER NOT FOUND

      if (!user) {

        return res.status(400).json({

          message:
            "Invalid or expired token",
        });

      }

      // HASH NEW PASSWORD

      const hashedPassword =
        await bcrypt.hash(

          req.body.password,

          10
        );

      // UPDATE PASSWORD

      user.password =
        hashedPassword;

      // REMOVE RESET TOKEN

      user.resetPasswordToken =
        undefined;

      user.resetPasswordExpire =
        undefined;

      await user.save();

      res.json({

        message:
          "Password updated successfully",
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({

        message:
          err.message,
      });

    }

  }
);
module.exports = router;