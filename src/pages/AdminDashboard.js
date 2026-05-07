import React, { useState } from "react";
import "../pages/AdminDashboard.css";


// 🔥 IMPORT FUNCTIONAL COMPONENTS
import AdminProducts from "./AdminProducts";
import AdminUsers from "./AdminUsers";
import AdminOrders from "./AdminOrders";
import AdminReports from "./AdminReports";
import AdminProfile from "./AdminProfile";

export default function AdminDashboard() {
  const [active, setActive] = useState("dashboard");

  return (
    <div className="admin-container">

      {/* 🔥 SIDEBAR */}
      <div className="sidebar">
        <h2>BeadAura</h2>

        <p
          className={active === "dashboard" ? "active" : ""}
          onClick={() => setActive("dashboard")}
        >
          Dashboard
        </p>

        <p
          className={active === "products" ? "active" : ""}
          onClick={() => setActive("products")}
        >
          Products
        </p>

        <p
          className={active === "orders" ? "active" : ""}
          onClick={() => setActive("orders")}
        >
          Orders
        </p>

        <p
          className={active === "users" ? "active" : ""}
          onClick={() => setActive("users")}
        >
          Users
        </p>

         <p
          className={active === "reports" ? "active" : ""}
          onClick={() => setActive("reports")}
        >
          Reports
        </p>
      </div>

      {/* 🔥 MAIN CONTENT */}
      <div className="main">

        {/* HEADER */}
        <div className="header">
          <h1>
            {active.charAt(0).toUpperCase() + active.slice(1)}
          </h1>
          <div
  onClick={() => setActive("profile")}
  style={{
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
  }}
>
  <img
    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
    alt="Admin"
    style={{
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      objectFit: "cover",
    }}
  />

  <span>Admin</span>
</div>
        </div>

        {/* 🔥 DYNAMIC CONTENT */}

        {active === "dashboard" && (
          <>
            {/* CARDS */}
            <div className="cards">

              <div className="card">
                <h4>Total Sales</h4>
                <h2>$25,024</h2>
              </div>

              <div className="card">
                <h4>Orders</h4>
                <h2>52</h2>
              </div>

              <div className="card">
                <h4>Users</h4>
                <h2>7</h2>
              </div>

            </div>

            {/* TABLE */}
            <div className="table-container">
              <h3>Recent Orders</h3>

              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>Bracelet</td>
                    <td>$20</td>
                    <td>Pending</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}

{active === "products" && <AdminProducts />}

{active === "orders" && <AdminOrders />}

{active === "users" && <AdminUsers />}

{active === "reports" && <AdminReports />}

{active === "profile" && <AdminProfile />}
      </div>
    </div>
  );
}