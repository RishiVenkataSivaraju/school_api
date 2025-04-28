const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('./db.js'); // Import the connection from db.js

// Initialize express app
const app = express();
const port = 3000;

// Middleware setup
app.use(bodyParser.json());
app.use(cors());

// Add School API
app.post('/addSchool', (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  // Validate the input
  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Insert school into the database
  const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
  connection.query(query, [name, address, latitude, longitude], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Database error: ' + err.message });
    }
    res.status(200).json({ message: 'School added successfully', id: result.insertId });
  });
});

// List Schools API (sorted by proximity to the user's location)
app.get('/listSchools', (req, res) => {
  const { latitude, longitude } = req.query;

  // Validate the input
  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitude and Longitude are required' });
  }

  // Query to calculate distance between user and schools
  const query = 'SELECT id, name, address, latitude, longitude, ' +
                '((latitude - ?) * (latitude - ?)) + ((longitude - ?) * (longitude - ?)) AS distance ' +
                'FROM schools ORDER BY distance LIMIT 10';
  
  connection.query(query, [latitude, latitude, longitude, longitude], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error: ' + err.message });
    }
    res.status(200).json({ schools: results });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
