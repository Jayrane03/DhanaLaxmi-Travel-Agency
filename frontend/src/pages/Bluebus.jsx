// Bluebus.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/bluebus.css";

export default function Bluebus() {
  const navigate = useNavigate();

  const partners = [
    {
      name: "Dhanalaxmi Travel",
      status: "Active",
      image:
        "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop",
      description:
        "Premium tours, comfortable buses, trusted travel experiences across India.",
      button: "Explore Now",
      path: "/home",
    },
    {
      name: "Coming Soon",
      status: "Launching Soon",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
      description:
        "More trusted travel partners will be added soon to BLUE BUS.",
      button: "Coming Soon",
      path: "#",
    },
    {
      name: "Coming Soon",
      status: "Launching Soon",
      image:
        "https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?q=80&w=1200&auto=format&fit=crop",
      description:
        "We are onboarding new travel agencies and luxury bus operators.",
      button: "Coming Soon",
      path: "#",
    },
  ];

  return (
    <div className="bluebus-page">

      {/* HERO */}
      <section className="hero-section">
        <div className="overlay"></div>

        <div className="hero-content container">

          <div className="hero-left">
            <span className="tag">Trusted Bus Booking Platform</span>

            <h1 className="text-black-50 shadow-sm">
              Welcome to <span>BLUE BUS</span>
            </h1>

            <p>
              Discover premium travel agencies, luxury buses,
              affordable tours, and unforgettable travel experiences —
              all in one platform.
            </p>

            <div className="hero-buttons">
              <button className="primary-btn">
                Book Your Journey
              </button>

              <button className="secondary-btn">
                Explore Partners
              </button>
            </div>
          </div>

          <div className="hero-right">
            <img
              src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=1200&auto=format&fit=crop"
              alt="Bus"
            />
          </div>

        </div>
      </section>

      {/* PARTNERS */}
      <section className="partners-section container">

        <div className="section-title">
          <h2>Select Your Travel Partner</h2>
          <p>
            Choose from our trusted travel operators and begin your next
            adventure with BLUE BUS.
          </p>
        </div>

        <div className="partners-grid">

          {partners.map((partner, index) => (
            <div className="partner-card" key={index}>

              <div className="partner-image">
                <img src={partner.image} alt={partner.name} />

                <span className="status-badge">
                  {partner.status}
                </span>
              </div>

              <div className="partner-content">

                <h3>{partner.name}</h3>

                <p>{partner.description}</p>

                <button
                  disabled={partner.path === "#"}
                  onClick={() => {
                    if (partner.path !== "#") {
                      navigate(partner.path);
                    }
                  }}
                  className={
                    partner.path === "#"
                      ? "disabled-btn"
                      : "explore-btn"
                  }
                >
                  {partner.button}
                </button>

              </div>
            </div>
          ))}

        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section">

        <div className="container">

          <div className="section-title">
            <h2>Why Choose BLUE BUS?</h2>
          </div>

          <div className="features-grid">

            <div className="feature-box">
              <div className="feature-icon">🚌</div>
              <h3>Trusted Operators</h3>
              <p>
                We partner only with verified and reliable travel agencies.
              </p>
            </div>

            <div className="feature-box">
              <div className="feature-icon">💺</div>
              <h3>Comfortable Travel</h3>
              <p>
                Enjoy safe, clean, and premium bus journeys with top facilities.
              </p>
            </div>

            <div className="feature-box">
              <div className="feature-icon">⚡</div>
              <h3>Easy Booking</h3>
              <p>
                Book tickets quickly with a seamless and user-friendly platform.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      {/* FOOTER */}
<footer className="bluebus-footer">

  <div className="container">

    <div className="footer-grid">

      {/* Logo */}
      <div className="footer-box">
        <h2 className="footer-logo">BLUE BUS</h2>

        <p className="footer-text">
          Your trusted travel booking platform for luxury buses,
          premium tours, and unforgettable journeys across India.
        </p>

        <div className="social-icons">
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-youtube"></i></a>
        </div>
      </div>

      {/* Quick Links */}
      <div className="footer-box">
        <h3 className="text-white">Quick Links</h3>

        <ul>
          <li onClick={() => navigate("/home")}>Home</li>
          <li onClick={() => navigate("/packages")}>Packages</li>
          <li onClick={() => navigate("/booking")}>Booking</li>
          <li onClick={() => navigate("/contact")}>Contact</li>
        </ul>
      </div>

      {/* Services */}
      <div className="footer-box">
        <h3 className="text-white">Services</h3>

        <ul>
          <li>Luxury Bus Booking</li>
          <li>Tour Packages</li>
          <li>Hotel Booking</li>
          <li>Travel Assistance</li>
        </ul>
      </div>

      {/* Contact */}
      <div className="footer-box">
        <h3 className="text-white">Contact Info</h3>

        <p>
          <i className="fa fa-map-marker-alt"></i>
          Mumbai, Maharashtra
        </p>

        <p>
          <i className="fa fa-phone-alt"></i>
          +91 856231456
        </p>

        <p>
          <i className="fa fa-envelope"></i>
          info@bluebus.com
        </p>
      </div>

    </div>

    <div className="footer-bottom">
      <p className="text-white">
        © 2026 BLUE BUS. All Rights Reserved.
      </p>

      <p className="text-white">
        Travel Smart • Travel Safe • Travel Better
      </p>
    </div>

  </div>

</footer>

    </div>
  );
}