
const express = require('express');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "@123K456d",
    database: "cruddatabase",
});

// Test database connection
db.getConnection((err, connection) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL database!");
        connection.release(); // Release the connection
    }
});

app.get("/", (req, res) => {
    const sqlInsert = "INSERT INTO moviereviews (moviename, moviereview) VALUES ('Avengers', 'One of the best Movies');";
    
    db.query(sqlInsert, (err, result) => {
        if (err) {
            console.error("Error executing query:", err.sqlMessage); // Show specific error message
            return res.status(500).send("Error inserting data: " + err.sqlMessage);
        }
        console.log("Data inserted successfully:", result);
        res.send("Hello Pedroo");
    });
});


app.listen(3001, () => {
    console.log("Server running on port 3001");
});
