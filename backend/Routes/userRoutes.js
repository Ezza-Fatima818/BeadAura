const express = require("express");

const router = express.Router();

const User = require("../models/User");

const nodemailer = require("nodemailer");

const crypto = require("crypto");

const bcrypt = require("bcryptjs");

/* ===================================
   GET ALL USERS
=================================== */

router.get("/", async (req, res) => {

  try {

    const users = await User.find()
      .select("-password");

    res.json(users);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message,
    });

  }

});

/* ===================================
   DELETE USER
=================================== */

router.delete("/:id", async (req, res) => {

  try {

    console.log(
      "DELETE USER:",
      req.params.id
    );

    const deletedUser =
      await User.findByIdAndDelete(
        req.params.id
      );

    if (!deletedUser) {

      return res.status(404).json({
        message: "User not found",
      });

    }

    res.json({
      message:
        "User deleted successfully",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message,
    });

  }

});

/* ===================================
   UPDATE USER
=================================== */

router.put("/:id", async (req, res) => {

  try {

    console.log(
      "UPDATE USER:",
      req.params.id
    );

    console.log(req.body);

    const updatedUser =
      await User.findByIdAndUpdate(

        req.params.id,

        {
          name: req.body.name,

          email: req.body.email,

          role: req.body.role,
        },

        {
          new: true,
        }

      );

    if (!updatedUser) {

      return res.status(404).json({
        message: "User not found",
      });

    }

    res.json({
      message:
        "User updated successfully",

      user: updatedUser,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message,
    });

  }

});

/* ===================================
   SEND RESET PASSWORD LINK
=================================== */

router.post(
  "/send-reset/:id",
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.params.id
        );

      if (!user) {

        return res.status(404).json({
          message: "User not found",
        });

      }

      // GENERATE TOKEN
      const resetToken =
        crypto.randomBytes(32)
          .toString("hex");

      // SAVE TOKEN
      user.resetPasswordToken =
        resetToken;

      user.resetPasswordExpire =
        Date.now() +
        15 * 60 * 1000;

      await user.save();

      // RESET URL
      const resetUrl =
        `http://localhost:3000/reset-password/${resetToken}`;

      // EMAIL TRANSPORT
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
            This link expires in 15 minutes.
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
        message: err.message,
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

      if (!user) {

        return res.status(400).json({
          message:
            "Invalid or expired token",
        });

      }

      // HASH PASSWORD
      const hashedPassword =
        await bcrypt.hash(
          req.body.password,
          10
        );

      // UPDATE PASSWORD
      user.password =
        hashedPassword;

      // CLEAR TOKEN
      user.resetPasswordToken =
        undefined;

      user.resetPasswordExpire =
        undefined;

      await user.save();

      res.json({
        message:
          "Password reset successful",
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message: err.message,
      });

    }

  }
);

module.exports = router;