const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const priceRouter = require("./routes/Prices");
const ignotsRouter = require("./routes/Ignots");
const coinsRouter = require("./routes/Coins");
const companiesRouter = require("./routes/Companies");
const messagesRouter = require("./routes/Messages");
const apisRouter = require("./routes/APIs");

// set port number to listen requests from users on it
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;
const CLIENT_URL = process.env.CLIENT_URL;

// (built-in) middlewares
app.use(express.json());
//Enable CORS for all routes
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);

// ------------------------------------------------------
// Databse Connection

// 1- connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to Database...");
  })
  .catch((err) => {
    console.log("Failed to connect to Database.");
    res.status(500).json({ error: "Database connection failed" });
  });

// ------------------------------------------------------
// CRUD operations on local object (on another module -> MVC pattern)

app.options("*", cors());

app.get("/", (req, res) => {
  try {
    res.status(200).json("Hello from my gold Server");
  } catch (err) {
    console.log(err);
  }
});

app.use("/api/gold-prices", priceRouter);
app.use("/api/ignots", ignotsRouter);
app.use("/api/coins", coinsRouter);
app.use("/api/companies", companiesRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/", apisRouter);

// ------------------------------------------------------
// listen to users requests

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}....`);
});
