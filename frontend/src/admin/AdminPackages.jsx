import React, { useEffect, useState } from "react";
import axios from "axios";
import "./package.css";

function AdminPackages() {

  const [form, setForm] = useState({
    title: "",
    location: "",
    pricePerPerson: "",
    days: "",
    nights: "",
    description: "",
    image: "",

    placesCovered: "",
    activities: "",

    // NEW
    tourHighlights: "",
    tourManager: "",

    // ITINERARY
    itinerary: "",

    // TOUR INCLUDES
    hotel: true,
    meals: true,
    flight: false,
    sightseeing: true,
    transport: true,
    visa: false,
  });

  const [packages, setPackages] = useState([]);
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  // FETCH
  const fetchPackages = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/api/admin/packages"
      );

      setPackages(res.data.data || res.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  // INPUT
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: form.title,

      location: form.location,

      pricePerPerson: Number(
        form.pricePerPerson
      ),

      description: form.description,

      image: form.image,

      duration: {
        days: Number(form.days),
        nights: Number(form.nights),
      },

      placesCovered: form.placesCovered
        .split(",")
        .map((i) => i.trim()),

      activities: form.activities
        .split(",")
        .map((i) => i.trim()),

      // HIGHLIGHTS
      tourHighlights: form.tourHighlights
        .split(",")
        .map((i) => i.trim()),

      tourManager: form.tourManager,

      // ITINERARY
      itinerary: form.itinerary
        .split("\n")
        .map((item, index) => ({
          day: index + 1,
          title: `Day ${index + 1}`,
          desc: item,
        })),

      // TOUR INCLUDES
      tourIncludes: {
        hotel: form.hotel,
        meals: form.meals,
        flight: form.flight,
        sightseeing: form.sightseeing,
        transport: form.transport,
        visa: form.visa,
      },
    };

    try {

      // UPDATE
      if (editId) {

        const res = await axios.put(
          `http://localhost:5000/api/admin/packages/${editId}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPackages(
          packages.map((p) =>
            p._id === editId
              ? res.data.data
              : p
          )
        );

        alert("Updated ✅");

        setEditId(null);

      } else {

        // CREATE
        const res = await axios.post(
          "http://localhost:5000/api/admin/packages",
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPackages([
          res.data.data,
          ...packages,
        ]);

        alert("Added ✅");
      }

      // RESET
      setForm({
        title: "",
        location: "",
        pricePerPerson: "",
        days: "",
        nights: "",
        description: "",
        image: "",

        placesCovered: "",
        activities: "",

        tourHighlights: "",
        tourManager: "",

        itinerary: "",

        hotel: true,
        meals: true,
        flight: false,
        sightseeing: true,
        transport: true,
        visa: false,
      });

    } catch (err) {

      console.error(err);
      alert("Error ❌");
    }
  };

  // DELETE
  const handleDelete = async (id) => {

    if (!window.confirm("Delete this package?"))
      return;

    try {

      await axios.delete(
        `http://localhost:5000/api/admin/packages/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPackages(
        packages.filter((p) => p._id !== id)
      );

      alert("Deleted ✅");

    } catch (err) {

      alert("Delete failed ❌");
    }
  };

  // EDIT
  const handleEdit = (pkg) => {

    setForm({
      title: pkg.title,

      location: pkg.location,

      pricePerPerson:
        pkg.pricePerPerson,

      days:
        pkg.duration?.days || "",

      nights:
        pkg.duration?.nights || "",

      description:
        pkg.description,

      image:
        pkg.image,

      placesCovered:
        pkg.placesCovered?.join(", "),

      activities:
        pkg.activities?.join(", "),

      // NEW
      tourHighlights:
        pkg.tourHighlights?.join(", "),

      tourManager:
        pkg.tourManager || "",

      itinerary:
        pkg.itinerary
          ?.map((i) => i.desc)
          .join("\n") || "",

      // TOUR INCLUDES
      hotel:
        pkg.tourIncludes?.hotel ??
        true,

      meals:
        pkg.tourIncludes?.meals ??
        true,

      flight:
        pkg.tourIncludes?.flight ??
        false,

      sightseeing:
        pkg.tourIncludes?.sightseeing ??
        true,

      transport:
        pkg.tourIncludes?.transport ??
        true,

      visa:
        pkg.tourIncludes?.visa ??
        false,
    });

    setEditId(pkg._id);
  };

  return (
    <div className="container py-4">

      <h2 className="text-center mb-4 text-primary">

        {editId
          ? "Edit Package"
          : "Add Travel Package"}

      </h2>

      {/* FORM */}
      <form
        className="card p-4 mb-5 shadow"
        onSubmit={handleSubmit}
      >

        <div className="row g-3">

          {/* TITLE */}
          <div className="col-md-6">
            <input
              className="form-control"
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* LOCATION */}
          <div className="col-md-6">
            <input
              className="form-control"
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
              required
            />
          </div>

          {/* PRICE */}
          <div className="col-md-4">
            <input
              className="form-control"
              name="pricePerPerson"
              placeholder="Price per person"
              value={form.pricePerPerson}
              onChange={handleChange}
              required
            />
          </div>

          {/* DAYS */}
          <div className="col-md-4">
            <input
              className="form-control"
              name="days"
              placeholder="Days"
              value={form.days}
              onChange={handleChange}
              required
            />
          </div>

          {/* NIGHTS */}
          <div className="col-md-4">
            <input
              className="form-control"
              name="nights"
              placeholder="Nights"
              value={form.nights}
              onChange={handleChange}
              required
            />
          </div>

          {/* PLACES */}
          <div className="col-12">
            <input
              className="form-control"
              name="placesCovered"
              placeholder="Places Covered (comma separated)"
              value={form.placesCovered}
              onChange={handleChange}
            />
          </div>

          {/* ACTIVITIES */}
          <div className="col-12">
            <input
              className="form-control"
              name="activities"
              placeholder="Activities (comma separated)"
              value={form.activities}
              onChange={handleChange}
            />
          </div>

          {/* HIGHLIGHTS */}
          <div className="col-12">
            <input
              className="form-control"
              name="tourHighlights"
              placeholder="Tour Highlights (comma separated)"
              value={form.tourHighlights}
              onChange={handleChange}
            />
          </div>

          {/* MANAGER */}
          <div className="col-12">
            <input
              className="form-control"
              name="tourManager"
              placeholder="Tour Manager Info"
              value={form.tourManager}
              onChange={handleChange}
            />
          </div>

          {/* ITINERARY */}
          <div className="col-12">

            <textarea
              className="form-control"
              rows="6"
              name="itinerary"
              placeholder={`Day 1 details
Day 2 details
Day 3 details`}
              value={form.itinerary}
              onChange={handleChange}
            />

          </div>

          {/* DESCRIPTION */}
          <div className="col-12">
            <textarea
              className="form-control"
              rows="4"
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          {/* IMAGE */}
          <div className="col-12">
            <input
              className="form-control"
              name="image"
              placeholder="Image URL"
              value={form.image}
              onChange={handleChange}
            />
          </div>

          {/* TOUR INCLUDES */}
          <div className="col-12">

            <label className="fw-bold mb-2">
              Tour Includes
            </label>

            <div className="d-flex flex-wrap gap-4">

              <label>
                <input
                  type="checkbox"
                  checked={form.hotel}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      hotel: e.target.checked,
                    })
                  }
                />
                {" "}Hotel
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={form.meals}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      meals: e.target.checked,
                    })
                  }
                />
                {" "}Meals
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={form.flight}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      flight: e.target.checked,
                    })
                  }
                />
                {" "}Flight
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={form.sightseeing}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      sightseeing:
                        e.target.checked,
                    })
                  }
                />
                {" "}Sightseeing
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={form.transport}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      transport:
                        e.target.checked,
                    })
                  }
                />
                {" "}Transport
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={form.visa}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      visa: e.target.checked,
                    })
                  }
                />
                {" "}Visa
              </label>

            </div>

          </div>

        </div>

        <button className="btn btn-primary mt-4 w-100">

          {editId
            ? "Update Package"
            : "Add Package"}

        </button>

      </form>

    </div>
  );
}

export default AdminPackages;