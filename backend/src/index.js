// express lib is used to create routes
const express  = require('express');
const routes   = require('./routes.js');
const cors     = require('cors');
require('dotenv').config();
// mongoose lib is used to create connection with database
const mongoose = require('mongoose');

const { PORT, DB_NAME, DB_PASSWORD, DB_DATABASE, MONGODB_URI } = process.env;

const app = express();

const mongoUri = MONGODB_URI
    || `mongodb+srv://${DB_NAME}:${DB_PASSWORD}@cluster0-8bgdi.mongodb.net/${DB_DATABASE}?retryWrites=true&w=majority`;

mongoose.connect(mongoUri);

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {console.log(`http://localhost:${PORT}`)});
