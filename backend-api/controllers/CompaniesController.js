const Company = require("../database/CompaniesDBModel");

const addCompany = (req, res) => {
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
};

const getAllCompanies = async (req, res) => {
  try {
    let companies = await Company.find().sort({ _id: 1 });

    res.send(companies);
  } catch (err) {
    for (let e in err.errors) {
      console.log(err.errors[e].message);
      res.status(400).send("Can't get companies data.");
    }
  }
};

module.exports = { getAllCompanies, addCompany };
