import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";
import Login from "./Login";
import Products from "./Products";
import Customers from "./Customers";
import Orders from "./Orders";
import Suppliers from "./Suppliers";
import InventoryTransactions from "./InventoryTransactions";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const role = localStorage.getItem("userRole");
    setIsAuthenticated(authToken === "true");
    setUserRole(role);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    setIsAuthenticated(false);
    setUserRole("");
  };

  return (
    <Router>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Poppins', sans-serif",
          background: "#f9f9f9",
          color: "#333",
        }}
      >
        {/* Header */}
        <h1
          style={{
            fontSize: "2.8rem",
            fontWeight: "bold",
            textTransform: "uppercase",
            color: "#2a3e50",
            padding: "15px 30px",
            background: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            letterSpacing: "1px",
            marginBottom: "20px",
          }}
        >
          Inventory Management System
        </h1>

        {/* Display User Role */}
        {isAuthenticated && (
  <div
    style={{
      position: "absolute",
      top: "20px",
      right: "20px",
      fontSize: "1rem",
      color: "#333",
      fontWeight: "bold",
      background: "#f9f9f9",
      padding: "10px 15px",
      borderRadius: "12px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      zIndex: 1000,
    }}
  >
    Logged in as <span style={{ color: "#007bff" }}>{userRole}</span>
  </div>
)}

        {isAuthenticated && (
          <div style={{ width: "100%", textAlign: "center", marginBottom: "30px" }}>
            {/* Navigation Links */}
            <nav>
              <ul
                className="list-unstyled d-flex justify-content-center gap-4"
                style={{
                  padding: "10px 0",
                  background: "#ffffff",
                  borderRadius: "8px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <li>
                  <Link
                    to="/products"
                    className="btn"
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#007bff",
                      color: "#fff",
                      borderRadius: "6px",
                      textDecoration: "none",
                      fontWeight: "500",
                      transition: "all 0.3s",
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/customers"
                    className="btn"
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#007bff",
                      color: "#fff",
                      borderRadius: "6px",
                      textDecoration: "none",
                      fontWeight: "500",
                      transition: "all 0.3s",
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
                  >
                    Customers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/orders"
                    className="btn"
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#007bff",
                      color: "#fff",
                      borderRadius: "6px",
                      textDecoration: "none",
                      fontWeight: "500",
                      transition: "all 0.3s",
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/suppliers"
                    className="btn"
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#007bff",
                      color: "#fff",
                      borderRadius: "6px",
                      textDecoration: "none",
                      fontWeight: "500",
                      transition: "all 0.3s",
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
                  >
                    Suppliers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/inventoryTransactions"
                    className="btn"
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#007bff",
                      color: "#fff",
                      borderRadius: "6px",
                      textDecoration: "none",
                      fontWeight: "500",
                      transition: "all 0.3s",
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
                  >
                    Inventory Transactions
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Logout Button */}
            <button
              className="btn"
              onClick={handleLogout}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                fontSize: "16px",
                fontWeight: "bold",
                color: "#fff",
                backgroundColor: "#dc3545",
                border: "none",
                borderRadius: "6px",
                transition: "all 0.3s",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#c82333";
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#dc3545";
                e.target.style.transform = "scale(1)";
              }}
            >
              Logout
            </button>
          </div>
        )}

        {/* Main Content */}
        <div style={{ width: "100%", maxWidth: "1100px", marginTop: "20px" }}>
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/products" />
                ) : (
                  <Login setIsAuthenticated={setIsAuthenticated} />
                )
              }
            />
            <Route
              path="/products"
              element={isAuthenticated ? <Products /> : <Navigate to="/" />}
            />
            <Route
              path="/customers"
              element={isAuthenticated ? <Customers /> : <Navigate to="/" />}
            />
            <Route
              path="/orders"
              element={isAuthenticated ? <Orders /> : <Navigate to="/" />}
            />
            <Route
              path="/suppliers"
              element={isAuthenticated ? <Suppliers /> : <Navigate to="/" />}
            />
            <Route
              path="/inventoryTransactions"
              element={
                isAuthenticated ? <InventoryTransactions /> : <Navigate to="/" />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
