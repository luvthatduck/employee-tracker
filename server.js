
const db = require('./db/connection');
const express = require('express');
const morgan = require('morgan');
const start = require('./app')
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(morgan('tiny'));


db.connect(err => {
  if (err) throw err;
  // console.log('Database connected.');


  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});