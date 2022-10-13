require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const createError = require("http-errors");

require("./config/db.config");

const app = express();

// CORS middleware
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  res.set("Access-Control-Allow-Headers", "content-type");
  res.set("Access-Control-Allow-Methods", "*");
  res.set("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(logger("dev"));
app.use(express.json()); // Nos permite usar el req.body

const routes = require("./routes/router.config");
app.use("/api", routes);

/* Handle Errors */

app.use((req, res, next) => {
  next(createError(404, "Route not found"));
});

app.use((error, req, res, next) => {
  console.log(error);
  if (error instanceof mongoose.Error.ValidationError) {
    error = createError(400, error);
  } else if (error instanceof mongoose.Error.CastError) {
    error = createError(404, "Resource not found");
  } else if (error.message.includes("E11000")) {
    error = createError(400, "Already exists");
  // } else if (error instanceof jwt.JsonWebTokenError) {
  //   error = createError(401, error);
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
  console.log("App in process at", process.env.PORT || 3001);
});
