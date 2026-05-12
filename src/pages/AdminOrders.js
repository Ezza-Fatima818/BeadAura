import { useEffect, useState } from "react";

export default function AdminOrders() {

  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  // FETCH ORDERS
  const fetchOrders = async () => {

    try {

      const res = await fetch(
        "http://localhost:5000/api/orders"
      );

      const data = await res.json();

      setOrders(Array.isArray(data) ? data : []);

    } catch (err) {

      console.error(err);
      setOrders([]);

    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // UPDATE STATUS
  const updateStatus = async (id, newStatus) => {

    try {

      await fetch(
        `http://localhost:5000/api/orders/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      fetchOrders();

    } catch (err) {

      console.error(err);

    }
  };

  // DELETE ORDER
  const deleteOrder = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this order?"
    );

    if (!confirmDelete) return;

    try {

      await fetch(
        `http://localhost:5000/api/orders/${id}`,
        {
          method: "DELETE",
        }
      );

      fetchOrders();

    } catch (err) {

      console.error(err);

    }
  };

  // SEARCH
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

    <div>

      {/* HEADER */}
      <div className="orders-header">

        <div>

          <h2 className="orders-title">
            All Orders
          </h2>

          <p className="orders-subtitle">
            Manage customer jewelry orders
          </p>

        </div>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search orders..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="orders-search"
        />

      </div>

      {/* TABLE */}
      <div className="orders-table-container">

        <table className="orders-table">

          <thead>

            <tr>

              <th>Order ID</th>
              <th>User</th>
              <th>Products</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Update</th>
              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {filteredOrders.length > 0 ? (

              filteredOrders.map((o) => (

                <tr key={o._id}>

                  {/* ORDER ID */}
                  <td>{o._id}</td>

                  {/* USER */}
                  <td className="order-user">

                    {o.userId?.name ||
                      o.userId?.email ||
                      "Unknown"}

                  </td>

                  {/* PRODUCTS */}
                  <td>

                    {o.products?.map((p, index) => (

                      <div key={index}>

                        {p.productId?.name} × {p.quantity}

                      </div>

                    ))}

                  </td>

                  {/* TOTAL */}
                  <td>
                    Rs. {o.totalAmount}
                  </td>

                  {/* PAYMENT */}
                  <td>
                    {o.paymentMethod}
                  </td>

                  {/* STATUS */}
                  <td>

                    <span
                      className={`order-status ${o.status.toLowerCase()}`}
                    >

                      {o.status}

                    </span>

                  </td>

                  {/* UPDATE */}
                  <td>

                    <select
                      value={o.status}
                      onChange={(e) =>
                        updateStatus(
                          o._id,
                          e.target.value
                        )
                      }
                      className="orders-select"
                    >

                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Shipped">
                        Shipped
                      </option>

                      <option value="Delivered">
                        Delivered
                      </option>

                      <option value="Cancelled">
                        Cancelled
                      </option>

                    </select>

                  </td>

                  {/* DELETE */}
                  <td>

                    <button
                      className="order-delete-btn"
                      onClick={() =>
                        deleteOrder(o._id)
                      }
                    >

                      Delete

                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="8"
                  className="no-orders"
                >

                  No orders found

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}