const sql = require('mssql');
const dotenv = require('dotenv');

dotenv.config();

const dbConfig = {
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options: {
        encrypt: false, // Disable encryption for local SQL Server
        trustServerCertificate: true, // Trust self-signed certificates
    },
};

async function connectToDatabase() {
    try {
        const pool = await sql.connect(dbConfig);
        console.log('Connected to SQL Server successfully!');
        return pool;
    } catch (error) {
        console.error('Database connection failed:', error.message);
        throw error;
    }
}

module.exports = connectToDatabase;
