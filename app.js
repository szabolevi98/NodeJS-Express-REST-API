//Dependencies
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

//App config
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.set('json spaces', 2);

//Simple home route
app.get('/', (req, res) => {
    res.send('It works!');
});

//Route message (external)
const message = require(path.join(__dirname, 'routes', 'message.route'));
app.use('/messages', message);

//Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION, 
    { useNewUrlParser: true, useUnifiedTopology: true }, 
    (err) => {
      if (err) {
          console.log('Unable to connect to the database:', err.message);
      }
      else {
          console.log('Connected to the database successfully!');
      }
    }
);

//Server start
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Server is starting at port: ' + port);
});
