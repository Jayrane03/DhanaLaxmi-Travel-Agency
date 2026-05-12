// Booking.jsx

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

import {
  FaHotel,
  FaUtensils,
  FaPlane,
  FaBus,
  FaBook
  // FaPassport,
} from "react-icons/fa";

import { MdTravelExplore } from "react-icons/md";

import "../style/index.css";

function Booking() {
  const navigate = useNavigate();
  const location = useLocation();

  const pkg = location.state;

  // ✅ FALLBACK DATA
  pkg.tourIncludes = pkg.tourIncludes || {
    hotel: true,
    meals: true,
    flight: true,
    sightseeing: true,
    transport: true,
    visa: false,
  };

  pkg.tourHighlights = pkg.tourHighlights || [
    "Luxury Stay",
    "Free Breakfast",
    "Sightseeing Included",
    "Adventure Activities",
    "Professional Guide",
    "Local Exploration",
  ];

  // ✅ FORM
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    persons: 1,
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // ❌ NO PACKAGE
  if (!pkg) {
    return (
      <h3 className="text-center mt-5 text-danger">
        No package selected ❌
      </h3>
    );
  }

  // ✅ IMAGE
  const imageUrl =
    pkg.image && pkg.image !== ""
      ? pkg.image
      : `https://loremflickr.com/800/500/${pkg.location || "travel"}`;

  // ✅ TOTAL PRICE
  const totalPrice =
    Number(pkg.pricePerPerson) *
    Number(formData.persons);

  // ✅ INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/bookings",
        {
          name: formData.name,
          email: formData.email,
          date: formData.date,
          persons: Number(formData.persons),
          phone: formData.phone,
          message: formData.message,

          destination: pkg.location,
          price: totalPrice,
          packageId: pkg._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Booking Created ✅");

      navigate("/payment", {
        state: res.data.data,
      });

    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Booking Failed ❌");
    }

    setLoading(false);
  };

  return (
    <div>

      {/* HERO */}
      <div
        className="container-fluid py-5"
        style={{
          background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "420px",
        }}
      >
        <div className="container text-center text-white pt-5 mt-5">

          <h1 className="display-3 fw-bold text-white">
            {pkg.title}
          </h1>

          <p className="fs-4 text-white mt-3">
            📍 {pkg.location}
          </p>

        </div>
      </div>

      {/* MAIN */}
      <div className="container py-5">

        <div className="row g-4">

          {/* LEFT */}
          <div className="col-lg-8">

            {/* IMAGE */}
            <div className="card border-0 shadow rounded-4 overflow-hidden mb-4">

              <img
                src={imageUrl}
                alt={pkg.title}
                className="img-fluid"
                style={{
                  height: "500px",
                  objectFit: "cover",
                }}
              />

            </div>

            {/* PACKAGE DETAILS */}
            <div className="card border-0 shadow rounded-4 p-4 mb-4">

              <div className="d-flex justify-content-between flex-wrap">

                <div>

                  <h2 className="fw-bold">
                    {pkg.title}
                  </h2>

                  <p className="text-muted fs-5">
                    📍 {pkg.location}
                  </p>

                </div>

                <div className="text-end">

                  <h3 className="text-primary fw-bold">
                    ₹{pkg.pricePerPerson}
                  </h3>

                  <span className="badge bg-success p-2">
                    Per Person
                  </span>

                </div>

              </div>

              <hr />

              <div className="row text-center">

                <div className="col-md-3">
                  <h4 className="fw-bold">
                    {pkg.duration?.days}
                  </h4>

                  <p className="text-muted">
                    Days
                  </p>
                </div>

                <div className="col-md-3">
                  <h4 className="fw-bold">
                    {pkg.duration?.nights}
                  </h4>

                  <p className="text-muted">
                    Nights
                  </p>
                </div>

                <div className="col-md-3">
                  <h4 className="fw-bold">
                    {pkg.activities?.length || 0}
                  </h4>

                  <p className="text-muted">
                    Activities
                  </p>
                </div>

                <div className="col-md-3">
                  <h4 className="fw-bold">
                    {pkg.placesCovered?.length || 0}
                  </h4>

                  <p className="text-muted">
                    Places
                  </p>
                </div>

              </div>

            </div>

            {/* TOUR INCLUDES */}
            <div className="card border-0 shadow rounded-4 p-4 mb-4">

              <h3 className="fw-bold mb-4">
                Tour Includes
              </h3>

              <div className="row g-4 text-center">

                {(pkg.tourIncludes?.hotel ?? true) && (
                  <div className="col-4 col-md-2">
                    <FaHotel
                      size={32}
                      className="text-warning mb-2"
                    />
                    <p>Hotel</p>
                  </div>
                )}

                {(pkg.tourIncludes?.meals ?? true) && (
                  <div className="col-4 col-md-2">
                    <FaUtensils
                      size={32}
                      className="text-warning mb-2"
                    />
                    <p>Meals</p>
                  </div>
                )}

                {(pkg.tourIncludes?.flight ?? true) && (
                  <div className="col-4 col-md-2">
                    <FaPlane
                      size={32}
                      className="text-warning mb-2"
                    />
                    <p>Flight</p>
                  </div>
                )}

                {(pkg.tourIncludes?.sightseeing ?? true) && (
                  <div className="col-4 col-md-2">
                    <MdTravelExplore
                      size={32}
                      className="text-warning mb-2"
                    />
                    <p>Sightseeing</p>
                  </div>
                )}

                {(pkg.tourIncludes?.transport ?? true) && (
                  <div className="col-4 col-md-2">
                    <FaBus
                      size={32}
                      className="text-warning mb-2"
                    />
                    <p>Transport</p>
                  </div>
                )}

                {(pkg.tourIncludes?.visa ?? false) && (
                  <div className="col-4 col-md-2">
                    <FaBook
                      size={32}
                      className="text-warning mb-2"
                    />
                    <p>Visa</p>
                  </div>
                )}

              </div>

            </div>

            {/* HIGHLIGHTS */}
            <div className="card border-0 shadow rounded-4 p-4 mb-4">

              <h3 className="fw-bold mb-4">
                Tour Highlights
              </h3>

              <div className="row">

                {pkg.tourHighlights.map((item, index) => (

                  <div
                    className="col-md-6 mb-3"
                    key={index}
                  >

                    <div className="d-flex align-items-center">

                      <span
                        className="me-3"
                        style={{
                          color: "#00bcd4",
                          fontSize: "24px",
                          fontWeight: "bold",
                        }}
                      >
                        ✓
                      </span>

                      <span className="fs-6">
                        {item}
                      </span>

                    </div>

                  </div>

                ))}

              </div>

            </div>

            {/* ITINERARY */}
            <div className="card border-0 shadow rounded-4 p-4">

              <h3 className="fw-bold mb-4">
                Tour Itinerary
              </h3>

              {pkg.itinerary?.map((item, index) => (

                <div
                  key={index}
                  className="d-flex mb-4"
                >

                  <div className="me-4">

                    <div
                      className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center fw-bold"
                      style={{
                        width: "60px",
                        height: "60px",
                      }}
                    >
                      {item.day}
                    </div>

                  </div>

                  <div>

                    <h5 className="fw-bold">
                      {item.title}
                    </h5>

                    <p className="text-muted mb-0">
                      {item.desc}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* RIGHT */}
          <div className="col-lg-4">

            <div
              className="sticky-top"
              style={{
                top: "100px",
              }}
            >

              {/* FORM */}
              <form
                onSubmit={handleSubmit}
                className="card border-0 shadow rounded-4 p-4 mb-4"
              >

                <h3 className="fw-bold mb-4">
                  Book This Tour
                </h3>

                <input
                  className="form-control mb-3 p-3"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

                <input
                  className="form-control mb-3 p-3"
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <input
                  className="form-control mb-3 p-3"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />

                <input
                  className="form-control mb-3 p-3"
                  type="number"
                  min="1"
                  name="persons"
                  placeholder="Persons"
                  value={formData.persons}
                  onChange={handleChange}
                  required
                />

                <input
                  className="form-control mb-3 p-3"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />

                <textarea
                  className="form-control mb-4 p-3"
                  rows="4"
                  name="message"
                  placeholder="Special Request"
                  value={formData.message}
                  onChange={handleChange}
                />

                {/* PRICE */}
                <div className="bg-light rounded-4 p-4 mb-4">

                  <div className="d-flex justify-content-between mb-2">
                    <span>
                      Price Per Person
                    </span>

                    <b>
                      ₹{pkg.pricePerPerson}
                    </b>
                  </div>

                  <div className="d-flex justify-content-between mb-2">
                    <span>
                      Persons
                    </span>

                    <b>
                      {formData.persons}
                    </b>
                  </div>

                  <hr />

                  <div className="d-flex justify-content-between">

                    <h5>Total</h5>

                    <h4 className="text-primary fw-bold">
                      ₹{totalPrice}
                    </h4>

                  </div>

                </div>

                <button
                  className="btn btn-primary w-100 py-3 rounded-4 fw-bold"
                  disabled={loading}
                >
                  {loading
                    ? "Processing..."
                    : `Proceed to Pay ₹${totalPrice}`}
                </button>

              </form>

              {/* QUICK INFO */}
              <div className="card border-0 shadow rounded-4 p-4">

                <h4 className="fw-bold mb-3">
                  Quick Info
                </h4>

                <p>🏨 Hotel Included</p>
                <p>🍽 Meals Included</p>
                <p>🚌 Transport Included</p>
                <p>📞 24x7 Support</p>
                <p className="mb-0">
                  ✅ Best Price Guarantee
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Booking;