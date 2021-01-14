const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const cameraRoutes = require("./routes/camera");
const viewsRoutes = require("./routes/views");

const app = express();

mongoose
  .connect(
    "mongodb+srv://will:nAcmfCoHGDgzrCHG@cluster0-pme76.mongodb.net/test?retryWrites=true",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
  });

// Definition of the views folder + the view engine pug
app.set("views", path.join(__dirname, "../frontend/views"));
app.set("view engine", "pug");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Accessing to every files within the public folder
app.use(express.static(path.join(__dirname, "../frontend/public/")));

app.use(bodyParser.json());

app.use("/api/cameras", cameraRoutes);

app.use(viewsRoutes);

module.exports = app;
