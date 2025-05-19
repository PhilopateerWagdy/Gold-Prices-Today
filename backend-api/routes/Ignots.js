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
router.get("/:comp", updateIgnotsData, getCompanyIgnots);

// get speific ignot size data
router.get("/:comp/:size", updateIgnotsData, getIgnotsSizeOfComp);

module.exports = router;
