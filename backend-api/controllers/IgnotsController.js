const Ignots = require("../database/IgnotsDBModel");
const Gold = require("../database/GoldPriceDbModel");
const Companies = require("../database/CompaniesDBModel");
const moment = require("moment");

let price = [];
const companiesArr = [];

const getPrices = async () => {
  try {
    let data = await Gold.find({ date: moment().format("D-MM-YYYY") }).lean();
    if (!data) {
      console.log("Can't find data.");
    } else {
      console.log(data[0].currency["EGP"]);

      price.push(data[0].currency["EGP"].gram_in_curr);
      price.push(data[0].currency["EGP"].k24_sel);
    }
  } catch (err) {
    console.log(err);
  }
};

const getCompany = async () => {
  try {
    let data = await Companies.find();
    data.forEach((company) => {
      companiesArr.push(company);
    });
  } catch (err) {
    console.log(err);
  }
};

const updateIgnotsData = async (req, res) => {
  try {
    await getPrices();
    await getCompany();

    for (const company of companiesArr) {
      for (let i in company.ignot_size) {
        req.body.company_name = company.name;
        req.body.size = company.ignot_size[i];
        req.body.factory = company.ignot_factory[i];
        req.body.cashback = company.ignot_cashback[i];
        req.body.gmpurprice = price[0];
        req.body.gmselprice = price[1];
        req.body.pur =
          (price[0] + company.ignot_factory[i]) * company.ignot_size[i];
        req.body.sel =
          (price[1] + company.ignot_cashback[i]) * company.ignot_size[i];

        let updatedPrice = await Ignots.findOneAndUpdate(
          { company_name: company.name, size: company.ignot_size[i] },
          { $set: req.body },
          { new: true }
        );

        if (!updatedPrice) {
          console.log("No document was updated. The document might not exist.");
          const updatedData = new Ignots(req.body);
          updatedData.save();
          console.log("Document Added & Updated");
        }
      }
    }
    price.splice(0, price.length);
    res.send("Ignots Data Updated.");
  } catch (err) {
    for (let e in err.errors) {
      console.log(err.errors[e].message);
      res.status(400).send("Bad Request.. Some Fields are missed.");
    }
  }
};

const getCompanyIgnots = async (req, res) => {
  try {
    let ignots = await Ignots.find({ company_name: req.params.comp });

    res.send(ignots);
  } catch (err) {
    for (let e in err.errors) {
      console.log(err.errors[e].message);
      res.status(400).send("Can't get ignots data.");
    }
  }
};

const getIgnotsSizeOfComp = async (req, res) => {
  try {
    let ignots = await Ignots.find({
      company_name: req.params.comp,
      size: req.params.size,
    });

    res.send(ignots);
  } catch (err) {
    for (let e in err.errors) {
      console.log(err.errors[e].message);
      res.status(400).send("Can't get ignots data.");
    }
  }
};

module.exports = { getCompanyIgnots, getIgnotsSizeOfComp, updateIgnotsData };
