const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Add this line
const connectToDatabase = require('./db');

const app = express();
app.use(cors()); // Add this line
app.use(bodyParser.json());

// Default Route
app.get('/', (req, res) => {
    res.send('Inventory Management System Backend is Running!');
});

// === Login Route ===
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const pool = await connectToDatabase();
        const result = await pool.request()
            .input('Username', username)
            .query('SELECT * FROM Users WHERE Username = @Username');

        const user = result.recordset[0];
        if (!user || user.UserPassword !== password) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        res.status(200).json({ message: 'Login successful', role: user.Role });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});


// === PRODUCTS TABLE ===
app.get('/products', async (req, res) => {
    try {
        const pool = await connectToDatabase();
        const result = await pool.request().query('SELECT * FROM Products');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).send('Error fetching products: ' + error.message);
    }
});

app.post('/products', async (req, res) => {
    const { ProductName, Quantity, Price, SupplierID } = req.body;

    // Ensure SupplierID is included in the request body
    if (!SupplierID) {
        return res.status(400).json({ message: 'Supplier ID is required!' });
    }

    try {
        const pool = await connectToDatabase();
        const result = await pool.request()
            .input('ProductName', ProductName)
            .input('Quantity', Quantity)
            .input('Price', Price)
            .input('SupplierID', SupplierID) // Ensure this is handled properly
            .query(`
                INSERT INTO Products (ProductName, Quantity, Price, SupplierID)
                VALUES (@ProductName, @Quantity, @Price, @SupplierID)
            `);

        res.status(201).json({ message: 'Product added successfully!' });
    } catch (error) {
        console.error("Error adding product:", error.message);
        res.status(500).json({ message: 'Failed to add product', error: error.message });
    }
});




app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { ProductName, Quantity, Price, SupplierID } = req.body;
  
    try {
      const pool = await connectToDatabase(); // Ensure the const pool is connected to the DB 
      const result = await pool.request()
        .input('ProductId', id)
        .input('ProductName', ProductName)
        .input('Quantity', Quantity)
        .input('Price', Price)
        .input('SupplierID', SupplierID)
        .query(`
          UPDATE Products
          SET ProductName = @ProductName, Quantity = @Quantity, Price = @Price, SupplierID = @SupplierID
          WHERE ProductId = @ProductId
        `);
  
      if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
      console.error('Error updating product:', error.message);
      res.status(500).json({ message: 'Failed to update product', error: error.message });
    }
  });



  
  






app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await connectToDatabase();
        await pool.request()
            .input('ProductID', id)
            .query('DELETE FROM Products WHERE ProductID = @ProductID');
        res.send('Product deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting product: ' + error.message);
    }
});

// === CUSTOMERS TABLE ===
app.get('/customers', async (req, res) => {
    try {
        const pool = await connectToDatabase();
        const result = await pool.request().query('SELECT * FROM Customers');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).send('Error fetching customers: ' + error.message);
    }
});

app.post('/customers', async (req, res) => {
    const { FirstName, LastName, Email, Phone, Address } = req.body;
    try {
        const pool = await connectToDatabase();
        await pool.request()
            .input('FirstName', FirstName)
            .input('LastName', LastName)
            .input('Email', Email)
            .input('Phone', Phone)
            .input('Address', Address)
            .query('INSERT INTO Customers (FirstName, LastName, Email, Phone, Address) VALUES (@FirstName, @LastName, @Email, @Phone, @Address)');
        res.status(201).send('Customer added successfully');
    } catch (error) {
        res.status(500).send('Error adding customer: ' + error.message);
    }
});

app.put('/customers/:id', async (req, res) => {
    const { id } = req.params;
    const { Address } = req.body;
    try {
        const pool = await connectToDatabase();
        await pool.request()
            .input('CustomerID', id)
            .input('Address', Address)
            .query('UPDATE Customers SET Address = @Address WHERE CustomerID = @CustomerID');
        res.send('Customer updated successfully');
    } catch (error) {
        res.status(500).send('Error updating customer: ' + error.message);
    }
});

app.delete('/customers/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await connectToDatabase();
        await pool.request()
            .input('CustomerID', id)
            .query('DELETE FROM Customers WHERE CustomerID = @CustomerID');
        res.send('Customer deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting customer: ' + error.message);
    }
});

// === ORDERS TABLE ===

// GET all orders
app.get('/orders', async (req, res) => {
    try {
        const pool = await connectToDatabase();
        const result = await pool.request().query('SELECT * FROM Orders');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).send('Error fetching orders: ' + error.message);
    }
});

// POST a new order
app.post('/orders', async (req, res) => {
    const { CustomerID, ProductID, QuantityOrdered } = req.body;
    try {
        const pool = await connectToDatabase();
        await pool.request()
            .input('CustomerID', CustomerID)
            .input('ProductID', ProductID)
            .input('QuantityOrdered', QuantityOrdered)
            .query('INSERT INTO Orders (CustomerID, ProductID, QuantityOrdered, OrderDate) VALUES (@CustomerID, @ProductID, @QuantityOrdered, GETDATE())');
        res.status(201).send('Order added successfully');
    } catch (error) {
        res.status(500).send('Error adding order: ' + error.message);
    }
});

// PUT to update an order
app.put('/orders/:id', async (req, res) => {
    const { id } = req.params; // OrderID
    const { QuantityOrdered } = req.body;
    try {
        const pool = await connectToDatabase();
        await pool.request()
            .input('OrderID', id)
            .input('QuantityOrdered', QuantityOrdered)
            .query('UPDATE Orders SET QuantityOrdered = @QuantityOrdered WHERE OrderID = @OrderID');
        res.send('Order updated successfully');
    } catch (error) {
        res.status(500).send('Error updating order: ' + error.message);
    }
});

// DELETE an order
app.delete('/orders/:id', async (req, res) => {
    const { id } = req.params; // OrderID
    try {
        const pool = await connectToDatabase();
        await pool.request()
            .input('OrderID', id)
            .query('DELETE FROM Orders WHERE OrderID = @OrderID');
        res.send('Order deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting order: ' + error.message);
    }
});


/// === SUPPLIERS TABLE ===

// Fetch All Suppliers
app.get('/suppliers', async (req, res) => {
    try {
        const pool = await connectToDatabase();
        const result = await pool.request().query('SELECT * FROM Suppliers');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).send('Error fetching suppliers: ' + error.message);
    }
});

// Add a New Supplier
app.post('/suppliers', async (req, res) => {
    const { SupplierName, ContactName, Phone, Email, Address } = req.body;
    try {
        const pool = await connectToDatabase();
        await pool.request()
            .input('SupplierName', SupplierName)
            .input('ContactName', ContactName)
            .input('Phone', Phone)
            .input('Email', Email)
            .input('Address', Address)
            .query(`
                INSERT INTO Suppliers (SupplierName, ContactName, Phone, Email, Address, CreatedAt)
                VALUES (@SupplierName, @ContactName, @Phone, @Email, @Address, GETDATE())
            `);
        res.status(201).send('Supplier added successfully');
    } catch (error) {
        res.status(500).send('Error adding supplier: ' + error.message);
    }
});

// Update a Supplier
app.put('/suppliers/:id', async (req, res) => {
    const { id } = req.params;
    const { Phone, Email, Address } = req.body;
    try {
        const pool = await connectToDatabase();
        await pool.request()
            .input('SupplierID', id)
            .input('Phone', Phone)
            .input('Email', Email)
            .input('Address', Address)
            .query(`
                UPDATE Suppliers
                SET Phone = @Phone, Email = @Email, Address = @Address
                WHERE SupplierID = @SupplierID
            `);
        res.send('Supplier updated successfully');
    } catch (error) {
        res.status(500).send('Error updating supplier: ' + error.message);
    }
});

// Delete a Supplier
app.delete('/suppliers/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await connectToDatabase();
        await pool.request()
            .input('SupplierID', id)
            .query('DELETE FROM Suppliers WHERE SupplierID = @SupplierID');
        res.send('Supplier deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting supplier: ' + error.message);
    }
});


// === INVENTORY TRANSACTIONS TABLE ===

// Fetch All Inventory Transactions
app.get('/transactions', async (req, res) => {
    try {
        const pool = await connectToDatabase();
        const result = await pool.request().query('SELECT * FROM InventoryTransactions');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).send('Error fetching transactions: ' + error.message);
    }
});

// Add a New Inventory Transaction
app.post('/transactions', async (req, res) => {
    const { ProductID, TransactionType, Quantity } = req.body;
    try {
        const pool = await connectToDatabase();
        await pool.request()
            .input('ProductID', ProductID)
            .input('TransactionType', TransactionType)
            .input('Quantity', Quantity)
            .query(`
                INSERT INTO InventoryTransactions (ProductID, TransactionType, Quantity, TransactionDate)
                VALUES (@ProductID, @TransactionType, @Quantity, GETDATE())
            `);
        res.status(201).send('Transaction added successfully');
    } catch (error) {
        res.status(500).send('Error adding transaction: ' + error.message);
    }
});

// Update an Inventory Transaction
app.put('/transactions/:id', async (req, res) => {
    const { id } = req.params;
    const { Quantity } = req.body;
    try {
        const pool = await connectToDatabase();
        await pool.request()
            .input('TransactionID', id)
            .input('Quantity', Quantity)
            .query(`
                UPDATE InventoryTransactions
                SET Quantity = @Quantity
                WHERE TransactionID = @TransactionID
            `);
        res.send('Transaction updated successfully');
    } catch (error) {
        res.status(500).send('Error updating transaction: ' + error.message);
    }
});

// Delete an Inventory Transaction
app.delete('/transactions/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await connectToDatabase();
        await pool.request()
            .input('TransactionID', id)
            .query('DELETE FROM InventoryTransactions WHERE TransactionID = @TransactionID');
        res.send('Transaction deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting transaction: ' + error.message);
    }
});


// Start the Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
