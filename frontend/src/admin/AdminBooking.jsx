import React, { useEffect, useState } from "react";
import axios from "axios";
import "./admin.css";

function AdminBooking() {

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // IMAGE
  const getImage = (location) => {
    if (!location) return "https://loremflickr.com/600/400/travel";
    const city = location.split(" ")[0];
    return `https://loremflickr.com/600/400/${city},travel?lock=${city}`;
  };

  // FETCH BOOKINGS
  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/bookings",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const sorted = res.data.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setBookings(sorted);

    } catch (err) {
      console.error(err);
    } finally {
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
        `http://localhost:5000/admin/remove${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setBookings(prev => prev.filter(b => b._id !== id));

    } catch (err) {
      alert("Delete failed ❌");
    }
  };

  // UPDATE STATUS
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/admin/booking/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` }
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

  // REFUND
  const handleRefund = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/bookings/refund/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Refund processed 💸");
      fetchBookings();

    } catch (err) {
      alert("Refund failed ❌");
    }
  };

  // COMPLETE
  const markCompleted = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/admin/complete/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      fetchBookings();

    } catch (err) {
      alert("Complete failed ❌");
    }
  };

  // STATUS STYLE
  const getStatusClass = (status) => {
    if (status === "Confirmed") return "status-confirmed";
    if (status === "Cancelled") return "status-cancelled";
    return "status-pending";
  };

  return (
    <div className="admin-container">

      <div className="admin-header">
        <h1>📋 Booking Management</h1>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (

        <div className="admin-grid">

          {bookings.map((b) => (

            <div key={b._id} className="booking-card">

              <img
                src={getImage(b.destination)}
                alt={b.destination}
                className="booking-img"
              />

              <div className="booking-content">

                {/* TOP */}
                <div className="top-row">
                  <h4 className="text-white">{b.destination}</h4>
                  <span className={`status-badge ${getStatusClass(b.status)}`}>
                    {b.status || "Pending"}
                  </span>
                </div>

                {/* INFO */}
                <div className="info-grid">
                  <span>👤 {b.name}</span>
                  <span>👥 {b.persons}</span>
                  <span>📅 {new Date(b.date).toLocaleDateString()}</span>
                  <span>💰 ₹{b.price || 0}</span>
                </div>

                {/* PAYMENT */}
                <div className="payment-row">
                  💳{" "}
                  <b className={
                    b.paymentStatus === "Paid"
                      ? "paid"
                      : b.paymentStatus === "Refunded"
                      ? "refunded"
                      : "unpaid"
                  }>
                    {b.paymentStatus || "Unpaid"}
                  </b>
                </div>

                {/* ACTIONS */}
                <div className="action-row">

                  <select
                    value={b.status || "Pending"}
                    onChange={(e) => updateStatus(b._id, e.target.value)}
                    disabled={b.paymentStatus !== "Paid"}
                  >
                    <option>Pending</option>
                    <option>Confirmed</option>
                    <option>Cancelled</option>
                  </select>

                  {b.paymentStatus === "Paid" && b.status === "Cancelled" && (
                    <button onClick={() => handleRefund(b._id)}>💸</button>
                  )}

                  {b.status === "Confirmed" && !b.completed && (
                    <button onClick={() => markCompleted(b._id)}>✅</button>
                  )}

                  <button onClick={() => handleDelete(b._id)}>🗑</button>

                </div>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default AdminBooking;