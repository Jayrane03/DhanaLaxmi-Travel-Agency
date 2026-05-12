import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import autRoutes from "./routes/auth-route.js"
import bookingRoutes from "./routes/booking-routes.js"
import newsLetterRoutes from "./routes/newsLetter.js"
import adminRoutes from "./routes/admin/admin-routes.js"
import adminBookingRoutes from "./routes/admin/admin-booking-routes.js"
import payementRoutes from "./routes/payment-routes.js"
// import bookingRoutes from "./routes/admin/admin-routes.js";
// import transRoutes from "./routes/auth-trans.js"
// import netWorthRoutes from "./routes/net-worth-routes.js";
// import budgetRoutes from "./routes/bud-route.js";
import queryRoutes from "./routes/admin/admin-query-routes.js"
const app = express();
const allowedOrigins = [
  'http://localhost:3000',                            // Local dev
  // 'https://budget-tracker-frontend-ijfx.onrender.com' // Production
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow no origin (like Postman or curl) or whitelisted origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed from this origin: ' + origin));
    }
  },
  credentials: true,
}));
app.use(express.json());

// Connect DB
connectDB();

app.use("/api/admin", adminRoutes);
app.use("/api/auth",autRoutes); 
app.use("/api/bookings", bookingRoutes);
app.use("/api/newsletter", newsLetterRoutes);
app.use("/admin", adminBookingRoutes);
app.use("/api/payment", payementRoutes);

app.use("/api/queries", queryRoutes);


// app.use("/api", bookingRoutes);
// app.use('/api/transactions', transRoutes)
// app.use('/api', netWorthRoutes);
// app.use('/api/bud', budgetRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
