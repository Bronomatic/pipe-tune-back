const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user');
const searchRoutes = require('./routes/search');
// const createRoutes = require('./routes/create');
const tuneRoutes = require('./routes/tune');

const app = express();

// * local url for testing
const mongoUrl = 'mongodb://localhost:27017/pipeDB';

// * Connection to the mongoDB
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  console.log('connect');
}).catch((err) => {
  console.log(err);
});

// * Parse application/json
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// * CORS headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Request-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use(userRoutes);
app.use(searchRoutes);
// app.use(createRoutes);
app.use(tuneRoutes);

app.listen(8080);
