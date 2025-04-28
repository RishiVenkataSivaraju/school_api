const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('./db.js'); // Import the connection from db.js


const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Add School API
app.post('/addSchool', (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || latitude === undefined || longitude === undefined) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  
  if (typeof name !== 'string' || typeof address !== 'string') {
    return res.status(400).json({ error: 'Name and Address must be strings' });
  }
  if (isNaN(Number(latitude)) || isNaN(Number(longitude))) {
    return res.status(400).json({ error: 'Latitude and Longitude must be valid numbers' });
  }

  const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
  connection.query(query, [name, address, Number(latitude), Number(longitude)], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Database error: ' + err.message });
    }
    res.status(200).json({ message: 'School added successfully', id: result.insertId });
  });
});


// List Schools API (sorted by proximity to the user's location)
app.get('/listSchools', (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitude and Longitude are required' });
  }

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

app.get('/', (req, res) => {

  res.send("HELLO WELCOME TO SCHOOL MANAGEMENT PORTAL")
})



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
