import React, { useState } from "react";
import packages from "../services/packages";
import axios from "axios";
export default function Footer() {

  // ---------------- STATE ----------------
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  // ---------------- STATIC IMAGES (NO ERROR) ----------------
  const images = {
    Goa: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=600",
    Jaipur: "https://images.pexels.com/photos/3581364/pexels-photo-3581364.jpeg?auto=compress&cs=tinysrgb&w=600",
    Manali: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=600",
    Kerala: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=600",
    Kashmir: "https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=600",
    Ladakh: "https://images.pexels.com/photos/210243/pexels-photo-210243.jpeg?auto=compress&cs=tinysrgb&w=600",
    Dubai: "https://images.pexels.com/photos/3787839/pexels-photo-3787839.jpeg?auto=compress&cs=tinysrgb&w=600",
    Bali: "https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=600",
    Malaysia: "https://images.pexels.com/photos/296789/pexels-photo-296789.jpeg?auto=compress&cs=tinysrgb&w=600",
  };

  const fallbackImage =
    "https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=600";

  const getImage = (location) => images[location] || fallbackImage;

  // ---------------- NEWSLETTER ----------------
const handleSubscribe = async () => {
  if (!email) return alert("Enter email");

  try {
    await axios.post("http://localhost:5000/api/newsletter", { email });

    setSuccess(true);
    setEmail("");
    setTimeout(() => setSuccess(false), 3000);

  } catch (err) {
    alert("Email failed ❌");
  }
};

  return (
    <div>

      {/* Footer Start */}
      <div className="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn">
        <div className="container py-5">
          <div className="row g-5">

            {/* Company */}
            <div className="col-lg-3 col-md-6">
              <h4 className="text-white mb-3">Company</h4>
              <a className="btn btn-link" href="/">About Us</a>
              <a className="btn btn-link" href="/">Contact Us</a>
              <a className="btn btn-link" href="/">Privacy Policy</a>
              <a className="btn btn-link" href="/">Terms & Condition</a>
              <a className="btn btn-link" href="/">FAQs & Help</a>
            </div>

            {/* Contact */}
            <div className="col-lg-3 col-md-6">
              <h4 className="text-white mb-3">Contact</h4>
              <p className="text-white"><i className="fa fa-map-marker-alt me-3 text-white" />Mumbai, India</p>
              <p className="text-white"><i className="fa fa-phone-alt me-3 text-white" />+91 856231456</p>
              <p className="text-white"><i className="fa fa-envelope me-3 text-white" />info@dhanalaxmitravel.com</p>

              <div className="d-flex pt-2">
                <a className="btn btn-outline-light btn-social" href="#"><i className="fab fa-twitter" /></a>
                <a className="btn btn-outline-light btn-social" href="#"><i className="fab fa-facebook-f" /></a>
                <a className="btn btn-outline-light btn-social" href="#"><i className="fab fa-youtube" /></a>
                <a className="btn btn-outline-light btn-social" href="#"><i className="fab fa-linkedin-in" /></a>
              </div>
            </div>

            {/* Gallery */}
            <div className="col-lg-3 col-md-6">
              <h4 className="text-white mb-3">Gallery</h4>

              <div className="row g-2 pt-2">
                {packages.slice(0, 6).map((pkg) => (
                  <div key={pkg.id} className="col-4">
                    <img
                      className="img-fluid bg-light p-1"
                      src={getImage(pkg.location)}
                      alt={pkg.location}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="col-lg-3 col-md-6">
              <h4 className="text-white mb-3">Newsletter</h4>
              <p className="text-white">Get latest travel deals & offers</p>

              {/* Success Message */}
              {success && (
                <div className="alert alert-success py-2">
                  Subscribed Successfully ✅
                </div>
              )}

              <div className="position-relative mx-auto" style={{ maxWidth: 400 }}>
                <input
                  className="form-control border-primary w-100 py-3 ps-4 pe-5"
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <button
                  type="button"
                  onClick={handleSubscribe}
                  className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2"
                >
                  SignUp
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom */}
        <div className="container text-center">
          <p className="mb-0">
            © DhanaLaxmi Travel, All Rights Reserved.
          </p>
        </div>

      </div>
      {/* Footer End */}

    </div>
  );
}