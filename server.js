const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ STATIC FRONTEND
app.use(express.static("public"));

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "gouthammathur2809",
  database: "rgukt_events"
});

db.connect(err => {
  if (err) console.error("DB Connection Failed:", err);
  else console.log("MySQL Connected");
});

// REGISTER API
app.post("/register", (req, res) => {
  const { name, roll, email, phone, dept, year, event, participation } = req.body;

  const regId = "REG-RGUKT-" + Math.floor(100000 + Math.random() * 900000);

  const sql = `
    INSERT INTO registrations 
    (name, roll, email, phone, dept, year, event, participation, regId)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql,
    [name, roll, email, phone, dept, year, event, participation, regId],
    (err) => {
      if (err) return res.status(500).json({ message: "Database error" });
      res.json({ message: "Registered successfully", regId });
    }
  );
});

// GET REGISTRATIONS
app.get("/registrations", (req, res) => {
  db.query("SELECT * FROM registrations ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json(results);
  });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});