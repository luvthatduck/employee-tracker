const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '3blindMice',
  database: 'employees'
},
  console.log('Connected to the employee Database')

);



module.exports = db;