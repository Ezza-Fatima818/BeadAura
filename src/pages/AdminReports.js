import { useEffect, useState } from "react";

export default function AdminReports() {

  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");

  // FETCH REPORTS
  const fetchReports = async () => {

    try {

      const res = await fetch(
        "http://localhost:5000/api/reports"
      );

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

  // UPDATE STATUS
  const updateStatus = async (id, newStatus) => {

    try {

      await fetch(
        `http://localhost:5000/api/reports/${id}`,
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

      fetchReports();

    } catch (err) {

      console.error(err);

    }
  };

  // SEARCH FILTER
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

      {/* HEADER */}
      <div className="reports-header">

        <div>

          <h2 className="reports-title">
            Complaint Reports
          </h2>

          <p className="reports-subtitle">
            Manage customer issue reports
          </p>

        </div>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search reports..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="reports-search"
        />

      </div>

      {/* TABLE */}
      <div className="reports-table-container">

        <table className="reports-table">

          {/* HEADERS */}
          <thead>

            <tr>

              <th>Report ID</th>

              <th>Product ID</th>

              <th>Seller ID</th>

              <th>Product</th>

              <th>Issue</th>

              <th>Status</th>

              <th>Date</th>

              <th>Update</th>

            </tr>

          </thead>

          {/* BODY */}
          <tbody>

            {filteredReports.length > 0 ? (

              filteredReports.map((r) => (

                <tr key={r._id}>

                  {/* REPORT ID */}
                  <td>{r._id}</td>

                  {/* PRODUCT ID */}
                  <td>

                    {r.productId || "No Product"}

                  </td>

                  {/* SELLER ID */}
                  <td>

                    {r.sellerId || "No Seller"}

                  </td>

                  {/* PRODUCT */}
                  <td className="report-product-name">

                    {r.productName ||
                      "Unknown Product"}

                  </td>

                  {/* ISSUE */}
                  <td>

                    {r.issue || "No Issue"}

                  </td>

                  {/* STATUS */}
                  <td>

                    <span
                      className={`report-status ${r.status.toLowerCase().replace(/\s/g, "-")}`}
                    >

                      {r.status}

                    </span>

                  </td>

                  {/* DATE */}
                  <td>

                    {new Date(
                      r.createdAt
                    ).toLocaleDateString()}

                  </td>

                  {/* UPDATE */}
                  <td>

                    <select
                      value={r.status}
                      onChange={(e) =>
                        updateStatus(
                          r._id,
                          e.target.value
                        )
                      }
                      className="reports-select"
                    >

                      <option value="Pending">
                        Pending
                      </option>

                      <option value="In Review">
                        In Review
                      </option>

                      <option value="Resolved">
                        Resolved
                      </option>

                      <option value="Rejected">
                        Rejected
                      </option>

                    </select>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="8"
                  className="no-reports"
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