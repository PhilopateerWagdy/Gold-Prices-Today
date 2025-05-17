const express = require("express");
const router = express.Router();

const {
  updateGoldPrices,
  setCurrenciesData,
} = require("../middlewares/PricesMiddleware");

const { getAllPrices, addPrices } = require("../controllers/PricesController");

// Middleware message
router.all("/:curr", (req, res, nxt) => {
  console.log("request recieved in Prices Contoller.");
  nxt();
});

// get gold prices by specific currency
router.get(
  "/:curr",
  getAllPrices,
  updateGoldPrices,
  setCurrenciesData,
  addPrices
);

// router.put(
//   "/",
//   priceController.updateGoldPrices,
//   priceController.setCurrenciesData,
//   priceController.updateDbRecord
// );

module.exports = router;
