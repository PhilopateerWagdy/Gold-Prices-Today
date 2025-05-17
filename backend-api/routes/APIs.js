const express = require("express");
const router = express.Router();

const { getAPI, addAPI } = require("../controllers/APIsController");

// Middleware message
router.all("/", (req, res, nxt) => {
  console.log("request recieved in APIs Contoller.");
  nxt();
});

// get all companies
router.get("/:name", getAPI);

// add company
router.post("/", addAPI);

module.exports = router;
