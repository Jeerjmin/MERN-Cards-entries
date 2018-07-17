const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const allowCors = require('./config/cors')
const config = require('./config/db');


// Use Node's default promise instead of Mongoose's promise library
mongoose.Promise = global.Promise;

// Connect to the database
mongoose.connect(config.db);
let db = mongoose.connection;

db.on('open', () => {
    console.log('Connected to the database.');
});

db.on('error', (err) => {
    console.log(`Database error: ${err}`);
});

// Instantiate express
const app = express();

// Set public folder using built-in express.static middleware
app.use(express.static('public'));

// Set body parser middleware

app.use(bodyParser.json());

//cors
app.use(allowCors);

// Initialize routes middleware
app.use('/api/data', require('./routes/data'));


// Use express's default error handling middleware
app.use((err, req, res, next) => {
    if (res.headersSent) return next(err);
    res.status(400).json({ err: err });
});

// Start the server
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.get('/', function (req, res) {
    res.send('Hello API');
});
