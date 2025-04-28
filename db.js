
//Schema in TiDB site
// USE test;

// CREATE TABLE schools (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   name VARCHAR(255) NOT NULL,
//   address VARCHAR(255) NOT NULL,
//   latitude FLOAT NOT NULL,
//   longitude FLOAT NOT NULL
// );
// SELECT
//   *
// FROM
//   `schools`;
//schema added it TiDB
const mysql = require('mysql2');
const fs = require('fs'); // File system module for TLS certificates


// Connection string (replace <PASSWORD> with the actual password)
const connectionString = 'mysql://gh3bE4KMQtcc5Ar.root:uMR9iGppsD9IdDNm@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/test';

const connection = mysql.createConnection({
  uri: connectionString,
  ssl: {
    ca: PEM_FILE,
  }
});



connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database');
    return;
  }
  console.log('Connected to the database');
});

module.exports = connection;


