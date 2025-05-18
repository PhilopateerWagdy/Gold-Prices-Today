const express = require("express");
const router = express.Router();
const Company = require("../database/CompaniesDBModel");

// Middleware message
router.all("/", (req, res, nxt) => {
  console.log("request recieved in Companies Contoller.");
  nxt();
});

// get all companies
router.get("/", async (req, res) => {
  try {
    let companies = await Company.find();

    res.status(200).json(companies);
  } catch (err) {
    for (let e in err.errors) {
      console.log(err.errors[e].message);
      res.status(400).send("Can't get companies data.");
    }
  }
});

// add company
router.post("/", (req, res) => {
  try {
    const comp = new Company(req.body);
    comp.save();

    res.send("Company Sent!");
  } catch (err) {
    for (let e in err.errors) {
      console.log(err.errors[e].message);
      res.status(400).send("Can't Send Company.");
    }
  }
});

module.exports = router;
