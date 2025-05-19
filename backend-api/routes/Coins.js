const express = require("express");
const router = express.Router();

const {
  getCompanyCoins,
  getCoinsSizeOfComp,
  updateCoinsData,
} = require("../controllers/CoinsController");

// Middleware message
router.all("/", (req, res, nxt) => {
  console.log("request recieved in Coins Contoller.");
  nxt();
});

// get all ignots of company
router.get("/:comp", updateCoinsData, getCompanyCoins);

// get speific ignot size data
router.get("/:comp/:coin", updateCoinsData, getCoinsSizeOfComp);

module.exports = router;
