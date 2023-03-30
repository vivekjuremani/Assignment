// Require necessary modules
const express = require('express');
const mongodb = require('mongodb');
const bodyParser = require('body-parser');

// Create Express app
const app = express();

// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Set up MongoDB connection
const mongoURI = 'mongodb://localhost:27017/myDatabase';
mongodb.connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define routescmd
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/submit', (req, res) => {
  const data = req.body;
  mongodb.connect(mongoURI, { useNewUrlParser: true }, (err, client) => {
    if (err) throw err;

    // Access the database
    const db = client.db('myDatabase');

    // Insert data into the collection
    db.collection('myCollection').insertOne(data, (err, result) => {
      if (err) throw err;

      console.log('Data inserted');
      res.redirect('/');
      client.close();
    });
  });
});

// Set up server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
