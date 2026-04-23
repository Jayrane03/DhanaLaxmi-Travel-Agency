import React, { useEffect, useState } from "react";
import axios from "axios";
import "./admin.css";

function Users() {

  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const token = localStorage.getItem("token");

  // ---------------- FETCH ----------------
  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setUsers(res.data.data);
      setFiltered(res.data.data);
      setLoading(false);

    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ---------------- SEARCH + FILTER ----------------
  useEffect(() => {
    let temp = users;

    if (search) {
      temp = temp.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (roleFilter !== "all") {
      temp = temp.filter(u => u.role === roleFilter);
    }

    setFiltered(temp);

  }, [search, roleFilter, users]);

  // ---------------- DELETE ----------------
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/admin/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setUsers(users.filter(u => u._id !== id));

    } catch (err) {
      alert("Delete failed ❌");
    }
  };

  // ---------------- TOGGLE ROLE ----------------
  const toggleRole = async (id, currentRole) => {
    try {
      const newRole = currentRole === "admin" ? "user" : "admin";

      await axios.put(
        `http://localhost:5000/api/admin/users/${id}`,
        { role: newRole },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setUsers(users.map(u =>
        u._id === id ? { ...u, role: newRole } : u
      ));

    } catch (err) {
      alert("Role update failed ❌");
    }
  };

  return (
    <div className="admin-container">

      {/* HEADER */}
      <div className="admin-header">
        <h1>👥 Users Management</h1>
        <p>Total Users: {users.length}</p>
      </div>

      {/* CONTROLS */}
      <div className="user-controls">

        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setRoleFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>

      </div>

      {loading ? (
        <p className="text-center">Loading users...</p>
      ) : (

        <div className="users-table">

          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((user, index) => (
                <tr key={user._id}>

                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>

                  <td>
                    <span className={`role ${user.role}`}>
                      {user.role}
                    </span>
                  </td>

                  <td>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>

                  <td className="action-buttons">

                    <button
                      className="toggle-btn"
                      onClick={() => toggleRole(user._id, user.role)}
                    >
                      {user.role === "admin" ? "Remove Admin" : "Make Admin"}
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(user._id)}
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

export default Users;