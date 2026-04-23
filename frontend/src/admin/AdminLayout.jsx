import React from "react";
import AdminNavbar from "./AdminNavbar";

function AdminLayout({ children }) {
  return (
    <div>

      <AdminNavbar />

      <div style={{ padding: "20px" }}>
        {children}
      </div>

    </div>
  );
}

export default AdminLayout;