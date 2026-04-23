import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Packages from './pages/Packages';
import Destination from './pages/Destination';
import Booking from './pages/Booking';
import Team from './pages/Team';
import Error from './pages/Error';
import Contact from './pages/Contact';
import AuthForm from './pages/AuthForm';
import MyBookings from "./pages/MyBookings";
import Payment from './pages/Payment';
import Users from './admin/Users';
import AdminRoute from './admin/AdminRoutes';
import AdminDashboard from './admin/AdminDashboard';
import AdminLayout from './admin/AdminLayout'; // ✅ IMPORTANT
import AdminBooking from './admin/AdminBooking';
import AdminPackages from './admin/AdminPackages';
export default function App() {

  const location = useLocation();

  // hide header/footer on register + all admin routes
  const hideLayout =
    location.pathname === "/register" ||
    location.pathname.startsWith("/admin");

  return (
    <div>

      {!hideLayout && <Header />}

      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<AuthForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/destination" element={<Destination />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/error" element={<Error />} />
        <Route path="/payment" element={<Payment />} />

        {/* 🔥 ADMIN ROUTES WITH LAYOUT */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </AdminRoute>
          }
        />
<Route
  path="/admin/packages"
  element={
    <AdminRoute>
      <AdminLayout>
        <AdminPackages />
      </AdminLayout>
    </AdminRoute>
  }
/>
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AdminLayout>
                <Users />
              </AdminLayout>
            </AdminRoute>
          }
        />
        <Route
  path="/admin/bookings"
  element={
    <AdminRoute>
      <AdminLayout>
        <AdminBooking />
      </AdminLayout>
    </AdminRoute>
  }
/>

      </Routes>

      {!hideLayout && <Footer />}

    </div>
  );
}