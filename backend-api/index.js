const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cron = require("node-cron");
const moment = require("moment");
const cors = require("cors");

const priceRouter = require("./routes/Prices");
const ignotsRouter = require("./routes/Ignots");
const coinsRouter = require("./routes/Coins");
const companiesRouter = require("./routes/Companies");
const messagesRouter = require("./routes/Messages");
const apisRouter = require("./routes/APIs");

const priceController = require("./controllers/PricesController");
const ignotsController = require("./controllers/IgnotsController");
const coinsController = require("./controllers/CoinsController");

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
    credentials: true,
  })
);

// 1- connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to Database...");
  })
  .catch((err) => console.log("Failed to connect to Database."));

// Sample route
app.get("/", (req, res) => {
  res.json({ message: `Hello, World! & ${PORT}` });
});

// Sample route
app.get("/api/price", (req, res) => {
  res.json({ message: `Hello, Price! & ${PORT}` });
});

app.use("/api/gold-prices", priceRouter);
app.use("/api/ignots", ignotsRouter);
app.use("/api/coins", coinsRouter);
app.use("/api/companies", companiesRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/", apisRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
