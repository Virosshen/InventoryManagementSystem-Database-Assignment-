import React, { useState, useEffect } from "react";
import api from "./api"; // Assuming you have API calls in api.js
import "bootstrap/dist/css/bootstrap.min.css";

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [formData, setFormData] = useState({
    SupplierName: "",
    ContactName: "",
    Phone: "",
    Email: "",
    Address: "",
  });
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [modalType, setModalType] = useState("");
  const [error, setError] = useState(null);

  const userRole = localStorage.getItem("userRole"); // Retrieve user role from localStorage

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await api.getSuppliers();
      setSuppliers(response.data);
    } catch (error) {
      console.error("Error fetching suppliers:", error.message);
      setError("Failed to fetch suppliers. Please try again.");
    }
  };

  const openModal = (type, supplier = null) => {
    setModalType(type);
    if (type === "edit" && supplier) {
      setSelectedSupplier(supplier);
      setFormData({
        SupplierName: supplier.SupplierName || "",
        ContactName: supplier.ContactName || "",
        Phone: supplier.Phone || "",
        Email: supplier.Email || "",
        Address: supplier.Address || "",
      });
    } else {
      setSelectedSupplier(null);
      setFormData({
        SupplierName: "",
        ContactName: "",
        Phone: "",
        Email: "",
        Address: "",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value.trim(), // Ensures no trailing whitespace
    }));
  };

  const handleSubmit = async () => {
    try {
      console.log("Submitting formData:", formData); // Debugging log
      if (modalType === "add") {
        await api.addSupplier(formData);
        alert("Supplier added successfully!");
      } else if (modalType === "edit") {
        await api.updateSupplier(selectedSupplier.SupplierID, formData);
        alert("Supplier updated successfully!");
      }
      fetchSuppliers(); // Refresh the suppliers list
    } catch (error) {
      console.error("Error saving supplier:", error.message);
      alert("Error: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      try {
        await api.deleteSupplier(id);
        alert("Supplier deleted successfully!");
        fetchSuppliers();
      } catch (error) {
        console.error("Error deleting supplier:", error.message);
        alert("Error deleting supplier: " + error.message);
      }
    }
  };

  return (
    <div className="container mt-4 text-center">
      <h2 className="mb-4">Suppliers</h2>

      <div className="mb-3 d-flex justify-content-center">
        <button
          className="btn btn-success"
          onClick={() => openModal("add")}
          data-bs-toggle="modal"
          data-bs-target="#supplierModal"
        >
          Add Supplier
        </button>
      </div>

      {error && <p className="text-danger">{error}</p>}

      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier.SupplierID}>
                <td>{supplier.SupplierID}</td>
                <td>{supplier.SupplierName}</td>
                <td>{supplier.ContactName}</td>
                <td>{supplier.Phone}</td>
                <td>{supplier.Email}</td>
                <td>{supplier.Address}</td>
                <td>
                  <div className="d-flex justify-content-center gap-2">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => openModal("edit", supplier)}
                      data-bs-toggle="modal"
                      data-bs-target="#supplierModal"
                    >
                      Edit
                    </button>
                    {/* Conditionally render delete button for Admin */}
                    {userRole === "Admin" && (
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(supplier.SupplierID)}
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
        id="supplierModal"
        tabIndex="-1"
        aria-labelledby="supplierModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="supplierModalLabel">
                {modalType === "add" ? "Add Supplier" : "Edit Supplier"}
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
                  <label htmlFor="SupplierName" className="form-label">
                    Supplier Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="SupplierName"
                    name="SupplierName"
                    value={formData.SupplierName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="ContactName" className="form-label">
                    Contact Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="ContactName"
                    name="ContactName"
                    value={formData.ContactName}
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

export default Suppliers;
