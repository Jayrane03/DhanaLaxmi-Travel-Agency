import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import "./admin.css";
const AdminReports = () => {

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // FETCH BOOKINGS
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/bookings",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setBookings(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ---------------- STATS ----------------
  const totalBookings = bookings.length;

  const confirmed = bookings.filter(b => b.status === "Confirmed").length;
  const cancelled = bookings.filter(b => b.status === "Cancelled").length;
  const pending = bookings.filter(b => b.status === "Pending").length;

  
const revenue = bookings
  .filter(b => b.paymentStatus === "Paid" && b.status !== "Cancelled")
  .reduce((sum, b) => sum + (b.price || 0), 0);

  // ---------------- CHART DATA ----------------

  // BOOKINGS PER DESTINATION
  const destinationData = Object.values(
    bookings.reduce((acc, b) => {
      acc[b.destination] = acc[b.destination] || {
        name: b.destination,
        count: 0
      };
      acc[b.destination].count += 1;
      return acc;
    }, {})
  );

  // STATUS PIE
  const statusData = [
    { name: "Confirmed", value: confirmed },
    { name: "Pending", value: pending },
    { name: "Cancelled", value: cancelled },
  ];

  const COLORS = ["#00C49F", "#FFBB28", "#FF4C4C"];

  return (
    <div style={{background: "#0f172a", minHeight: "100vh", color: "white", padding: "20px"}}>

      <h1 className="mb-4 text-light">📊 Reports </h1>

      {loading ? (
        <p>Loading...</p>
      ) : (

        <>
          {/* STATS CARDS */}
          <div className="row mb-4">

            <div className="col-md-3">
              <div className="p-3 bg-light rounded shadow text-center">
                <h5>Total Bookings</h5>
                <h2>{totalBookings}</h2>
              </div>
            </div>

            <div className="col-md-3">
              <div className="p-3 bg-success rounded shadow text-center">
                <h5>Confirmed</h5>
                <h2>{confirmed}</h2>
              </div>
            </div>

            <div className="col-md-3">
              <div className="p-3 bg-danger rounded shadow text-center">
                <h5>Cancelled</h5>
                <h2>{cancelled}</h2>
              </div>
            </div>

            <div className="col-md-3">
              <div className="p-3 bg-primary rounded shadow text-center">
                <h5>Revenue</h5>
                <h2>₹{revenue}</h2>
              </div>
            </div>

          </div>

          {/* CHARTS */}
          <div className="row">

            {/* BAR CHART */}
            <div className="col-md-8">
              <div className="p-3 bg-dark rounded shadow">

                <h5 className="mb-3 text-light">📍 Bookings by Destination</h5>

                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={destinationData}>
                    <XAxis dataKey="name" stroke="#ccc" />
                    <YAxis stroke="#ccc" />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>

              </div>
            </div>

            {/* PIE CHART */}
            <div className="col-md-4">
              <div className="p-3 bg-dark rounded shadow">

                <h5 className="mb-3 text-light">📊 Booking Status</h5>

                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      dataKey="value"
                      outerRadius={100}
                      label
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>

              </div>
            </div>

          </div>

        </>
      )}

    </div>
  );
};

export default AdminReports;