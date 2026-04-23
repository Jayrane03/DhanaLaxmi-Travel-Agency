import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/payment.css";

function Payment() {

  const navigate = useNavigate();
  const { state } = useLocation();

  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handlePayment = async () => {
    setLoading(true);

    try {
      // 🔥 UPDATE STATUS AFTER PAYMENT
      await axios.put(
        `http://localhost:5000/admin/booking/${state._id}`,
        { status: "Confirmed" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Payment Successful ✅");

      navigate("/my-bookings");

    } catch (err) {
      console.error(err);
      alert("Payment Failed ❌");
    }

    setLoading(false);
  };

  return (
    <div className="payment-wrapper">

      <div className="payment-card">

        {/* LEFT */}
        <div className="payment-left">
          <h2>💳 Secure Checkout</h2>

          <div className="package-info">
            <h3>{state?.destination}</h3>
            <p className="price">
              👤 {state?.persons} Persons
            </p>
          </div>

          <h5>
            📅 {new Date(state?.date).toLocaleDateString()}
          </h5>

        </div>

        {/* RIGHT */}
        <div className="payment-right">

          <h3>Enter Card Details</h3>

          <input type="text" placeholder="Card Number" />
          <input type="text" placeholder="Card Holder Name" />

          <div className="row-fields">
            <input type="text" placeholder="MM/YY" />
            <input type="text" placeholder="CVV" />
          </div>

          <button className="pay-btn" onClick={handlePayment}>
            {loading ? "Processing..." : "Pay Now"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default Payment;