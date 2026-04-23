import React from 'react'
import { useLocation } from "react-router-dom";
import Team from '../pages/Team';
function About() {

  const location = useLocation();

  return (
    <div>

      {/* HERO (hidden on /) */}
      {location.pathname !== "/" && (
        <div className="container-fluid bg-primary py-5 mb-5 hero-header">
          <div className="container py-5">
            <div className="row justify-content-center py-5">
              <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
                <h1 className="display-3 text-white animated slideInDown">
                  About Us
                </h1>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ABOUT */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">

            <div className="col-lg-6" style={{ minHeight: 400 }}>
              <div className="position-relative h-100">
                <img
                  className="img-fluid position-absolute w-100 h-100"
                  src="assets/img/about.jpg"
                  alt=""
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>

            <div className="col-lg-6">
              <h6 className="section-title bg-white text-start text-primary pe-3">
                About Us
              </h6>

              <h1 className="mb-4">
                Welcome to <span className="text-primary">DhanaLaxmi Travel</span>
              </h1>

              <p className="mb-4">
                At DhanaLaxmi Travel, we create unforgettable travel experiences
                across India and international destinations.
              </p>

              <p className="mb-4">
                From beaches to mountains, we provide complete travel solutions
                with best prices and 24/7 support.
              </p>

              <div className="row gy-2 gx-4 mb-4">

                <div className="col-sm-6">
                  <p><i className="fa fa-arrow-right text-primary me-2" />Affordable Packages</p>
                </div>

                <div className="col-sm-6">
                  <p><i className="fa fa-arrow-right text-primary me-2" />Best Hotels</p>
                </div>

                <div className="col-sm-6">
                  <p><i className="fa fa-arrow-right text-primary me-2" />Safe Travel</p>
                </div>

                <div className="col-sm-6">
                  <p><i className="fa fa-arrow-right text-primary me-2" />24/7 Support</p>
                </div>

              </div>

              <a className="btn btn-primary py-3 px-5 mt-2" href="/packages">
                Explore Packages
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* TEAM */}
     {location.pathname !== "/" && location.pathname !=="/about" && <Team/>}

    </div>
  );
}

export default About;