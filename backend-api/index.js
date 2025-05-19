const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
// const axios = require("axios");
// const cron = require("node-cron");
// const { CronJob } = require("cron");
// const moment = require("moment-timezone");

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
// cron a function to fired every day
// const CURRENCY = "EGP";
// // Schedule cron to run daily at 00:01
// const job = new CronJob(
//   "30 2 * * *", // At 12:01 AM
//   async () => {
//     try {
//       console.log(
//         `[${moment()
//           .tz("Africa/Cairo")
//           .format(
//             "D-MM-YYYY HH:mm"
//           )}] Triggering gold price update for ${CURRENCY}`
//       );

//       const response = await axios.get(
//         `${process.env.CLIENT_URL}/api/gold-prices/${CURRENCY}`
//       );

//       console.log("CRON successful:", response.data);
//     } catch (error) {
//       console.error("CRON Error triggering update:", error.message);
//     }
//   },
//   null,
//   true, // Start the job immediately
//   "Africa/Cairo" // <== Set the time zone here
// );

// job.start();

// ------------------------------------------------------
// listen to users requests

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}....`);
});
