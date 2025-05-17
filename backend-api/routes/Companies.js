const express = require("express");
const router = express.Router();

const {
  getAllCompanies,
  addCompany,
} = require("../controllers/CompaniesController");

// Middleware message
router.all("/", (req, res, nxt) => {
  console.log("request recieved in Companies Contoller.");
  nxt();
});

// get all companies
router.get("/", getAllCompanies);

// add company
router.post("/", addCompany);

module.exports = router;
