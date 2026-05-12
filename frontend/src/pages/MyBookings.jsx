import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function MyBookings() {

  const { user } = useAuth();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const getImage = (location) => {
    if (!location) return "https://loremflickr.com/600/400/travel";
    const city = location.split(" ")[0];
    return `https://loremflickr.com/600/400/${city},travel?lock=${city}`;
  };

  // FETCH
  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/bookings/my",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setBookings(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // CANCEL BOOKING
  const handleCancel = async (id) => {
    if (!window.confirm("Cancel booking? Your money will be refunded 💸")) return;

    try {
      await axios.put(
        `http://localhost:5000/api/bookings/${id}/cancel`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Booking cancelled. Refund will be processed 💸");

      // refresh
      fetchBookings();

    } catch (err) {
      console.error(err);
      alert("Cancel failed ❌");
    }
  };

  return (
    <div>

      {/* HERO */}
      <div className="container-fluid bg-primary py-5 mb-5 hero-header">
        <div className="container text-center">
          <h1 className="display-4 text-white">My Bookings</h1>
          <p className="text-white">Track and manage your travel plans</p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="container py-5">

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : bookings.length === 0 ? (
          <p className="text-center">No bookings found</p>
        ) : (

          <div className="row g-4">

            {bookings.map((booking) => (
              <div key={booking._id} className="col-lg-4 col-md-6">

                <div className="package-item shadow rounded overflow-hidden">

                  <img
                    className="img-fluid"
                    src={getImage(booking.destination)}
                    alt={booking.destination}
                  />

                  <div className="p-4">

                    <h5>{booking.destination}</h5>

                    <p>
                      📅 {new Date(booking.date).toLocaleDateString()}
                    </p>

                    <p>👤 {booking.persons} Persons</p>

                    {/* BOOKING STATUS */}
                    <span className={`badge ${
                      booking.status === "Confirmed"
                        ? "bg-success"
                        : booking.status === "Cancelled"
                        ? "bg-danger"
                        : "bg-warning text-dark"
                    }`}>
                      {booking.status || "Pending"}
                    </span>

                    {/* PAYMENT STATUS */}
                    <p className="mt-2">
                      💳 Payment:{" "}
                      <b className={
                        booking.paymentStatus === "Paid"
                          ? "text-success"
                          : booking.paymentStatus === "Refunded"
                          ? "text-warning"
                          : "text-danger"
                      }>
                        {booking.paymentStatus || "Unpaid"}
                      </b>
                    </p>

                    {/* PAY BUTTON */}
                    {booking.paymentStatus !== "Paid" && (
                      <button
                        className="btn btn-primary w-100 mt-2"
                        onClick={() =>
                          navigate("/payment", { state: booking })
                        }
                      >
                        Pay Now 💳
                      </button>
                    )}

                    {/* CANCEL BUTTON */}
                    {booking.paymentStatus === "Paid" &&
                      booking.status !== "Cancelled" && (
                      <button
                        className="btn btn-danger w-100 mt-2"
                        onClick={() => handleCancel(booking._id)}
                      >
                        Cancel Booking ❌
                      </button>
                    )}

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default MyBookings;