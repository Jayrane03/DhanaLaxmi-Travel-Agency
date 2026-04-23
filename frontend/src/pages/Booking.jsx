import React, { useState } from "react";
import axios from "axios";
import packages from "../services/packages";
import "../style/index.css";
import { useAuth } from "../context/AuthContext"; // ✅ ADDED

function Booking() {

  const { user } = useAuth(); // ✅ ADDED

  // 🔥 Dynamic destinations
  const destinations = [...new Set(packages.map(pkg => pkg.location))];
const token = user?.token || user?.user?.token;
  // ---------------- STATE ----------------
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    destination: "",
    persons: 1,
    phone: "",
    message: "",
  });

  // ---------------- HANDLERS ----------------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  // 🔥 get token directly
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first");
    return;
  }

  try {
    await axios.post(
      "http://localhost:5000/api/bookings",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ IMPORTANT
        },
      }
    );
      // setFormData()
    alert("Booking Successful ✅");

  } catch (err) {
    console.error(err.response?.data || err.message);
    alert("Booking Failed ❌");
  }
};

  return (
    <div>

      {/* HERO */}
      <div className="container-fluid bg-primary py-5 mb-5 hero-header">
        <div className="container py-5">
          <div className="row justify-content-center py-5">
            <div className="col-lg-10 text-center">
              <h1 className="display-3 text-white">Booking</h1>
              <nav>
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">
                    <a href="/">Home</a>
                  </li>
                  <li className="breadcrumb-item text-white active">
                    Booking
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* PROCESS */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center pb-4">
            <h6 className="section-title bg-white text-primary px-3">
              Process
            </h6>
            <h1 className="mb-5">3 Easy Steps</h1>
          </div>

          <div className="row gy-5 gx-4 justify-content-center">

            <div className="col-lg-4 text-center">
              <div className="border border-primary pt-5 pb-4 px-4">
                <i className="fa fa-globe fa-3x text-primary mb-3" />
                <h5>Choose Destination</h5>
                <p>Select your preferred travel location.</p>
              </div>
            </div>

            <div className="col-lg-4 text-center">
              <div className="border border-primary pt-5 pb-4 px-4">
                <i className="fa fa-dollar-sign fa-3x text-primary mb-3" />
                <h5>Pay Online</h5>
                <p>Secure and easy payment process.</p>
              </div>
            </div>

            <div className="col-lg-4 text-center">
              <div className="border border-primary pt-5 pb-4 px-4">
                <i className="fa fa-plane fa-3x text-primary mb-3" />
                <h5>Fly Today</h5>
                <p>Enjoy your trip without hassle.</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* BOOKING SECTION */}
      <div className="container-xxl py-2">
        <div className="container">
          <div className="booking p-5">

            <div className="row g-2 align-items-center">

              {/* LEFT TEXT */}
              <div className="col-md-6 text-white left-text">
                <h6 className="text-uppercase">Booking</h6>
                <h1 className="mb-4 text-text-white">Online Booking</h1>
                <p>
                  Book your dream trip with ease. Choose your destination,
                  select dates, and confirm instantly.
                </p>
                <p>
                  Our platform ensures a smooth experience with reliable service
                  and best prices.
                </p>
              </div>

              {/* FORM */}
              <div className="col-md-6">
                <h1 className="text-white mb-4">Book A Tour</h1>

                <form className="p-4" onSubmit={handleSubmit}>
                  <div className="row g-3 bg-dark text-white margin-0 p-4">

                    <div className="col-md-6">
                      <div className="form-floating">
                        <input type="text" name="name"
                          className="form-control bg-transparent"
                          value={formData.name}
                          onChange={handleChange}
                          required />
                        <label>Your Name</label>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-floating">
                        <input type="email" name="email"
                          className="form-control bg-transparent"
                          value={formData.email}
                          onChange={handleChange}
                          required />
                        <label>Your Email</label>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-floating">
                        <input type="date" name="date"
                          className="form-control bg-transparent"
                          value={formData.date}
                          onChange={handleChange}
                          required />
                        <label>Date</label>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-floating">
                        <select name="destination"
                          className="form-select bg-transparent"
                          value={formData.destination}
                          onChange={handleChange}
                          required>
                          <option value="">Select Destination</option>
                          {destinations.map((place, index) => (
                            <option key={index} value={place}>{place}</option>
                          ))}
                        </select>
                        <label>Destination</label>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-floating">
                        <input type="number" name="persons"
                          className="form-control bg-transparent"
                          value={formData.persons}
                          onChange={handleChange} />
                        <label>No. of Persons</label>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-floating">
                        <input type="tel" name="phone"
                          className="form-control bg-transparent"
                          value={formData.phone}
                          onChange={handleChange}
                          required />
                        <label>Phone Number</label>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-floating">
                        <textarea name="message"
                          className="form-control bg-transparent"
                          style={{ height: 100 }}
                          value={formData.message}
                          onChange={handleChange}></textarea>
                        <label>Special Request</label>
                      </div>
                    </div>

                    <div className="col-12">
                      <button className="btn btn-outline-light w-100 py-3">
                        Book Now
                      </button>
                    </div>

                  </div>
                </form>

              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Booking;