import React, { useState, useEffect } from 'react';
import api from './api';
import 'bootstrap/dist/css/bootstrap.min.css';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await api.getOrders();
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error.message);
            setError('Failed to fetch orders. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mt-5 text-center">
            <h2 className="mb-4">Orders</h2>

            {/* Refresh Button */}
            <div className="mb-3 d-flex justify-content-center">
                <button onClick={fetchOrders} className="btn btn-primary">
                    Refresh Orders
                </button>
            </div>

            {/* Error Message */}
            {error && <p className="text-danger">{error}</p>}

            {/* Table or Loading */}
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered align-middle text-center">
                        <thead className="table-dark">
                            <tr>
                                <th>Order ID</th>
                                <th>Customer ID</th>
                                <th>Product ID</th>
                                <th>Quantity Ordered</th>
                                <th>Order Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.OrderID}>
                                    <td>{order.OrderID}</td>
                                    <td>{order.CustomerID}</td>
                                    <td>{order.ProductID}</td>
                                    <td>{order.QuantityOrdered}</td>
                                    <td>{new Date(order.OrderDate).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Orders;
