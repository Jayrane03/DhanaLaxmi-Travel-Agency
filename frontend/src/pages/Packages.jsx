import React, { useEffect, useState } from "react";
import axios from "axios";
import staticPackages from "../services/packages";
import { useNavigate, useLocation } from "react-router-dom";
import "../style/pages.css";

function Packages() {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Helper: fallback image
  const getImage = (location) => {
    if (!location) return "https://loremflickr.com/600/400/travel";
    return `https://loremflickr.com/600/400/${location},travel`;
  };

  // 🔥 Helper: check if package is NEW (last 7 days)
  const isNewPackage = (pkg) => {
    if (!pkg.createdAt) return false;
    const createdDate = new Date(pkg.createdAt);
    const now = new Date();
    const diffDays = (now - createdDate) / (1000 * 60 * 60 * 24);
    return diffDays <= 7;
  };

  useEffect(() => {
  const fetchPackages = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/packages"
      );

      console.log("API:", res.data);

      const adminPackages = res.data.data || [];

      // ✅ Sort admin packages (latest first)
      const sortedAdmin = adminPackages.sort(
        (a, b) =>
          new Date(b.createdAt || b._id) -
          new Date(a.createdAt || a._id)
      );

      // ✅ Merge: ADMIN FIRST, then STATIC
      const merged = [...sortedAdmin, ...staticPackages];

      // ✅ Optional: remove duplicates by title (or _id)
      const uniquePackages = merged.filter(
        (pkg, index, self) =>
          index ===
          self.findIndex(
            (p) =>
              (p._id && p._id === pkg._id) ||
              p.title === pkg.title
          )
      );

      setPackages(uniquePackages);

    } catch (err) {
      console.log("API failed → fallback to static");
      setPackages(staticPackages);
    } finally {
      setLoading(false);
    }
  };

  fetchPackages();
}, []);

  // 🔍 Filter logic
  const filteredPackages = packages.filter((pkg) => {
    if (!searchQuery) return true;

    return (
      pkg.title?.toLowerCase().includes(searchQuery) ||
      pkg.location?.toLowerCase().includes(searchQuery)
    );
  });

  // 👉 Booking
  const handleBookNow = (pkg) => {
    navigate("/booking", { state: pkg });
  };

  // 👉 Chunk for carousel
  const chunkPackages = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const slides = chunkPackages(filteredPackages, 3);

  return (
    <div>
      {/* HERO */}
      <div className="container-fluid bg-primary py-5 mb-5 hero-header">
        <div className="container text-center">
          <h1 className="display-3 text-white">Tour Packages</h1>
          <p className="text-white">Explore curated travel packages</p>
        </div>
      </div>

      <div className="container py-5">
        <h2 className="text-center mb-4">Awesome Packages</h2>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : filteredPackages.length === 0 ? (
          <p className="text-center">No packages found</p>
        ) : (
          <div
            id="packageCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {slides.map((group, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                >
                  <div className="row">
                    {group.map((pkg) => {
                      const isNew = isNewPackage(pkg);

                      return (
                        <div key={pkg._id || pkg.id} className="col-md-4">
                          <div
                            className={`card shadow-lg border-0 m-2 ${
                              isNew ? "border border-warning" : ""
                            }`}
                            style={{
                              transition: "0.3s",
                              transform: isNew ? "scale(1.02)" : "scale(1)",
                            }}
                          >
                            {/* IMAGE */}
                            <div className="position-relative">
                              <img
                                src={pkg.image || getImage(pkg.location)}
                                className="card-img-top"
                                style={{
                                  height: "220px",
                                  objectFit: "cover",
                                }}
                                alt={pkg.title}
                              />

                              {/* PRICE */}
                              <span className="badge bg-danger position-absolute top-0 end-0 m-2 fs-6">
                                ₹{pkg.pricePerPerson}
                              </span>

                              {/* 🔥 NEW BADGE */}
                              {isNew && (
                                <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-2">
                                  NEW
                                </span>
                              )}
                            </div>

                            {/* CONTENT */}
                            <div className="card-body">
                              <h5 className="card-title">{pkg.title}</h5>

                              <p className="text-muted mb-1">
                                📍 {pkg.location}
                              </p>

                              <p className="mb-1">
                                🗓 {pkg.duration?.days}D /{" "}
                                {pkg.duration?.nights}N
                              </p>

                              <p className="small text-muted">
                                <b>Places:</b>{" "}
                                {pkg.placesCovered
                                  ?.slice(0, 2)
                                  .join(", ")}
                              </p>

                              <p className="small text-muted">
                                <b>Activities:</b>{" "}
                                {pkg.activities?.slice(0, 2).join(", ")}
                              </p>

                              <button
                                onClick={() => handleBookNow(pkg)}
                                className={`btn w-100 mt-2 ${
                                  isNew
                                    ? "btn-warning text-dark"
                                    : "btn-primary"
                                }`}
                              >
                                Book Now
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* CONTROLS */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#packageCarousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon"></span>
            </button>

            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#packageCarousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon"></span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Packages;