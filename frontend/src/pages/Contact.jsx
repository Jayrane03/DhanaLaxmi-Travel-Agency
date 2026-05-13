import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
function Contact() {
  const [success, setSuccess] = useState(false);
const { user , loading } = useAuth();
  // 🔥 Modal + Queries
  const [showModal, setShowModal] = useState(false);
  const [queries, setQueries] = useState([]);

  // 🔥 Get logged-in user (adjust if you use context)
  // const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target[0].value,
      email: e.target[1].value,
      subject: e.target[2].value,
      message: e.target[3].value,
    };

    try {
      await axios.post("http://localhost:5000/api/queries", formData);
      setSuccess(true);
      e.target.reset();
    } catch (err) {
      alert("Failed to send ❌");
    }

    setTimeout(() => setSuccess(false), 3000);
  };

const fetchQueries = async () => {
  if (!user?.user?.email) {
    alert("Please login first");
    return;
  }

  try {
    const res = await axios.get(
      `http://localhost:5000/api/queries/user?email=${user.user.email}`
    );

    setQueries(res.data.data || []);
    setShowModal(true);

  } catch (err) {
    console.log(err);
    alert("Failed to fetch queries ❌");
  }
};
  return (
    <div>

      {/* HERO */}
      <div className="container-fluid bg-primary py-5 mb-5 hero-header">
        <div className="container py-5">
          <div className="row justify-content-center py-5">
            <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
              <h1 className="display-3 text-white">
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

          {/* 🔥 MY QUERIES BUTTON (ADDED HERE ONLY) */}
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
           <button
  onClick={fetchQueries}
  disabled={loading}
  style={{
    background: loading ? "#999" : "#0d6efd",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: loading ? "not-allowed" : "pointer"
  }}
>
  {loading ? "Loading..." : "My Queries"}
</button>
          </div>

          <div className="row g-4">

            {/* LEFT */}
            <div className="col-lg-4 col-md-6">
              <h5>Contact Details</h5>
              <p>Have questions about travel packages? Reach out to us anytime.</p>
              <p><b>Office:</b> Mumbai</p>
              <p><b>Mobile:</b> +91 856231456</p>
              <p><b>Email:</b> info@dhanalaxmitravel.com</p>
            </div>

            {/* MAP */}
            <div className="col-lg-4 col-md-6">
              <iframe
                className="position-relative rounded w-100 h-100"
                src="https://maps.google.com/maps?q=Mumbai&output=embed"
                style={{ minHeight: 300, border: 0 }}
                title="map"
              />
            </div>

            {/* FORM */}
            <div className="col-lg-4 col-md-12">

              {success && (
                <div className="alert alert-success">
                  Message Sent Successfully ✅
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <input type="text" className="form-control mb-2" placeholder="Name" required />
                <input type="email" className="form-control mb-2" placeholder="Email" required />
                <input type="text" className="form-control mb-2" placeholder="Subject" required />
                <textarea className="form-control mb-2" placeholder="Message" style={{ height: 100 }} required />
                <button className="btn btn-primary w-100">Send Message</button>
              </form>

            </div>

          </div>
        </div>
      </div>

      {/* 🔥 MODAL */}
      {showModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.6)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 999
        }}>
          <div style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            width: "90%",
            maxWidth: "600px",
            maxHeight: "80vh",
            overflowY: "auto"
          }}>
            <h3>My Queries</h3>

            {queries.length === 0 ? (
              <p>No queries found</p>
            ) : (
              queries.map((q) => (
                <div key={q._id} style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  borderRadius: "6px",
                  marginBottom: "10px"
                }}>
                  <h5>{q.subject}</h5>
                  <p>{q.message}</p>

                  <p>
                    Status:{" "}
                    <span style={{
                      color:
                        q.status === "approved"
                          ? "green"
                          : q.status === "rejected"
                          ? "red"
                          : "orange",
                      fontWeight: "bold"
                    }}>
                      {q.status}
                    </span>
                  </p>

                  {q.adminReply && (
                    <p><b>Reply:</b> {q.adminReply}</p>
                  )}
                </div>
              ))
            )}

            <button
              onClick={() => setShowModal(false)}
              style={{
                background: "#dc3545",
                color: "#fff",
                border: "none",
                padding: "8px 15px",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Contact;