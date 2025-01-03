import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Backend URL

// Helper function to handle errors
const handleApiError = (error) => {
  console.error('API Error:', error.message);
  throw error;
};

// API Object
const api = {
  // Products
  getProducts: async () => {
    try {
      return await axios.get(`${API_BASE_URL}/products`);
    } catch (error) {
      handleApiError(error);
    }
  },
  addProduct: async (data) => {
    try {
      return await axios.post(`${API_BASE_URL}/products`, data);
    } catch (error) {
      handleApiError(error);
    }
  },
  updateProduct: async (id, data) => {
    try {
      console.log("Sending Update Request for Product ID:", id);
      console.log("Update Payload:", data);
      const response = await axios.put(`${API_BASE_URL}/products/${id}`, data);
      console.log("Update Response:", response.data);
      return response;
    } catch (error) {
      handleApiError(error);
    }
  },
  deleteProduct: async (id) => {
    try {
      return await axios.delete(`${API_BASE_URL}/products/${id}`);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Customers
  getCustomers: async () => {
    try {
      return await axios.get(`${API_BASE_URL}/customers`);
    } catch (error) {
      handleApiError(error);
    }
  },
  addCustomer: async (data) => {
    try {
      return await axios.post(`${API_BASE_URL}/customers`, data);
    } catch (error) {
      handleApiError(error);
    }
  },
  updateCustomer: async (id, data) => {
    try {
      return await axios.put(`${API_BASE_URL}/customers/${id}`, data);
    } catch (error) {
      handleApiError(error);
    }
  },
  deleteCustomer: async (id) => {
    try {
      return await axios.delete(`${API_BASE_URL}/customers/${id}`);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Orders
  getOrders: async () => {
    try {
      return await axios.get(`${API_BASE_URL}/orders`);
    } catch (error) {
      handleApiError(error);
    }
  },
  addOrder: async (data) => {
    try {
      return await axios.post(`${API_BASE_URL}/orders`, data);
    } catch (error) {
      handleApiError(error);
    }
  },
  updateOrder: async (id, data) => {
    try {
      return await axios.put(`${API_BASE_URL}/orders/${id}`, data);
    } catch (error) {
      handleApiError(error);
    }
  },
  deleteOrder: async (id) => {
    try {
      return await axios.delete(`${API_BASE_URL}/orders/${id}`);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Suppliers
  getSuppliers: async () => {
    try {
      return await axios.get(`${API_BASE_URL}/suppliers`);
    } catch (error) {
      handleApiError(error);
    }
  },
  addSupplier: async (data) => {
    try {
      return await axios.post(`${API_BASE_URL}/suppliers`, data);
    } catch (error) {
      handleApiError(error);
    }
  },
  updateSupplier: async (id, data) => {
    try {
      return await axios.put(`${API_BASE_URL}/suppliers/${id}`, data);
    } catch (error) {
      handleApiError(error);
    }
  },
  deleteSupplier: async (id) => {
    try {
      return await axios.delete(`${API_BASE_URL}/suppliers/${id}`);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Inventory Transactions
  getTransactions: async () => {
    try {
      return await axios.get(`${API_BASE_URL}/transactions`);
    } catch (error) {
      handleApiError(error);
    }
  },
  addTransaction: async (data) => {
    try {
      return await axios.post(`${API_BASE_URL}/transactions`, data);
    } catch (error) {
      handleApiError(error);
    }
  },
  updateTransaction: async (id, data) => {
    try {
      return await axios.put(`${API_BASE_URL}/transactions/${id}`, data);
    } catch (error) {
      handleApiError(error);
    }
  },
  deleteTransaction: async (id) => {
    try {
      return await axios.delete(`${API_BASE_URL}/transactions/${id}`);
    } catch (error) {
      handleApiError(error);
    }
  },
};

export default api;
