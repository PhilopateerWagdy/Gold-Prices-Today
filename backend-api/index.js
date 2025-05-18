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

// ------------------------------------------------------
// Databse Connection

// 1- connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to Database...");
  })
  .catch((err) => console.log("Failed to connect to Database."));

// ------------------------------------------------------
// CRUD operations on local object (on another module -> MVC pattern)

app.get("/", (req, res) => {
  try {
    res.status(200).json("Hello fom Server");
  } catch (err) {
    console.log(err);
  }
});

app.use("/api/gold-prices", priceRouter);
app.use("/api/ignots", ignotsRouter);
app.use("/api/coins", coinsRouter);
app.use("/companies", companiesRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/", apisRouter);

// ------------------------------------------------------
// update function that updates today's data record every min automatically
// cron.schedule("* * * * *", () => {
//   console.log("⏰ Cron triggered at: " + moment().format("HH:mm"));

//   // Fake req and res
//   const req = {
//     body: {},
//     params: {},
//     query: {},
//   };

//   const res = {
//     send: (data) => console.log(data),
//     status: (code) => ({ send: (msg) => console.error(`Error ${code}:`, msg) }),
//   };

//   // Manually chain the middlewares using next()
//   const next1 = async (err) => {
//     if (err) return console.error("Error in updateGoldPrices:", err);

//     const next2 = async (err2) => {
//       if (err2) return console.error("Error in setCurrenciesData:", err2);

//       // Now that the first two middlewares have finished, call the next handler
//       try {
//         await priceController.updateDbRecord(req, res); // Fire the updateDbRecord handler
//       } catch (err3) {
//         console.error("Error in updateDbRecord:", err3);
//       }

//       // Call updateCoinsData after updateDbRecord
//       try {
//         await ignotsController.updateIgnotsData(req, res); // Fire the new updateCoinsData handler
//       } catch (err4) {
//         console.error("Error in updateIgnotsData:", err4);
//       }

//       // Call updateCoinsData after updateDbRecord
//       try {
//         await coinsController.updateCoinsData(req, res); // Fire the new updateCoinsData handler
//       } catch (err4) {
//         console.error("Error in updateCoinsData:", err4);
//       }
//     };

//     try {
//       await priceController.setCurrenciesData(req, res, next2); // Fire setCurrenciesData middleware
//     } catch (err2) {
//       next2(err2); // If error happens, call the next2 function with the error
//     }
//   };

//   try {
//     priceController.updateGoldPrices(req, res, next1); // Fire the first middleware (updateGoldPrices)
//   } catch (err) {
//     next1(err); // If error happens, call the next1 function with the error
//   }
// });

// ------------------------------------------------------
// listen to users requests

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}....`);
});
