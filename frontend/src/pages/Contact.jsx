import React, { useState } from "react";

function Contact() {

  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  return (
    <div>

      {/* HERO */}
      <div className="container-fluid bg-primary py-5 mb-5 hero-header">
        <div className="container py-5">
          <div className="row justify-content-center py-5">
            <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
              <h1 className="display-3 text-white animated slideInDown">
                Contact Us
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <div className="container-xxl py-5">
        <div className="container">

          <div className="text-center mb-5">
            <h6 className="section-title bg-white text-primary px-3">
              Get In Touch
            </h6>
            <h1>Contact For Any Query</h1>
          </div>

          <div className="row g-4">

            {/* LEFT INFO */}
            <div className="col-lg-4 col-md-6">
              <h5>Contact Details</h5>

              <p>
                Have questions about travel packages? Reach out to us anytime.
              </p>

              <div className="d-flex align-items-center mb-4">
                <div className="bg-primary d-flex align-items-center justify-content-center" style={{ width: 50, height: 50 }}>
                  <i className="fa fa-map-marker-alt text-white" />
                </div>
                <div className="ms-3">
                  <h5 className="text-primary">Office</h5>
                  <p className="mb-0">Mumbai, India</p>
                </div>
              </div>

              <div className="d-flex align-items-center mb-4">
                <div className="bg-primary d-flex align-items-center justify-content-center" style={{ width: 50, height: 50 }}>
                  <i className="fa fa-phone-alt text-white" />
                </div>
                <div className="ms-3">
                  <h5 className="text-primary">Mobile</h5>
                  <p className="mb-0">+91 856231456</p>
                </div>
              </div>

              <div className="d-flex align-items-center">
                <div className="bg-primary d-flex align-items-center justify-content-center" style={{ width: 50, height: 50 }}>
                  <i className="fa fa-envelope-open text-white" />
                </div>
                <div className="ms-3">
                  <h5 className="text-primary">Email</h5>
                  <p className="mb-0">info@dhanalaxmitravel.com</p>
                </div>
              </div>
            </div>

            {/* MAP */}
            <div className="col-lg-4 col-md-6">
              <iframe
                className="position-relative rounded w-100 h-100"
                src="https://maps.google.com/maps?q=Mumbai&t=&z=13&ie=UTF8&iwloc=&output=embed"
                style={{ minHeight: 300, border: 0 }}
                allowFullScreen
                title="map"
              />
            </div>

            {/* FORM */}
            <div className="col-lg-4 col-md-12">

              {/* SUCCESS MESSAGE */}
              {success && (
                <div className="alert alert-success">
                  Message Sent Successfully ✅
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row g-3">

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input type="text" className="form-control" required />
                      <label>Your Name</label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input type="email" className="form-control" required />
                      <label>Your Email</label>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-floating">
                      <input type="text" className="form-control" required />
                      <label>Subject</label>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        style={{ height: 100 }}
                        required
                      />
                      <label>Message</label>
                    </div>
                  </div>

                  <div className="col-12">
                    <button className="btn btn-primary w-100 py-3" type="submit">
                      Send Message
                    </button>
                  </div>

                </div>
              </form>

            </div>

          </div>

        </div>
      </div>

    </div>
  );
}

export default Contact;