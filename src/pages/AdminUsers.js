import { useEffect, useState } from "react";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  // 🔥 FETCH USERS
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users");

      const data = await res.json();

      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔥 DELETE USER
  const deleteUser = async (id) => {
    const confirmDelete = window.confirm("Delete this user?");

    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "DELETE",
      });

      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  // 🔥 FILTER USERS
  const filteredUsers = users.filter((u) => {
    const searchText = search.toLowerCase();

    return (
      u.name?.toLowerCase().includes(searchText) ||
      u.email?.toLowerCase().includes(searchText) ||
      u._id?.toLowerCase().includes(searchText)
    );
  });

  return (
    <div>
      {/* 🔥 HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2>All Users</h2>

        {/* 🔥 SEARCH BAR */}
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none",
          }}
        />
      </div>

      {/* 🔥 TABLE */}
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          overflowX: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          {/* 🔥 TABLE HEADERS */}
          <thead>
            <tr
              style={{
                background: "#0f172a",
                color: "#fff",
              }}
            >
              <th style={thStyle}>User ID</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Verified</th>
              <th style={thStyle}>Role</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>

          {/* 🔥 TABLE BODY */}
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((u) => (
                <tr key={u._id}>
                  {/* USER ID */}
                  <td style={tdStyle}>{u._id}</td>

                  {/* NAME */}
                  <td style={tdStyle}>
                    {u.name || "No Name"}
                  </td>

                  {/* EMAIL */}
                  <td style={tdStyle}>
                    {u.email}
                  </td>

                  {/* VERIFIED */}
                  <td style={tdStyle}>
                    <span
                      style={{
                        background: u.isVerified
                          ? "#dcfce7"
                          : "#fee2e2",

                        color: u.isVerified
                          ? "#15803d"
                          : "#dc2626",

                        padding: "6px 12px",
                        borderRadius: "20px",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {u.isVerified ? "Verified" : "Not Verified"}
                    </span>
                  </td>

                  {/* ROLE */}
                  <td style={tdStyle}>
                    {u.role || "User"}
                  </td>

                  {/* ACTION */}
                  <td style={tdStyle}>
                    <button
                      style={{
                        background: "#111827",
                        color: "#fff",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        marginRight: "10px",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteUser(u._id)}
                      style={{
                        background: "#ef4444",
                        color: "#fff",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 🔥 TABLE HEADER STYLE
const thStyle = {
  padding: "15px",
  textAlign: "left",
  borderBottom: "1px solid #ddd",
};

// 🔥 TABLE DATA STYLE
const tdStyle = {
  padding: "15px",
  borderBottom: "1px solid #eee",
  verticalAlign: "middle",
};