import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function MyBookings() {

  const { user } = useAuth();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Images
  const getImage = (location) => {
    if (!location) return "https://loremflickr.com/600/400/travel";
    const city = location.split(" ")[0];
    return `https://loremflickr.com/600/400/${city},travel?lock=${city}`;
  };

  // FETCH BOOKINGS
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/bookings/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBookings(res.data.data);
        setLoading(false);

      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>

      {/* HERO */}
      <div className="container-fluid bg-primary py-5 mb-5 hero-header">
        <div className="container text-center">
          <h1 className="display-4 text-white">My Bookings</h1>
          <p className="text-white">
            Track and manage your travel plans
          </p>
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

                  {/* IMAGE */}
                  <img
                    className="img-fluid"
                    src={getImage(booking.destination)}
                    alt={booking.destination}
                  />

                  {/* INFO */}
                  <div className="p-4">

                    <h5>{booking.destination}</h5>

                    <p>
                      <i className="fa fa-calendar me-2 text-primary"></i>
                      {new Date(booking.date).toLocaleDateString()}
                    </p>

                    <p>
                      <i className="fa fa-user me-2 text-primary"></i>
                      {booking.persons} Persons
                    </p>

                    {/* STATUS */}
                    <span className={`badge ${
                      booking.status === "Confirmed"
                        ? "bg-success"
                        : booking.status === "Cancelled"
                        ? "bg-danger"
                        : "bg-warning text-dark"
                    }`}>
                      {booking.status || "Pending"}
                    </span>

                    {/* PAY BUTTON */}
                    {booking.status !== "Confirmed" && (
                      <button
                        className="btn btn-primary w-100 mt-3"
                        onClick={() =>
                          navigate("/payment", { state: booking })
                        }
                      >
                        Pay Now 💳
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