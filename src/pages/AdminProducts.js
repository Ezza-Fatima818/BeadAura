import { useEffect, useState } from "react";

export default function AdminProducts() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  // FETCH PRODUCTS
  const fetchProducts = async () => {

    try {

      const res = await fetch(
        "http://localhost:5000/api/products"
      );

      const data = await res.json();

      if (Array.isArray(data)) {
        setProducts(data);
      }
      else if (Array.isArray(data.products)) {
        setProducts(data.products);
      }
      else {
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

  // DELETE PRODUCT
  const deleteProduct = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this product?"
    );

    if (!confirmDelete) return;

    try {

      await fetch(
        `http://localhost:5000/api/products/${id}`,
        {
          method: "DELETE",
        }
      );

      fetchProducts();

    } catch (err) {

      console.error(err);

    }
  };

  // SEARCH FILTER
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

      {/* HEADER */}
      <div className="products-header">

        <div>

          <h2 className="products-title">
            All Products
          </h2>

          <p className="products-subtitle">
            Manage your luxury jewelry collection
          </p>

        </div>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="products-search"
        />

      </div>

      {/* TABLE */}
      <div className="products-table-container">

        <table className="products-table">

          {/* TABLE HEADER */}
          <thead>

            <tr>

              <th>Product ID</th>

              <th>Product Name</th>

              <th>Description</th>

              <th>Price</th>

              <th>Category</th>

              <th>Stock</th>

              <th>Action</th>

            </tr>

          </thead>

          {/* TABLE BODY */}
          <tbody>

            {filteredProducts.length > 0 ? (

              filteredProducts.map((p) => (

                <tr key={p._id}>

                  {/* PRODUCT ID */}
                  <td>
                    {p._id}
                  </td>

                  {/* PRODUCT NAME */}
                  <td className="product-name">

                    {p.productName || "No Name"}

                  </td>

                  {/* DESCRIPTION */}
                  <td>

                    {p.description ||
                      "No Description"}

                  </td>

                  {/* PRICE */}
                  <td>

                    Rs. {p.price}

                  </td>

                  {/* CATEGORY */}
                  <td>

                    {p.category || "N/A"}

                  </td>

                  {/* STOCK */}
                  <td>

                    {p.stock || 0}

                  </td>

                  {/* ACTIONS */}
                  <td>

                    <div className="action-buttons">


                      {/* DELETE */}
                      <button
                        className="product-delete-btn"
                        onClick={() =>
                          deleteProduct(p._id)
                        }
                      >

                        Delete

                      </button>

                    </div>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="7"
                  className="no-products"
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