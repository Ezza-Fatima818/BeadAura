const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// ================= SIGNUP =================
exports.signup = async (req, res) => {
  try {
    const { name, email, password, source } = req.body;

    // 🚫 Block signup from web (optional but recommended)
    if (source === "web") {
      return res.status(403).json({ message: "Signup not allowed from web" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Always hash password (even for app users)
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
        role: "customer"
    });

    res.status(201).json({
      message: "Signup successful",
      userId: user._id,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    let isMatch;

    // ✅ Handle BOTH hashed + plain passwords
    if (
      user.password.startsWith("$2a$") ||
      user.password.startsWith("$2b$")
    ) {
      // hashed password (web users)
      isMatch = await bcrypt.compare(password, user.password);
    } else {
      // plain password (old app users)
      isMatch = password === user.password;
    }

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id },
      "SECRET_KEY",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        _id: user._id, 
        name: user.name,
        email: user.email,
          role: user.role
      },
    });

  } catch (err) {
      console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};