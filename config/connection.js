const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});
    console.log("🚀 ~ process.env.PASSWORD:", process.env.PASSWORD)

// Check MySQL connection
connection.getConnection((err, conn) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
    } else {
        console.log('Connected to MySQL database');
        conn.release(); // Release the connection to the pool
    }
});

module.exports = connection;
