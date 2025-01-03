import React, { useState, useEffect } from "react";
import api from "./api";
import "bootstrap/dist/css/bootstrap.min.css";

function Products() {
    const [products, setProducts] = useState([]);
    const [modalType, setModalType] = useState("");
    const [formData, setFormData] = useState({
        ProductName: "",
        Quantity: 0,
        Price: 0,
        SupplierID: null,
    });
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [error, setError] = useState(null);

    // Get the user's role from localStorage
    const userRole = localStorage.getItem("userRole"); // "Admin" or "Staff"

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await api.getProducts();
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error.message);
            setError("Failed to fetch products. Please try again.");
        }
    };

    const openModal = (type, product = null) => {
        setModalType(type);
        if (type === "edit" && product) {
            setSelectedProduct(product);
            setFormData({ ...product });
        } else {
            setFormData({
                ProductName: "",
                Quantity: 0,
                Price: 0,
                SupplierID: null,
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
                if (!formData.SupplierID || formData.SupplierID === "") {
                    alert("Supplier ID is required!");
                    return;
                }
                await api.addProduct(formData);
                alert("Product added successfully!");
            } else if (modalType === "edit") {
                await api.updateProduct(selectedProduct.ProductID, formData);
                alert("Product updated successfully!");
            }
            fetchProducts();
        } catch (error) {
            console.error("Error saving product:", error.message);
            alert("Error: " + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await api.deleteProduct(id);
                alert("Product deleted successfully!");
                fetchProducts();
            } catch (error) {
                console.error("Error deleting product:", error.message);
                alert("Error deleting product: " + error.message);
            }
        }
    };

    return (
        <div className="container mt-5 text-center">
            <h2 className="mb-4">Products</h2>

            <div className="mb-3 d-flex justify-content-center gap-3">
                <button
                    className="btn btn-success"
                    onClick={() => openModal("add")}
                    data-bs-toggle="modal"
                    data-bs-target="#productModal"
                >
                    Add Product
                </button>
            </div>

            {error && <p className="text-danger">{error}</p>}

            <div className="table-responsive">
                <table className="table table-striped table-bordered align-middle text-center">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Supplier ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.ProductID}>
                                <td>{product.ProductID}</td>
                                <td>{product.ProductName}</td>
                                <td>{product.Quantity}</td>
                                <td>{product.Price}</td>
                                <td>{product.SupplierID}</td>
                                <td>
                                    <div className="d-flex justify-content-center gap-2">
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => openModal("edit", product)}
                                            data-bs-toggle="modal"
                                            data-bs-target="#productModal"
                                        >
                                            Edit
                                        </button>
                                        {/* Conditionally render the Delete button */}
                                        {userRole === "Admin" && (
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDelete(product.ProductID)}
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
                id="productModal"
                tabIndex="-1"
                aria-labelledby="productModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="productModalLabel">
                                {modalType === "add" ? "Add Product" : "Edit Product"}
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
                                    <label htmlFor="ProductName" className="form-label">
                                        Product Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="ProductName"
                                        name="ProductName"
                                        value={formData.ProductName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Quantity" className="form-label">
                                        Quantity
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="Quantity"
                                        name="Quantity"
                                        value={formData.Quantity}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Price" className="form-label">
                                        Price
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="Price"
                                        name="Price"
                                        value={formData.Price}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="SupplierID" className="form-label">
                                        Supplier ID
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="SupplierID"
                                        name="SupplierID"
                                        value={formData.SupplierID || ""}
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

export default Products;
