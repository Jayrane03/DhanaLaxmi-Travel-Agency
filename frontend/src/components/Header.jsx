import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { user, logout, loading } = useAuth();

  // prevent flicker
  if (loading) return null;

  // ✅ normalize user
  const currentUser = user?.user;

  // ✅ safe first letter
  const firstLetter = currentUser?.name
    ? currentUser.name.charAt(0).toUpperCase()
    : "U";

  return (
    <div>

      {/* Topbar */}
      <div className="container-fluid bg-dark px-5 d-none d-lg-block">
        <div className="row gx-0">
          <div className="col-lg-8 text-center text-lg-start mb-2 mb-lg-0">
            <div className="d-inline-flex align-items-center" style={{ height: 45 }}>
              <small className="me-3 text-light">
                <i className="fa fa-map-marker-alt me-2" />
                Mumbai, India
              </small>
              <small className="me-3 text-light">
                <i className="fa fa-phone-alt me-2" />
                +91 856231456
              </small>
              <small className="text-light">
                <i className="fa fa-envelope-open me-2" />
                info@dhanalaxmitravel.com
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <div className="container-fluid position-relative p-0">
        <nav className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">

          <Link to="/" className="navbar-brand p-0">
            <h1 className="text-primary m-0">
              <i className="fa fa-bus-alt me-3" />
              DhanaLaxmi Travel
            </h1>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="fa fa-bars" />
          </button>

          <div className="collapse navbar-collapse" id="navbarCollapse">

            <div className="navbar-nav ms-auto py-0">
              <Link to="/" className="nav-item nav-link">Home</Link>
              <Link to="/about" className="nav-item nav-link">About</Link>
              <Link to="/services" className="nav-item nav-link">Services</Link>
              <Link to="/packages" className="nav-item nav-link">Packages</Link>

              <div className="nav-item dropdown">
                <Link
                  to="#"
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  Pages
                </Link>
                <div className="dropdown-menu m-0">
                  <Link to="/destination" className="dropdown-item">Destination</Link>
                  <Link to="/booking" className="dropdown-item">Booking</Link>
                  <Link to="/my-bookings" className="dropdown-item">  My Bookings</Link>
                  <Link to="/team" className="dropdown-item">Travel Guides</Link>
                  {/* <Link to="/testimonial" className="dropdown-item">Testimonial</Link> */}
                </div>
              </div>

              <Link to="/contact" className="nav-item nav-link">Contact</Link>
            </div>

            {/* ✅ AUTH SECTION */}
            {currentUser ? (
              <div className="dropdown ms-3">

                {/* Avatar */}
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "#86B817",
                    color: "#fff",
                    fontWeight: "bold",
                    cursor: "pointer"
                  }}
                  data-bs-toggle="dropdown"
                >
                  {firstLetter}
                </div>

                <ul className="dropdown-menu dropdown-menu-end">

                  <li className="dropdown-item fw-bold">
                    {currentUser?.name || "User"}
                  </li>

                  <li className="dropdown-item text-muted">
                    {currentUser?.email || ""}
                  </li>

                  <li><hr className="dropdown-divider" /></li>

                  <li>
                    <button className="dropdown-item" onClick={logout}>
                      Logout
                    </button>
                  </li>

                </ul>

              </div>
            ) : (
              <Link
                to="/register"
                className="btn btn-primary rounded-pill py-2 px-4 ms-3"
              >
                Register
              </Link>
            )}

          </div>
        </nav>
      </div>

    </div>
  );
}

export default Header;  