
const mysql = require('mysql2');
const fs = require('fs'); // File system module for TLS certificates

// Connection string (replace <PASSWORD> with the actual password)
const connectionString = 'mysql://gh3bE4KMQtcc5Ar.root:uMR9iGppsD9IdDNm@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/test';

// Add the secure connection options for TLS
const connection = mysql.createConnection({
  uri: connectionString,
  ssl: {
    ca: fs.readFileSync('isrgrootx1.pem'),
  }
});

// Test the connection
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database as id ' + connection.threadId);
});

module.exports = connection;


