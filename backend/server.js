const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   ROUTES
========================= */

const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const userRoutes = require("./routes/userRoutes");

const orderRoutes = require("./routes/orderRoutes");

const reportRoutes = require("./routes/reportRoutes");

/* 🔥 ADD THIS */
const beadRoutes = require("./routes/beadRoutes");

app.use("/api/users", userRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/reports", reportRoutes);

/* 🔥 ADD THIS */
app.use("/api/beads", beadRoutes);

/* =========================
   DATABASE
========================= */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    console.log("MongoDB connected")
  )
  .catch((err) => console.log(err));

/* =========================
   SERVER
========================= */

app.listen(5000, () => {
  console.log(
    "Server running on port 5000"
  );
});