const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors()); // Enable CORS for frontend requests
app.use(express.json()); // Parse JSON request body
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Database Connection
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "@123K456d",
    database: "cruddatabase",
});

// API Route
app.post("/api/insert", (req, res) => {
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;

    const sqlInsert = "INSERT INTO moviereviews (moviename, moviereview) VALUES (?, ?)";
    
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            res.status(500).json({ error: "Database error" });
        } else {
            console.log("Insert successful:", result);
            res.status(200).json({ message: "Insert successful" });
        }
    });
});

// Start Server
app.listen(3001, () => {
    console.log("Server running on port 3001");
});
