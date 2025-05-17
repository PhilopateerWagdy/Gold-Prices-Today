const Coins = require("../database/CoinsDBModel");
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
      price.push(data[0].currency["EGP"].k21_pur);
      price.push(data[0].currency["EGP"].k21_sel);
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

const updateCoinsData = async (req, res) => {
  try {
    await getPrices();
    await getCompany();

    for (const company of companiesArr) {
      for (let i in company.coin_size) {
        req.body.company_name = company.name;
        req.body.coin = company.coin[i];
        req.body.size = company.coin_size[i];
        req.body.factory = company.coin_factory[i];
        req.body.cashback = company.coin_cashback[i];
        req.body.gmpurprice = price[0];
        req.body.gmselprice = price[1];
        req.body.pur =
          (price[0] + company.coin_factory[i]) * company.coin_size[i];
        req.body.sel =
          (price[1] + company.coin_cashback[i]) * company.coin_size[i];

        let updatedPrice = await Coins.findOneAndUpdate(
          { company_name: company.name, size: company.coin_size[i] },
          { $set: req.body },
          { new: true }
        );

        if (!updatedPrice) {
          console.log("No document was updated. The document might not exist.");
          const updatedData = new Coins(req.body);
          updatedData.save();
          console.log("Document Added & Updated");
        }
      }
    }
    price.splice(0, price.length);
    res.send("Coins Data Updated.");
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
