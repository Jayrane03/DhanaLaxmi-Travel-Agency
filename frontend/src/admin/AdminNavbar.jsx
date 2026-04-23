import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./admin.css";

function AdminNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const name = user?.user?.name || "Admin";
  const firstLetter = name.charAt(0).toUpperCase();

  const handleLogout = () => {
    logout();
    navigate("/register");
  };

  return (
    <div className="admin-navbar">

      {/* LEFT */}
      <div className="admin-logo" onClick={() => navigate("/admin")}>
        👑 Admin Panel
      </div>

      {/* RIGHT */}
      <div className="admin-user">

        <div className="admin-avatar">
          {firstLetter}
        </div>

        <span className="admin-name">{name}</span>

        <button onClick={handleLogout} className="admin-logout">
          Logout
        </button>

      </div>

    </div>
  );
}

export default AdminNavbar;