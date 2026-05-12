// AdminDashboard.js

import React, { useState, useEffect } from "react";
import "../pages/AdminDashboard.css";

import AdminProducts from "./AdminProducts";
import AdminUsers from "./AdminUsers";
import AdminOrders from "./AdminOrders";
import AdminReports from "./AdminReports";
import AdminProfile from "./AdminProfile";

export default function AdminDashboard() {

  const [active, setActive] = useState("dashboard");

  /* PROFILE */
  const [adminProfile, setAdminProfile] = useState({
    name: "Admin",
    image:
      "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  });

  /* DASHBOARD STATS */
  /* DASHBOARD STATS */
const [totalUsers, setTotalUsers] = useState(0);

const [totalOrders, setTotalOrders] = useState(0);

const [recentOrders, setRecentOrders] = useState([]);

  /* LOAD PROFILE */
  useEffect(() => {

    const savedProfile =
      localStorage.getItem("adminProfile");

    if (savedProfile) {

      const parsedProfile =
        JSON.parse(savedProfile);

      setAdminProfile(parsedProfile);

    }

  }, []);

  /* FETCH DASHBOARD DATA */
  useEffect(() => {

    fetchDashboardData();

  }, []);

  const fetchDashboardData = async () => {

  try {

    /* USERS */
    const usersRes = await fetch(
      "http://localhost:5000/api/users"
    );

    const usersData =
      await usersRes.json();

    setTotalUsers(
      usersData.length || 0
    );

    /* ORDERS */
    const ordersRes = await fetch(
      "http://localhost:5000/api/orders"
    );

    const ordersData =
      await ordersRes.json();

    setTotalOrders(
      ordersData.length || 0
    );

    /* RECENT ORDERS */
    setRecentOrders(
      ordersData.slice(0, 5)
    );

  } catch (err) {

    console.error(err);

  }
};

  return (

    <div className="admin-container">

      {/* SIDEBAR */}
      <div className="sidebar">

        <div className="logo-section">

          <h2>BeadAura</h2>

          <span className="logo-dot"></span>

        </div>

        <div className="menu">

          <p
            className={
              active === "dashboard"
                ? "active"
                : ""
            }
            onClick={() =>
              setActive("dashboard")
            }
          >

            Dashboard

          </p>

          <p
            className={
              active === "products"
                ? "active"
                : ""
            }
            onClick={() =>
              setActive("products")
            }
          >

            Products

          </p>

          <p
            className={
              active === "orders"
                ? "active"
                : ""
            }
            onClick={() =>
              setActive("orders")
            }
          >

            Orders

          </p>

          <p
            className={
              active === "users"
                ? "active"
                : ""
            }
            onClick={() =>
              setActive("users")
            }
          >

            Users

          </p>

          <p
            className={
              active === "reports"
                ? "active"
                : ""
            }
            onClick={() =>
              setActive("reports")
            }
          >

            Reports

          </p>

        </div>

      </div>

      {/* MAIN */}
      <div className="main">

        {/* HEADER */}
        <div className="header">

          <div>

            <h1>
              {active.charAt(0)
                .toUpperCase() +
                active.slice(1)}
            </h1>

            <p className="subtitle">
              Welcome to your luxury jewelry dashboard
            </p>

          </div>

          {/* PROFILE */}
          <div
            className="admin-profile"
            onClick={() =>
              setActive("profile")
            }
          >

            <img
              src={
                adminProfile.image ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="Admin"
            />

            <div>

              <h4>
                {adminProfile.name ||
                  "Admin"}
              </h4>

              <span>
                Administrator
              </span>

            </div>

          </div>

        </div>

        {/* DASHBOARD */}
        {active === "dashboard" && (

          <>

            {/* ANALYTICS CARDS */}
            <div className="dashboard-cards">

              {/* ORDERS */}
              <div className="analytics-card">

                <div className="card-top">

                  <div className="card-icon orders-icon">
                    📦
                  </div>

                  <div className="progress-circle purple-circle">
                    {totalOrders}
                  </div>

                </div>

                <h4>Total Orders</h4>

                <h2>
                  {totalOrders}
                </h2>

                <p>All Orders</p>

              </div>

              {/* USERS */}
              <div className="analytics-card">

                <div className="card-top">

                  <div className="card-icon users-icon">
                    👤
                  </div>

                  <div className="progress-circle green-circle">
                    {totalUsers}
                  </div>

                </div>

                <h4>Total Users</h4>

                <h2>
                  {totalUsers}
                </h2>

                <p>Registered Users</p>

              </div>

            </div>

            {/* RECENT ORDERS */}
            <div className="table-container">

              <div className="table-header">

                <h3>
                  Recent Orders
                </h3>

              </div>

              <table>

                <thead>

                  <tr>

                    <th>Product</th>

                    <th>Price</th>

                    <th>Status</th>

                  </tr>

                </thead>

               <tbody>

  {recentOrders.length > 0 ? (

    recentOrders.map((order) => (

      <tr key={order._id}>

        {/* PRODUCT */}
        <td>

          {order.products?.[0]?.productId
            ?.productName ||
            "Custom Jewelry"}

        </td>

        {/* PRICE */}
        <td>

          Rs. {order.totalAmount || 0}

        </td>

        {/* STATUS */}
        <td>

          <span
            className={`status ${order.status?.toLowerCase()}`}
          >

            {order.status}

          </span>

        </td>

      </tr>

    ))

  ) : (

    <tr>

      <td
        colSpan="3"
        className="no-orders"
      >

        No recent orders found

      </td>

    </tr>

  )}

</tbody>

              </table>

            </div>

          </>

        )}

        {/* PAGES */}
        {active === "products" && (
          <AdminProducts />
        )}

        {active === "orders" && (
          <AdminOrders />
        )}

        {active === "users" && (
          <AdminUsers />
        )}

        {active === "reports" && (
          <AdminReports />
        )}

        {active === "profile" && (
          <AdminProfile />
        )}

      </div>

    </div>
  );
}