// config/db.js
const sql = require('mssql');

// Configure the database connection pool
const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: false, // Set to true if you're using Azure
        trustServerCertificate: false // Change to false if not using self-signed certificates
    }
};

// Create a function to execute queries
const connectToDB = async () => {
    console.log(process.env.DB_PASSWORD);
    try {
        const pool = await sql.connect(sqlConfig);
        return pool;
    } catch (err) {
        console.error('Database connection failed', err);
        throw err;
    }
};

module.exports = { connectToDB, sql };
