import { useEffect, useState } from "react";

export default function AdminUsers() {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const [editingUser, setEditingUser] = useState(null);

const [editData, setEditData] = useState({
  name: "",
  email: "",
  role: "",
});

  // FETCH USERS
  const fetchUsers = async () => {

    try {

      const res = await fetch(
        "http://localhost:5000/api/users"
      );

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

  const updateUser = async (id) => {

  try {

    await fetch(
      `http://localhost:5000/api/users/${id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(editData),
      }
    );

    setEditingUser(null);

    fetchUsers();

  } catch (err) {

    console.error(err);

  }
};
  // DELETE USER
  const deleteUser = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this user?"
    );

    if (!confirmDelete) return;

    try {

      await fetch(
        `http://localhost:5000/api/users/${id}`,
        {
          method: "DELETE",
        }
      );

      fetchUsers();

    } catch (err) {

      console.error(err);

    }
  };

  // SEARCH FILTER
  const filteredUsers = users.filter((u) => {

    const searchText = search.toLowerCase();

    return (
      u.name?.toLowerCase().includes(searchText) ||
      u.email?.toLowerCase().includes(searchText) ||
      u._id?.toLowerCase().includes(searchText)
    );
  });

  const sendResetLink = async (id) => {

  try {

    const res = await fetch(
      `http://localhost:5000/api/users/send-reset/${id}`,
      {
        method: "POST",
      }
    );

    const data =
      await res.json();

    alert(data.message);

  } catch (err) {

    console.error(err);

  }
};
  return (

    <div>

      {/* HEADER */}
      <div className="users-header">

        <div>

          <h2 className="users-title">
            All Users
          </h2>

          <p className="users-subtitle">
            Manage BeadAura customers
          </p>

        </div>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="users-search"
        />

      </div>

      {/* TABLE */}
      <div className="users-table-container">

        <table className="users-table">

          {/* HEADERS */}
          <thead>

            <tr>

              <th>User ID</th>

              <th>Name</th>

              <th>Email</th>

              <th>Verified</th>

              <th>Role</th>

              <th>Action</th>

            </tr>

          </thead>

          {/* BODY */}
          <tbody>

            {filteredUsers.length > 0 ? (

              filteredUsers.map((u) => (

                <tr key={u._id}>

                  {/* ID */}
                  <td>{u._id}</td>

                  {/* NAME */}
                  <td className="user-name">

  {editingUser === u._id ? (

    <input
      value={editData.name}
      onChange={(e) =>
        setEditData({
          ...editData,
          name: e.target.value,
        })
      }
    />

  ) : (

    u.name

  )}

</td>

                  {/* EMAIL */}
                  <td>

  {editingUser === u._id ? (

    <input
      value={editData.email}
      onChange={(e) =>
        setEditData({
          ...editData,
          email: e.target.value,
        })
      }
    />

  ) : (

    u.email

  )}

</td>

                  {/* VERIFIED */}
                  <td>

                    <span
                      className={
                        u.isVerified
                          ? "verified-badge"
                          : "not-verified-badge"
                      }
                    >

                      {u.isVerified
                        ? "Verified"
                        : "Not Verified"}

                    </span>

                  </td>

                  {/* ROLE */}
                  <td>

  {editingUser === u._id ? (

    <select
      value={editData.role}
      onChange={(e) =>
        setEditData({
          ...editData,
          role: e.target.value,
        })
      }
    >

      <option value="user">
        User
      </option>

      <option value="admin">
        Admin
      </option>

    </select>

  ) : (

    <span className="user-role">
      {u.role || "user"}
    </span>

  )}

</td>

                 {/* ACTIONS */}
<td>

  <div className="user-action-buttons">

    {/* EDIT */}
    <button
      className="user-edit-btn"
      onClick={() => {

        setEditingUser(u._id);

        setEditData({
          name: u.name,
          email: u.email,
          role: u.role || "user",
        });

      }}
    >

      Edit

    </button>

    {/* SAVE */}
    {editingUser === u._id && (

      <button
        className="save-user-btn"
        onClick={() =>
          updateUser(u._id)
        }
      >

        Save

      </button>

    )}

    {/* DELETE */}
    <button
      className="user-delete-btn"
      onClick={() =>
        deleteUser(u._id)
      }
    >

      Delete

    </button>
    <button
  className="reset-btn"
  onClick={() =>
    sendResetLink(u._id)
  }
>

  Reset Password

</button>

  </div>

</td>


                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="6"
                  className="no-users"
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