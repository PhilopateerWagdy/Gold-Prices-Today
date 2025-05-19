const Coins = require("../database/CoinsDBModel");
const Gold = require("../database/GoldPriceDbModel");
const moment = require("moment");

let price = [];

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

const updateCoinsData = async (req, res) => {
  try {
    price.splice(0, price.length);
    await getPrices();

    let docs = [];
    if (req.params.comp && req.params.coin) {
      docs = await Coins.find({
        company_name: req.params.comp,
        coin: req.params.coin,
      }).sort({ _id: 1 }); // get all documents
    } else {
      docs = await Coins.find({ company_name: req.params.comp }).sort({
        _id: 1,
      }); // get all documents
    }

    for (const doc of docs) {
      doc.gmpurprice = price[0];
      doc.gmselprice = price[1];
      doc.pur = (price[0] + doc.factory) * doc.size;
      doc.sel = (price[1] + doc.cashback) * doc.size;
      await doc.save();
    }

    price.splice(0, price.length);
    console.log("Coins Data Updated.");
    res.send(docs);
  } catch (err) {
    for (let e in err.errors) {
      console.log(err.errors[e].message);
      res.status(400).send("Bad Request.. Some Fields are missed.");
    }
  }
};

module.exports = { updateCoinsData };
