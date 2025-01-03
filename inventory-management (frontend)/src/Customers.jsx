import React, { useState, useEffect } from "react";
import api from "./api";
import "bootstrap/dist/css/bootstrap.min.css";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Phone: "",
    Address: "",
  });
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [modalType, setModalType] = useState("");
  const [error, setError] = useState(null);

  const userRole = localStorage.getItem("userRole"); // Retrieve role from localStorage

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await api.getCustomers();
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error.message);
      setError("Failed to fetch customers. Please try again.");
    }
  };

  const openModal = (type, customer = null) => {
    setModalType(type);
    if (type === "edit" && customer) {
      setSelectedCustomer(customer);
      setFormData({ ...customer });
    } else {
      setFormData({
        FirstName: "",
        LastName: "",
        Email: "",
        Phone: "",
        Address: "",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (modalType === "add") {
        await api.addCustomer(formData);
        alert("Customer added successfully!");
      } else if (modalType === "edit") {
        await api.updateCustomer(selectedCustomer.CustomerID, formData);
        alert("Customer updated successfully!");
      }
      fetchCustomers();
    } catch (error) {
      console.error("Error saving customer:", error.message);
      alert("Error: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await api.deleteCustomer(id);
        alert("Customer deleted successfully!");
        fetchCustomers();
      } catch (error) {
        console.error("Error deleting customer:", error.message);
        alert("Error deleting customer: " + error.message);
      }
    }
  };

  return (
    <div className="container mt-5 text-center">
      <h2 className="mb-4">Customers</h2>

      <div className="mb-3 d-flex justify-content-center gap-3">
        <button
          className="btn btn-success"
          onClick={() => openModal("add")}
          data-bs-toggle="modal"
          data-bs-target="#customerModal"
        >
          Add Customer
        </button>
      </div>

      {error && <p className="text-danger">{error}</p>}

      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.CustomerID}>
                <td>{customer.CustomerID}</td>
                <td>{customer.FirstName}</td>
                <td>{customer.LastName}</td>
                <td>{customer.Email}</td>
                <td>{customer.Phone}</td>
                <td>{customer.Address}</td>
                <td>
                  <div className="d-flex justify-content-center gap-2">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => openModal("edit", customer)}
                      data-bs-toggle="modal"
                      data-bs-target="#customerModal"
                    >
                      Edit
                    </button>
                    {/* Conditionally render delete button for admin */}
                    {userRole === "Admin" && (
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(customer.CustomerID)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="customerModal"
        tabIndex="-1"
        aria-labelledby="customerModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="customerModalLabel">
                {modalType === "add" ? "Add Customer" : "Edit Customer"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="FirstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="FirstName"
                    name="FirstName"
                    value={formData.FirstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="LastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="LastName"
                    name="LastName"
                    value={formData.LastName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="Email"
                    name="Email"
                    value={formData.Email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Phone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Phone"
                    name="Phone"
                    value={formData.Phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Address"
                    name="Address"
                    value={formData.Address}
                    onChange={handleInputChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
                data-bs-dismiss="modal"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customers;
