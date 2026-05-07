import { useEffect, useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
const [search, setSearch] = useState("");
  // 🔥 FETCH ORDERS
  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/orders");
      const data = await res.json();

      console.log("ORDERS:", data);

      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setOrders([]);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🔥 UPDATE ORDER STATUS
  const updateStatus = async (id, newStatus) => {
    try {
      await fetch(`http://localhost:5000/api/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 DELETE ORDER
  const deleteOrder = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:5000/api/orders/${id}`, {
        method: "DELETE",
      });

      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredOrders = orders.filter((o) => {
  const searchText = search.toLowerCase();

  return (
    o._id?.toLowerCase().includes(searchText) ||
    o.userId?.name?.toLowerCase().includes(searchText) ||
    o.paymentMethod?.toLowerCase().includes(searchText) ||
    o.status?.toLowerCase().includes(searchText)
  );
});

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>All Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div style={{ overflowX: "auto" }}>

<div
  style={{
    marginBottom: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }}
>
  <input
    type="text"
    placeholder="Search by Order ID, User, Status..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={{
      padding: "12px",
      width: "350px",
      borderRadius: "10px",
      border: "1px solid #ccc",
      outline: "none",
      fontSize: "14px",
    }}
  />
</div>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              background: "#fff",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <thead>
              <tr style={{ background: "#111827", color: "#fff" }}>
                <th style={thStyle}>Order ID</th>
                <th style={thStyle}>User</th>
                <th style={thStyle}>Products</th>
                <th style={thStyle}>Product ID</th>
                <th style={thStyle}>Seller ID</th>
                <th style={thStyle}>Total</th>
                <th style={thStyle}>Payment Method</th>
                <th style={thStyle}>Payment Status</th>
                <th style={thStyle}>Order Status</th>
                <th style={thStyle}>Edit Status</th>
                <th style={thStyle}>Delete</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((o) => (
                <tr key={o._id}>
                  {/* ORDER ID */}
                  <td style={tdStyle}>{o._id}</td>

                  {/* USER */}
                  <td style={tdStyle}>
                    {o.userId?.name || o.userId?.email || "Unknown"}
                  </td>

                  {/* PRODUCTS */}
                  <td style={tdStyle}>
                    {o.products?.map((p, index) => (
                      <div key={index}>
                        {p.productId?.name} × {p.quantity}
                      </div>
                    ))}
                  </td>
                  <td style={tdStyle}>
  {o.products?.map((p, index) => (
    <div key={index}>
      {p.productId?._id || "Custom Product"}
    </div>
  ))}
</td>

<td style={tdStyle}>
  {o.products?.map((p, index) => (
    <div key={index}>
      {p.productId?.sellerId || "No Seller"}
    </div>
  ))}
</td>

                  {/* TOTAL */}
                  <td style={tdStyle}>Rs. {o.totalAmount}</td>

                  {/* PAYMENT METHOD */}
                  <td style={tdStyle}>{o.paymentMethod}</td>

                  {/* PAYMENT STATUS */}
                  <td style={tdStyle}>{o.paymentStatus}</td>

                  {/* ORDER STATUS */}
                  <td style={tdStyle}>
                    <span
                      style={{
                        padding: "5px 10px",
                        borderRadius: "20px",
                        background:
                          o.status === "Delivered"
                            ? "#d1fae5"
                            : o.status === "Cancelled"
                            ? "#fee2e2"
                            : o.status === "Shipped"
                            ? "#dbeafe"
                            : "#fef3c7",
                        color:
                          o.status === "Delivered"
                            ? "green"
                            : o.status === "Cancelled"
                            ? "red"
                            : o.status === "Shipped"
                            ? "blue"
                            : "#92400e",
                        fontWeight: "bold",
                      }}
                    >
                      {o.status}
                    </span>
                  </td>

                  {/* EDIT STATUS */}
                  <td style={tdStyle}>
                    <select
                      value={o.status}
                      onChange={(e) =>
                        updateStatus(o._id, e.target.value)
                      }
                      style={{
                        padding: "8px",
                        borderRadius: "6px",
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>

                  {/* DELETE */}
                  <td style={tdStyle}>
                    <button
                      onClick={() => deleteOrder(o._id)}
                      style={{
                        background: "red",
                        color: "#fff",
                        border: "none",
                        padding: "8px 14px",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// 🔥 TABLE HEADER STYLE
const thStyle = {
  padding: "14px",
  textAlign: "left",
  borderBottom: "1px solid #ddd",
};

// 🔥 TABLE DATA STYLE
const tdStyle = {
  padding: "14px",
  borderBottom: "1px solid #eee",
};