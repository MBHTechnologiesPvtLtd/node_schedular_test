// controllers/userController.js
const { connectToDB, sql } = require('../config/db');

// Fetch users from the database
exports.getUsers = async (req, res) => {
    try {
        const pool = await connectToDB();
        
        // Query to fetch all users from the Users table
        const result = await pool.request().query('SELECT top 10 * FROM User_Master');
     
        console.log(result.recordset[0].Name);
        
        res.json({ rescode: 0, resmsg: "Users List", users: result.recordset });
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ rescode: 1, resmsg: "Error fetching users" });
    }
};

