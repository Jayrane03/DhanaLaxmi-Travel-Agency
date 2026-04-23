import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import About from '../pages/About'

export default function Home() {

  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) return;

    navigate(`/packages?search=${query}`);
  };

  return (
    <div>

      <div className="container-fluid bg-primary py-5 mb-5 hero-header">
        <div className="container py-5">
          <div className="row justify-content-center py-5">
            <div className="col-lg-10 text-center">

              <h1 className="display-3 text-white mb-3">
                Enjoy Your Vacation With Us
              </h1>

              <p className="fs-4 text-white mb-4">
                Explore our best travel packages across India and international destinations
              </p>

              <div className="position-relative w-75 mx-auto">

                <input
                  className="form-control border-0 rounded-pill w-100 py-3 ps-4 pe-5"
                  type="text"
                  placeholder="Search destination (Goa, Bali, Dubai...)"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />

                <button
                  onClick={handleSearch}
                  className="btn btn-dark rounded-pill py-2 px-4 position-absolute top-0 end-0 me-2"
                  style={{ marginTop: 7 }}
                >
                  Search 🔍
                </button>

              </div>

            </div>
          </div>
        </div>
      </div>

      <About/>

    </div>
  )
}