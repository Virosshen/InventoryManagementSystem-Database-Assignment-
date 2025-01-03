import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ setIsAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });

      const { role, message } = response.data;
      alert(`${message}. Welcome, ${role}!`);
      
      // Store auth token and role
      localStorage.setItem("authToken", "true");
      localStorage.setItem("userRole", role); // Store user role (Admin/Staff)

      setIsAuthenticated(true);
      navigate("/products"); // Redirect to Products page
    } catch (err) {
      setError("Invalid username or password.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background:
          "linear-gradient(135deg, #f4f4f4 0%, #dcdcdc 50%, #bfbfbf 100%)",
        fontFamily: "'Poppins', sans-serif",
        color: "#333",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "400px",
          padding: "30px",
          background: "#ffffff",
          borderRadius: "15px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
            fontSize: "2rem",
            fontWeight: "600",
            letterSpacing: "1px",
            color: "#333",
          }}
        >
          Welcome Back
        </h2>
        <p
          style={{
            marginBottom: "30px",
            color: "#777",
            fontSize: "14px",
            lineHeight: "1.5",
          }}
        >
          Please log in to access your account.
        </p>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                backgroundColor: "#f9f9f9",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
                marginBottom: "10px",
              }}
              required
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                backgroundColor: "#f9f9f9",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
              }}
              required
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              background: "linear-gradient(90deg, #333, #555)",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "transform 0.3s, box-shadow 0.3s",
              textTransform: "uppercase",
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "none";
            }}
          >
            Log In
          </button>
          {error && (
            <div
              style={{
                marginTop: "15px",
                color: "#d9534f",
                fontSize: "13px",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
