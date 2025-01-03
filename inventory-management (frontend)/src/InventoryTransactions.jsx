import React, { useState, useEffect } from "react";
import api from "./api";
import "bootstrap/dist/css/bootstrap.min.css";

function InventoryTransactions() {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const response = await api.getTransactions(); // Replace with your API endpoint
            setTransactions(response.data);
        } catch (error) {
            console.error("Error fetching transactions:", error.message);
            setError("Failed to fetch transactions. Please try again.");
        }
    };

    return (
        <div className="container mt-5 text-center">
            <h2 className="mb-4">Inventory Transactions</h2>

            {error && <p className="text-danger">{error}</p>}

            <div className="table-responsive">
                <table className="table table-striped table-bordered align-middle text-center">
                    <thead className="table-dark">
                        <tr>
                            <th>Transaction ID</th>
                            <th>Product ID</th>
                            <th>Transaction Type</th>
                            <th>Quantity</th>
                            <th>Transaction Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.TransactionID}>
                                <td>{transaction.TransactionID}</td>
                                <td>{transaction.ProductID}</td>
                                <td>{transaction.TransactionType}</td>
                                <td>{transaction.Quantity}</td>
                                <td>{new Date(transaction.TransactionDate).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default InventoryTransactions;
