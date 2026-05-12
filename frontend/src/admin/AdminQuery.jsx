import React, { useEffect, useState } from "react";
import axios from "axios";
import "./adminQuery.css";

function AdminQueries() {

  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/queries/grouped",
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    setUsers(res.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateStatus = async (id, status) => {
    await axios.put(
      `http://localhost:5000/api/queries/${id}`,
      { status },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    fetchData();
  };

  return (
    <div className="query-container">

      <h1>📩 User Queries</h1>

      {users.map((user, index) => (

        <div key={index} className="user-card">

          {/* USER HEADER */}
          <div className="user-header">
            <div>
              <h3>{user.name}</h3>
              <p className="text-light">{user._id}</p>
            </div>

            <span className="query-count">
              {user.queries.length} Queries
            </span>
          </div>

          {/* QUERIES */}
          <div className="query-list">

            {user.queries.map((q) => (

              <div key={q._id} className="query-item">

                <div className="query-top">
                  <h5 className="text-light">{q.subject}</h5>

                  <span className={
                
                    q.status === "Resolved"
                      ? "status resolved"
                      : "status pending"
                  }>
                    {q.status}
                  </span>
                </div>

                <p  className="text-light">{q.message}</p>

                <div className="query-actions">

                  <select
                    value={q.status}
                    onChange={(e) =>
                      updateStatus(q._id, e.target.value)
                    }
                  >
                    <option>Pending</option>
                    <option>Resolved</option>
                  </select>

                  <span className="date">
                    {new Date(q.createdAt).toLocaleDateString()}
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>

      ))}

    </div>
  );
}

export default AdminQueries;