import React, { useEffect, useState } from "react";
import axios from "axios";
import "./package.css";

function AdminPackages() {

  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    description: "",
    image: ""
  });

  const [packages, setPackages] = useState([]);

  const token = localStorage.getItem("token");

  // 🔥 FETCH EXISTING
  const fetchPackages = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/packages");
    setPackages(res.data);
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  // 🔥 HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 ADD PACKAGE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/packages",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setPackages([res.data, ...packages]);

      // reset
      setForm({
        title: "",
        location: "",
        price: "",
        description: "",
        image: ""
      });

      alert("Package Added ✅");

    } catch (err) {
      alert("Error adding package ❌");
    }
  };

  return (
    <div className="pkg-container">

      <h1>📦 Add Package</h1>

      {/* FORM */}
      <form className="pkg-form" onSubmit={handleSubmit}>

        <input
          name="title"
          placeholder="Package Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
        />

        <input
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <button type="submit">Add Package</button>
      </form>

      {/* LIST */}
      <div className="pkg-grid">
        {packages.map(pkg => (
          <div key={pkg._id} className="pkg-card">
            <img src={pkg.image || `https://source.unsplash.com/400x300/?${pkg.location}`} />
            <h3>{pkg.title}</h3>
            <p>{pkg.location}</p>
            <p>{pkg.price}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default AdminPackages;