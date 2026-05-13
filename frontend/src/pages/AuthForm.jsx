import React, { useState } from "react";
import "../style/pages.css";
import { TextField, Button, Snackbar, Alert } from "@mui/material";
import SignInImg from "../Images/login.png";
import SignUpImg from "../Images/regi.jpg";
import axios from "axios";
import config from "../services/helper";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ Added import

export default function AuthForm() {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ AuthContext hook

  // Form states
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
     adminKey: "" 
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Handle input change
  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // Register user
  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${config.BASE_URL}/api/auth/signup`,
        registerData
      );
      setSnackbar({
        open: true,
        message: "✅ Registration successful! Please sign in.",
        severity: "success",
      });
      console.log(response.data);
      setIsRightPanelActive(false);
    } catch (error) {
      console.error("❌ Error during registration:", error.response?.data || error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Registration failed. Try again!",
        severity: "error",
      });
    }
  };

  // Login user
  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${config.BASE_URL}/api/auth/signin`,
        loginData
      );
      setSnackbar({
        open: true,
        message: "✅ Login successful!",
        severity: "success",
      });
      console.log(response.data);

      // ✅ Call the login function from AuthContext
      login(response.data.user, response.data.token);
      if(response.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.error("❌ Error during login:", error.response?.data || error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Login failed. Check your credentials.",
        severity: "error",
      });
    }
  };

  return (
    <>
      {/* Snackbar Alert */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <div className="auth-body">
        <div
          className={`container-form ${isRightPanelActive ? "right-panel-active" : ""}`}
          id="container"
        >
          {/* Sign Up Form */}
          <div className="form-container sign-up-container">
            <form onSubmit={registerUser}>
              <h1>Create Account</h1>
              <TextField
                label="Name"
                name="name"
                value={registerData.name}
                onChange={handleRegisterChange}
                variant="outlined"
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
                variant="outlined"
                fullWidth
                margin="normal"
                required
              />
              <TextField
  label="Admin Key (optional)"
  name="adminKey"
  value={registerData.adminKey || ""}
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
                variant="outlined"
                fullWidth
                margin="normal"
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="authBtn"
                sx={{
                  mt: 2,
                  borderRadius: "20px",
                  width: "80%",
                  padding: "10px",
                }}
              >
                Sign Up
              </Button>
            </form>
          </div>

          {/* Sign In Form */}
          <div className="form-container sign-in-container">
            <form onSubmit={loginUser}>
              <h1>Sign In</h1>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={loginData.email}
                onChange={handleLoginChange}
                variant="outlined"
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
                variant="outlined"
                fullWidth
                margin="normal"
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="authBtn"
                sx={{
                  mt: 2,
                  borderRadius: "20px",
                  width: "80%",
                  padding: "10px",
                }}
              >
                Sign In
              </Button>
            </form>
          </div>

          {/* Overlay Section */}
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1 className="heading">Welcome back! Let’s track your money smartly</h1>
                <p>To keep connected with us please login with your personal info</p>
                <img src={SignInImg} alt="Sign In" className="auth-image" />
                <Button
                  variant="outlined"
                  className="ghost"
                  onClick={() => setIsRightPanelActive(false)}
                  sx={{
                    borderRadius: "20px",
                    color: "white",
                    borderColor: "white",
                  }}
                >
                  Sign In
                </Button>
              </div>

              <div className="overlay-panel overlay-right">
                <h1 className="heading">Hello, Friend!</h1>
                <p>
                  Enter your personal details — your traveling journey continues here.
                </p>
                <img src={SignUpImg} alt="Sign Up" className="auth-image" />
                <Button
                  variant="outlined"
                  className="ghost"
                  onClick={() => setIsRightPanelActive(true)}
                  sx={{
                    borderRadius: "20px",
                    color: "white",
                    borderColor: "white",
                  }}
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
