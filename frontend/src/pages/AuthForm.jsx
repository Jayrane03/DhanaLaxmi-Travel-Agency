// AuthForm.jsx

import React, { useState } from "react";
import "../style/pages.css";

import { TextField, Button, Snackbar, Alert } from "@mui/material";

// import SignInImg from "../Images/login.png";
// import SignUpImg from "../Images/regi.jpg";

import axios from "axios";
import config from "../services/helper";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthForm() {

  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  const navigate = useNavigate();

  const { login } = useAuth();

  // REGISTER

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    adminKey: "",
  });

  // LOGIN

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // SNACKBAR

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // HANDLE CHANGE

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  // REGISTER

  const registerUser = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        `${config.BASE_URL}/api/auth/signup`,
        registerData
      );

      setSnackbar({
        open: true,
        message: "Registration Successful",
        severity: "success",
      });

      setIsRightPanelActive(false);

    } catch (error) {

      setSnackbar({
        open: true,
        message:
          error.response?.data?.message ||
          "Registration Failed",
        severity: "error",
      });

    }
  };

  // LOGIN

  const loginUser = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        `${config.BASE_URL}/api/auth/signin`,
        loginData
      );

      login(response.data.user, response.data.token);

      setSnackbar({
        open: true,
        message: "Login Successful",
        severity: "success",
      });

      if (response.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }

    } catch (error) {

      setSnackbar({
        open: true,
        message:
          error.response?.data?.message ||
          "Login Failed",
        severity: "error",
      });

    }
  };

  return (
    <>

      {/* SNACKBAR */}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >

        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>

      </Snackbar>

      {/* MAIN */}

      <div className="authPage-body">

        <div
          className={`authPage-container ${
            isRightPanelActive
              ? "authPage-right-active"
              : ""
          }`}
        >

          {/* SIGN UP */}

          <div className="authPage-form authPage-signup">

            <form onSubmit={registerUser}>

              <h1>Create Account</h1>

              <TextField
                label="Name"
                name="name"
                value={registerData.name}
                onChange={handleRegisterChange}
                fullWidth
                margin="normal"
                required
              />

              <TextField
                label="Email"
                name="email"
                type="email"
                value={registerData.email}
                onChange={handleRegisterChange}
                fullWidth
                margin="normal"
                required
              />

              <TextField
                label="Admin Key (optional)"
                name="adminKey"
                value={registerData.adminKey}
                onChange={handleRegisterChange}
                fullWidth
                margin="normal"
              />

              <TextField
                label="Password"
                name="password"
                type="password"
                value={registerData.password}
                onChange={handleRegisterChange}
                fullWidth
                margin="normal"
                required
              />

              <Button
                type="submit"
                variant="contained"
                className="authPage-btn"
              >
                Sign Up
              </Button>

            </form>

          </div>

          {/* SIGN IN */}

          <div className="authPage-form authPage-signin">

            <form onSubmit={loginUser}>

              <h1>Sign In</h1>

              <TextField
                label="Email"
                name="email"
                type="email"
                value={loginData.email}
                onChange={handleLoginChange}
                fullWidth
                margin="normal"
                required
              />

              <TextField
                label="Password"
                name="password"
                type="password"
                value={loginData.password}
                onChange={handleLoginChange}
                fullWidth
                margin="normal"
                required
              />

              <Button
                type="submit"
                variant="contained"
                className="authPage-btn"
              >
                Sign In
              </Button>

            </form>

          </div>

          {/* OVERLAY */}

          <div className="authPage-overlay-container">

            <div className="authPage-overlay">

              {/* LEFT */}

              <div className="authPage-overlay-panel authPage-left">

                <h1>Welcome Back</h1>

                <p>
                  Login and continue your amazing travel journey
                  with BLUE BUS.
                </p>
{/* 
                <img
                  src={SignInImg}
                  alt="signin"
                  className="authPage-image"
                /> */}

                <Button
                  variant="outlined"
                  className="authPage-ghost"
                  onClick={() =>
                    setIsRightPanelActive(false)
                  }
                >
                  Sign In
                </Button>

              </div>

              {/* RIGHT */}

              <div className="authPage-overlay-panel authPage-right">

                <h1>Hello Traveler!</h1>

                <p>
                  Create your account and explore beautiful
                  destinations with us.
                </p>

                {/* <img
                  src={SignUpImg}
                  alt="signup"
                  className="authPage-image"
                /> */}

                <Button
                  variant="outlined"
                  className="authPage-ghost"
                  onClick={() =>
                    setIsRightPanelActive(true)
                  }
                >
                  Sign Up
                </Button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </>
  );
}