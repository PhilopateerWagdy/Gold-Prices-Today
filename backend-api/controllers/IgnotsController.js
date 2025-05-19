const Ignots = require("../database/IgnotsDBModel");
const Gold = require("../database/GoldPriceDbModel");
const moment = require("moment");

let price = [];
const companiesArr = [];

const getPrices = async () => {
  try {
    let data = await Gold.find({ date: moment().format("D-MM-YYYY") }).lean();
    if (!data) {
      console.log("Can't find data.");
    } else {
      price.push(data[0].currency["EGP"].gram_in_curr);
      price.push(data[0].currency["EGP"].k24_sel);
    }
  } catch (err) {
    console.log(err);
  }
};

const updateIgnotsData = async (req, res, nxt) => {
  try {
    price.splice(0, price.length);
    await getPrices();

    const docs = await Ignots.find({}); // get all documents
    for (const doc of docs) {
      doc.gmpurprice = price[0];
      doc.gmselprice = price[1];
      doc.pur = (price[0] + doc.factory) * doc.size;
      doc.sel = (price[1] + doc.cashback) * doc.size;
      await doc.save();
    }

    price.splice(0, price.length);
    console.log("Ignots Data Updated.");
    nxt();
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
