// Importing basic server functionality
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Env Variables in .env file
require('dotenv').config();

// Express Server
const app = express();
const port = process.env.PORT || 5000;

// Middleware - parsing JSON for send and receive
app.use(cors());
app.use(express.json());

// Gets MongoDB Atlas URI for connection
const uri = process.env.ATLAS_URI;
// MongoDB parser
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
    );

// Connects to DB
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully")
})

// Require and use the route files
const exercisesRouter = require('./routes/exercises')
const usersRouter = require('./routes/users')

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);


// Listens to port for server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})