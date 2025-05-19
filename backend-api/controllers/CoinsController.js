const Coins = require("../database/CoinsDBModel");
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
      price.push(data[0].currency["EGP"].k21_pur);
      price.push(data[0].currency["EGP"].k21_sel);
    }
  } catch (err) {
    console.log(err);
  }
};

const updateCoinsData = async (req, res, nxt) => {
  try {
    price.splice(0, price.length);
    await getPrices();

    const docs = await Coins.find({}); // get all documents
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

const getCompanyCoins = async (req, res) => {
  try {
    let coins = await Coins.find({ company_name: req.params.comp });

    res.send(coins);
  } catch (err) {
    for (let e in err.errors) {
      console.log(err.errors[e].message);
      res.status(400).send("Can't get coins data.");
    }
  }
};

const getCoinsSizeOfComp = async (req, res) => {
  try {
    let coins = await Coins.find({
      company_name: req.params.comp,
      coin: req.params.coin,
    });

    res.send(coins);
  } catch (err) {
    for (let e in err.errors) {
      console.log(err.errors[e].message);
      res.status(400).send("Can't get coins data.");
    }
  }
};

module.exports = { getCompanyCoins, getCoinsSizeOfComp, updateCoinsData };
