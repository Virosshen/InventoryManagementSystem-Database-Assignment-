# Inventory Management System

This project is a web-based **Inventory Management System** designed to manage products, customers, suppliers, orders, and inventory transactions efficiently. It has two user roles: **Admin** and **Staff**, each with specific permissions.

## Features

- **Admin**: Full control, including adding, editing, and deleting records.
- **Staff**: Can add and edit records but cannot delete them.
- Secure login system for Admin and Staff.
- User-friendly interface for managing inventory operations.

## Prerequisites

Ensure the following are installed on your system:

- **Node.js** (https://nodejs.org/)
- **Microsoft SQL Server** (SQL Server Management Studio - SSMS)
- **npm** (comes with Node.js)
- **Vite** (for frontend)

## Admin Credentials
- **Username**: `admin1`
- **Password**: `admin123`

## Staff Credentials
- **Username**: `staff1`
- **Password**: `staff123`

---

## Setup Instructions

### 1. Clone the Project
Download or clone the repository into your system.

### 2. Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd inventory-management (backend)

2. Install backend dependencies: (very crucial step, file not included)
    npm install

3. Configure database connection in the db.js file. Update the SQL Server details like:
    const config = {
    user: 'your_database_username',
    password: 'your_database_password',
    server: 'localhost',
    database: 'InventoryManagementSystem',
};

4. Start the backend server:
    node index.js

5. The backend server will run on:
    http://localhost:5000
    
### 3. Frontend Setup

1. Navigate to the frontend folder:
    cd inventory-management (frontend)

2. Install frontend dependencies: (very crucial step, file not included)
    npm install

3. Start the frontend server:
    npm run dev

4. The frontend server will run on:
    http://localhost:5173
    
### 4. Starting the servers.

   i.  Start the backend server using node index.js in the inventory-management-backend folder.

   ii. Start the frontend server using npm run dev in the inventory-management-frontend folder.

   iii. Open your browser and go to: http://localhost:5173

   iv. Use the provided Admin or Staff credentials to log in.

## Security Features

- Input Validation: Frontend and backend validation to prevent SQL injection.
- Parameterized Queries: Used in all database operations to protect against SQL injection.
- CORS: Enabled to restrict backend access to allowed clients only.
- Access Control: Role-based permissions (Admin vs. Staff).
Secure Communication: Backend supports HTTPS in production.

## Database Schema

The database includes the following tables:

Users: For Admin and Staff accounts.
Products: For product management.
Customers: For customer information.
Suppliers: For supplier details.
Orders: For order management.
InventoryTransactions: For inventory operations.

## Additional Notes

Make sure to update the database connection in the db.js file.
Use SQL Server Management Studio (SSMS) to manage the database.
   
## Credits

Developed by Virosshen A/L Sivasankar as a sole contributor of the Database & Cloud Security assignment.

You can copy this content into your `README.md` file. Place the file in the root directory or alongside your `inventory-management-backend` and `inventory-management-frontend` folders.
