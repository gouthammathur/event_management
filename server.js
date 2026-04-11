const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "gouthammathur2809",   // change this
  database: "rgukt_events"
});

db.connect(err => {
  if (err) {
    console.error("DB Connection Failed:", err);
  } else {
    console.log("MySQL Connected");
  }
});

// Register API
app.post("/register", (req, res) => {
  const { name, roll, email, phone, dept, year, event } = req.body;

  const regId = "REG-RGUKT-" + Math.floor(100000 + Math.random() * 900000);

  const sql = `
    INSERT INTO registrations (name, roll, email, phone, dept, year, event, regId)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [name, roll, email, phone, dept, year, event, regId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json({ message: "Registered successfully", regId });
  });
});

// Get all registrations
app.get("/registrations", (req, res) => {
  db.query("SELECT * FROM registrations", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json([]);
    }

    res.json(results);
  });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});