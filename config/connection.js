const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createPool({
    host: "localhost",
    user: 'jayeshpatil',
    password: 'J@Y6P@qE23',
    database: 'test_crud',
});

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
