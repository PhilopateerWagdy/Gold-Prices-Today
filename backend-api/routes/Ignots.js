const express = require("express");
const router = express.Router();

const {
  getCompanyIgnots,
  getIgnotsSizeOfComp,
  updateIgnotsData,
} = require("../controllers/IgnotsController");

// Middleware message
router.all("/", (req, res, nxt) => {
  console.log("request recieved in Ignots Contoller.");
  nxt();
});

// get all ignots of company
router.get("/:comp", getCompanyIgnots);

// get speific ignot size data
router.get("/:comp/:size", getIgnotsSizeOfComp);

// get all gold prices
// router.put("/", updateIgnotsData);

module.exports = router;
