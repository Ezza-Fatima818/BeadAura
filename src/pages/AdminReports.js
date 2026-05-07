import { useEffect, useState } from "react";

export default function AdminReports() {
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");

  // 🔥 FETCH REPORTS
  const fetchReports = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/reports");

      const data = await res.json();

      setReports(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setReports([]);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // 🔥 UPDATE STATUS
  const updateStatus = async (id, newStatus) => {
    try {
      await fetch(`http://localhost:5000/api/reports/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      fetchReports();
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 SEARCH FILTER
  const filteredReports = reports.filter((r) => {
    const searchText = search.toLowerCase();

    return (
      r.productName?.toLowerCase().includes(searchText) ||
      r.issue?.toLowerCase().includes(searchText) ||
      r.status?.toLowerCase().includes(searchText) ||
      r.productId?.toLowerCase().includes(searchText)
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
        <h2>User Complaint Reports</h2>

        {/* 🔥 SEARCH */}
        <input
          type="text"
          placeholder="Search reports..."
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
          {/* 🔥 HEADERS */}
          <thead>
            <tr
              style={{
                background: "#0f172a",
                color: "#fff",
              }}
            >
              <th style={thStyle}>Report ID</th>
              <th style={thStyle}>Product ID</th>
              <th style={thStyle}>Seller ID</th>
              <th style={thStyle}>Product</th>
              <th style={thStyle}>Issue</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Update Status</th>
            </tr>
          </thead>

          {/* 🔥 BODY */}
          <tbody>
            {filteredReports.length > 0 ? (
              filteredReports.map((r) => (
                <tr key={r._id}>
                  {/* REPORT ID */}
                  <td style={tdStyle}>{r._id}</td>

                  {/* PRODUCT ID */}
                  <td style={tdStyle}>
                    {r.productId || "No Product"}
                  </td>

                  {/* SELLER ID */}
                  <td style={tdStyle}>
                    {r.sellerId || "No Seller"}
                  </td>

                  {/* PRODUCT NAME */}
                  <td style={tdStyle}>
                    {r.productName || "Unknown Product"}
                  </td>

                  {/* ISSUE */}
                  <td style={tdStyle}>
                    {r.issue || "No Issue"}
                  </td>

                  {/* STATUS */}
                  <td style={tdStyle}>
                    <span
                      style={{
                        background:
                          r.status === "Resolved"
                            ? "#dcfce7"
                            : "#fef3c7",

                        color:
                          r.status === "Resolved"
                            ? "#15803d"
                            : "#92400e",

                        padding: "6px 12px",
                        borderRadius: "20px",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {r.status}
                    </span>
                  </td>

                  {/* DATE */}
                  <td style={tdStyle}>
                    {new Date(r.createdAt).toLocaleDateString()}
                  </td>

                  {/* UPDATE STATUS */}
                  <td style={tdStyle}>
                    <select
                      value={r.status}
                      onChange={(e) =>
                        updateStatus(r._id, e.target.value)
                      }
                      style={{
                        padding: "8px",
                        borderRadius: "6px",
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Review">In Review</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  No reports found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 🔥 HEADER STYLE
const thStyle = {
  padding: "15px",
  textAlign: "left",
  borderBottom: "1px solid #ddd",
};

// 🔥 CELL STYLE
const tdStyle = {
  padding: "15px",
  borderBottom: "1px solid #eee",
  verticalAlign: "middle",
};