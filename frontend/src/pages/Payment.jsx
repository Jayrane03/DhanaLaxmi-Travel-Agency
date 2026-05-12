import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/payment.css";

function Payment() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  // ✅ SINGLE SOURCE OF TRUTH
  const price = Number(state?.price || state?.package?.price || 0);

  useEffect(() => {
    console.log("STATE DATA:", state);
    console.log("FINAL PRICE:", price);
  }, [state, price]);

  const handlePayment = async () => {
    if (!price || isNaN(price)) {
      alert("Invalid price ❌");
      console.error("Invalid price:", state);
      return;
    }

    setLoading(true);

    try {
      // ✅ CREATE ORDER
      const { data } = await axios.post(
        "http://localhost:5000/api/payment/create-order",
        { amount: price },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // ✅ RAZORPAY OPTIONS
      const options = {
        key: "rzp_test_SgsruGGzwArIjD", // 🔴 replace
        amount: data.amount,
        currency: "INR",
        name: "DhanaLaxmi Travel",
        description: "Tour Booking Payment",
        order_id: data.id,

        handler: async function (response) {
          try {
            await axios.put(
  `http://localhost:5000/api/bookings/payment/${state?._id}`,
  {
    paymentId: response.razorpay_payment_id
  },
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);

            alert("Payment Successful ✅");
            navigate("/my-bookings");
          } catch (err) {
            console.error(err);
            alert("Payment save failed ❌");
          }
        },

        prefill: {
          name: "User",
          email: "user@gmail.com"
        },

        theme: {
          color: "#0d6efd"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      rzp.on("payment.failed", function (response) {
        console.error(response.error);
        alert("Payment Failed ❌");
      });

    } catch (err) {
      console.error("ORDER ERROR:", err.response?.data || err);
      alert("Error creating order ❌");
    }

    setLoading(false);
  };

  return (
    <div className="payment-wrapper">
      <div className="payment-card shadow">

        {/* LEFT */}
        <div className="payment-left">
          <h2>💳 Secure Checkout</h2>

          <div className="package-info">
            <h3>{state?.destination || "N/A"}</h3>
            <p>👤 {state?.persons || 0} Persons</p>
            <h4 className="price">₹ {price}</h4>
          </div>

          <p>
            📅 {state?.date
              ? new Date(state.date).toLocaleDateString()
              : "N/A"}
          </p>
        </div>

        {/* RIGHT */}
        <div className="payment-right">
          <h3>Complete Your Payment</h3>

          <p className="text-muted">
            Click below to pay securely using Razorpay
          </p>

          <button
            className="pay-btn btn btn-primary w-100"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? "Processing..." : `Pay ₹${price}`}
          </button>
        </div>

      </div>
    </div>
  );
}

export default Payment;