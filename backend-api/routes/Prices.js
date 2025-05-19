const express = require("express");
const router = express.Router();

const {
  updateGoldPrices,
  setCurrenciesData,
} = require("../middlewares/PricesMiddleware");

const {
  getAllPrices,
  updateDbRecord,
} = require("../controllers/PricesController");

// Middleware message
router.all("/:curr", (req, res, nxt) => {
  console.log("request recieved in Prices Contoller.");
  nxt();
});

// get gold prices by specific currency
router.get(
  "/:curr",
  updateGoldPrices,
  setCurrenciesData,
  updateDbRecord,
  getAllPrices
);

module.exports = router;
