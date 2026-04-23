import React, { useEffect, useState } from "react";
import axios from "axios";
import staticPackages from "../services/packages";
import { useNavigate, useLocation } from "react-router-dom";

function Packages() {

  const navigate = useNavigate();
  const location = useLocation();

  // 🔍 SEARCH QUERY
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  // 🔥 Dynamic image
  const getImage = (location) => {
    if (!location) return "https://loremflickr.com/600/400/travel";
    return `https://loremflickr.com/600/400/${location},travel`;
  };

  // ---------------- STATE ----------------
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  // ---------------- FETCH ----------------
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/admin/packages"
        );

        const combined = [
          ...res.data,
          ...staticPackages
        ];

        setPackages(combined);
        setLoading(false);

      } catch (err) {
        console.log("Using static only");
        setPackages(staticPackages);
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // 🔍 FILTER PACKAGES BASED ON SEARCH
  const filteredPackages = packages.filter((pkg) => {
    if (!searchQuery) return true;

    return (
      pkg.title?.toLowerCase().includes(searchQuery) ||
      pkg.location?.toLowerCase().includes(searchQuery)
    );
  });

  // ---------------- HANDLER ----------------
  const handleBookNow = (pkg) => {
    navigate("/booking", { state: pkg });
  };

  return (
    <div>

      {/* HERO */}
      <div className="container-fluid bg-primary py-5 mb-5 hero-header">
        <div className="container py-5 text-center">
          <h1 className="display-3 text-white">Tour Packages</h1>
          <p className="text-white fs-5">
            Explore admin + curated travel packages
          </p>
        </div>
      </div>

      {/* PACKAGES */}
      <div className="container-xxl py-5">
        <div className="container">

          <div className="text-center mb-5">
            <h1>Awesome Packages</h1>

            {/* 🔍 SHOW SEARCH RESULT */}
            {searchQuery && (
              <p className="text-muted">
                Showing results for:{" "}
                <strong className="text-primary">{searchQuery}</strong>
              </p>
            )}
          </div>

          {loading ? (
            <p className="text-center">Loading packages...</p>
          ) : filteredPackages.length === 0 ? (
            <div className="text-center">
              <h4>No packages found 😔</h4>
              <p>Try searching another destination</p>
            </div>
          ) : (

            <div className="row g-4">

              {filteredPackages.map((pkg, index) => (
                <div key={pkg._id || index} className="col-lg-4 col-md-6">

                  <div className="package-item shadow-sm">

                    <img
                      className="img-fluid"
                      src={pkg.image || getImage(pkg.location)}
                      alt={pkg.location}
                    />

                    <div className="text-center p-4">

                      <h3>{pkg.price}</h3>
                      <h5>{pkg.title}</h5>
                      <p>{pkg.description}</p>

                      <button
                        onClick={() => handleBookNow(pkg)}
                        className="btn btn-primary"
                      >
                        Book Now
                      </button>

                    </div>

                  </div>

                </div>
              ))}

            </div>

          )}

        </div>
      </div>

    </div>
  );
}

export default Packages;