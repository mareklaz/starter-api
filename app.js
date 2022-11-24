require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('./config/db.config');
const routes = require('./routes/routes.config');

const app = express();
app.use(cors());

app.use(logger('dev'));

app.use(express.json()); // Nos permite usar el req.body
app.use('/api', routes);

/* Handle Errors */

app.use((req, res, next) => {
  next(createError(404, 'Route not found'));
});

app.use((error, req, res, next) => {
  console.log(error);
  if (error instanceof mongoose.Error.ValidationError) {
    error = createError(400, error);
  } else if (error instanceof mongoose.Error.CastError) {
    error = createError(404, 'Resource not found');
  } else if (error.message.includes('E11000')) {
    error = createError(400, 'Already exists');
  } else if (error instanceof jwt.JsonWebTokenError) {
    error = createError(401, error);
  } else if (!error.status) {
    error = createError(500, error);
  }

  if (error.status >= 500) {
    console.error(error);
  }

  const data = {};
  data.message = error.message;
  data.errors = error.errors
    ? Object.keys(error.errors).reduce(
        (errors, key) => ({
          ...errors,
          [key]: error.errors[key].message || error.errors[key],
        }),
        {}
      )
    : undefined;

  res.status(error.status).json(data);
});

/* App listen port */

app.listen(process.env.PORT || 3001, () => {
  console.log('App in process at', process.env.PORT || 3001);
});
