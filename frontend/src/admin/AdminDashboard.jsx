import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./admin.css";

function AdminDashboard() {
  const navigate = useNavigate();

  // 🔥 Stats state
  const [stats, setStats] = useState({
    users: 0,
    bookings: 0,
    packages: 0,
  });

  // 🔥 Fetch stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const [usersRes, bookingsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/admin/users", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/bookings", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setStats({
          users: usersRes.data.count || usersRes.data.data.length,
          bookings: bookingsRes.data.count || bookingsRes.data.data.length,
          packages: 25, // static or later from DB
        });

      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="admin-container">

      {/* HEADER */}
      <div className="admin-header">
        <h1>👑 Admin Dashboard</h1>
        <p>Manage packages, bookings and users</p>
      </div>

      {/* 🔥 STATS */}
      <div className="admin-stats">

        <div className="stat-card">
          <h2>{stats.users}</h2>
          <p>Users</p>
        </div>

        <div className="stat-card">
          <h2>{stats.bookings}</h2>
          <p>Bookings</p>
        </div>

        <div className="stat-card">
          <h2>{stats.packages}</h2>
          <p>Packages</p>
        </div>

      </div>

      {/* MAIN GRID */}
      <div className="admin-grid">

        {/* PACKAGES */}
        <div className="admin-card">
          <h2>📦 Manage Packages</h2>
          <p>Add, update or delete travel packages.</p>
          <Link to="/admin/packages" className="admin-btn">
            Manage Packages
          </Link>
        </div>

        {/* BOOKINGS */}
        <div className="admin-card">
          <h2>📋 View Bookings</h2>
          <p>Check all user bookings and manage them.</p>
          <Link to="/admin/bookings" className="admin-btn dark">
            View Bookings
          </Link>
        </div>

        {/* USERS */}
        <div className="admin-card">
          <h2>👥 Users</h2>
          <p>Manage registered users.</p>
          <button
            className="admin-btn  bg-success"
            onClick={() => navigate("/admin/users")}
          >
            Active Users
          </button>
        </div>

        {/* 🔥 NEW: REPORTS */}
        <div className="admin-card">
          <h2>📊 Reports</h2>
          <p>Analyze bookings and performance.</p>
          <button className="admin-btn bg-secondary text-dark"
          onClick={() => navigate("/admin/reports")}>

            Reports
          </button>
        </div>

        {/* 🔥 NEW: SETTINGS */}
        <div className="admin-card">
          <h2>⚙️ Query</h2>
          <p>Manage user query.</p>
         <button className="admin-btn bg-primary text-light "
          onClick={() => navigate("/admin/query")}>

            Query
          </button>
        </div>

        {/* 🔥 NEW: NOTIFICATIONS */}
        <div className="admin-card">
          <h2>🔔 Notifications</h2>
          <p>View alerts and updates.</p>
          <button className="admin-btn outline">
            Coming Soon
          </button>
        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;