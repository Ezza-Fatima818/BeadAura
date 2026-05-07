import { useEffect, useState } from "react";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  // 🔥 FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");

      const data = await res.json();

      console.log("API RESPONSE:", data);

      // ✅ ARRAY SAFETY
      if (Array.isArray(data)) {
        setProducts(data);
      } else if (Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        console.error("Invalid data format:", data);
        setProducts([]);
      }
    } catch (err) {
      console.error(err);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔥 DELETE PRODUCT
  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm("Delete this product?");

    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });

      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  // 🔥 SEARCH FILTER
  const filteredProducts = products.filter((p) => {
    const searchText = search.toLowerCase();

    return (
      p.productName?.toLowerCase().includes(searchText) ||
      p.description?.toLowerCase().includes(searchText) ||
      p._id?.toLowerCase().includes(searchText)
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
        <h2>All Products</h2>

        {/* 🔥 SEARCH */}
        <input
          type="text"
          placeholder="Search products..."
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
          {/* 🔥 TABLE HEADER */}
          <thead>
            <tr
              style={{
                background: "#0f172a",
                color: "#fff",
              }}
            >
              <th style={thStyle}>Product ID</th>
              
              <th style={thStyle}>Product Name</th>
              <th style={thStyle}>Description</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Stock</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>

          {/* 🔥 TABLE BODY */}
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p) => (
                <tr key={p._id}>
                  {/* PRODUCT ID */}
                  <td style={tdStyle}>{p._id}</td>

                 
                  

                  {/* NAME */}
                  <td style={tdStyle}>
                    {p.productName || "No Name"}
                  </td>

                  {/* DESCRIPTION */}
                  <td style={tdStyle}>
                    {p.description || "No Description"}
                  </td>

                  {/* PRICE */}
                  <td style={tdStyle}>
                    Rs. {p.price}
                  </td>

                  {/* CATEGORY */}
                  <td style={tdStyle}>
                    {p.category || "N/A"}
                  </td>

                  {/* STOCK */}
                  <td style={tdStyle}>
                    {p.stock || 0}
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
                      onClick={() => deleteProduct(p._id)}
                      style={{
                        background: "red",
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
                  colSpan="8"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  No products available
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