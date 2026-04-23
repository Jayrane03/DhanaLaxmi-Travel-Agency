import React, { useEffect, useState } from "react";
import axios from "axios";
import "./admin.css";

function AdminBooking() {

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const getImage = (location) => {
    if (!location) {
      return "https://loremflickr.com/600/400/travel";
    }
    const city = location.split(" ")[0];
    return `https://loremflickr.com/600/400/${city},travel?lock=${city}`;
  };

  // FETCH
  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/bookings",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setBookings(res.data.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this booking?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/bookings/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setBookings(prev => prev.filter(b => b._id !== id));
    } catch (err) {
      alert("Delete failed ❌");
    }
  };

  // STATUS UPDATE
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/admin/booking/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setBookings(prev =>
        prev.map(b =>
          b._id === id ? { ...b, status } : b
        )
      );
    } catch (err) {
      alert("Status update failed ❌");
    }
  };

  const getStatusClass = (status) => {
    if (status === "Confirmed") return "status-confirmed";
    if (status === "Cancelled") return "status-cancelled";
    return "status-pending";
  };

  return (
    <div className="admin-container">

      {/* HEADER */}
      <div className="admin-header">
        <h1>📋 Booking Management</h1>
        <p>Track, update and manage all bookings</p>
      </div>

      {loading ? (
        <p className="text-center">Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p className="text-center">No bookings found</p>
      ) : (

        <div className="admin-grid">

          {bookings.map((b) => (
            <div key={b._id} className="admin-card booking-card">

              {/* IMAGE */}
              <img
                src={getImage(b.destination)}
                alt={b.destination}
                className="booking-img"
              />

              <div className="booking-content">

                {/* TITLE */}
                <h3>
                  <i className="fa fa-map-marker-alt text-primary me-2"></i>
                  {b.destination}
                </h3>

                {/* DETAILS */}
                <p>
                  <i className="fa fa-user text-primary me-2"></i>
                  {b.name}
                </p>

                <p>
                  <i className="fa fa-envelope text-primary me-2"></i>
                  {b.email}
                </p>

                <p>
                  <i className="fa fa-calendar text-primary me-2"></i>
                  {new Date(b.date).toLocaleDateString()}
                </p>

                <p>
                  <i className="fa fa-users text-primary me-2"></i>
                  {b.persons} Persons
                </p>

                {b.message && (
                  <p className="booking-note">
                    <i className="fa fa-comment text-primary me-2"></i>
                    "{b.message}"
                  </p>
                )}

                {/* STATUS BADGE */}
                <div className="status-box">
                  <span className={`status-badge ${getStatusClass(b.status)}`}>
                    {b.status || "Pending"}
                  </span>

                  <select
                    value={b.status || "Pending"}
                    onChange={(e) => updateStatus(b._id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                {/* ACTION */}
                <button
                  className="admin-btn danger mt-2"
                  onClick={() => handleDelete(b._id)}
                >
                  <i className="fa fa-trash me-2"></i>
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default AdminBooking;