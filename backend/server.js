const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const beadRoutes = require("./routes/beadRoutes");
const designRoutes = require("./routes/designRoutes");

// Optional: keep later if you want actual Tripo integration
// const tripoRoutes = require("./routes/tripoRoutes");

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/beads", beadRoutes);
app.use("/api", designRoutes);

// Optional
// app.use("/api", tripoRoutes);


// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));


// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
const tripoRoutes = require("./routes/tripoRoutes");

app.use("/api", tripoRoutes);