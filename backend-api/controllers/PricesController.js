const Gold = require("../database/GoldPriceDbModel");
const moment = require("moment");

const {
  updateGoldPrices,
  setCurrenciesData,
} = require("../middlewares/PricesMiddleware");

const todaysDate = moment().format("D-MM-YYYY");

// ---------------------------------------------------------------------------

// separate function that saves data used in adding Prices
async function saveGoldPrice(data) {
  const newPrice = new Gold(data);
  return await newPrice.save();
}

// add prices
const addPrices = async (req, res) => {
  try {
    const updatedPrice = await saveGoldPrice(req.body);
    console.log("Gold Prices Data Added to DB.");

    res.send(updatedPrice.currency.get(req.params.curr));
  } catch (err) {
    for (let e in err.errors) {
      console.log(err.errors[e].message);
      res.status(400).send("Bad Request.. Some Fields are missed.");
    }
  }
};

// get latest gold prices for today
const getAllPrices = async (req, res, nxt) => {
  try {
    let price = await Gold.find({ date: moment().format("D-MM-YYYY") }).lean();

    // One data record per day in DB
    // today's data not found --> new day begin --> add data
    if (price.length == 0) {
      req.body.id = await Gold.countDocuments();
      nxt();
    }
    // today's data found in DB --> data updated automatically every min for todays data record in DB
    else {
      console.log(price[0].currency[req.params.curr]);

      res.send(price[0].currency[req.params.curr]);
    }
  } catch (err) {
    for (let e in err.errors) {
      console.log(err.errors[e].message);
      res.status(400).send("Can't get gold price data.");
    }
  }
};

// update database today's record with the latest gold prices
const updateDbRecord = async (req, res) => {
  try {
    let updatedPrice = await Gold.findOneAndUpdate(
      { date: moment().format("D-MM-YYYY") },
      { $set: req.body },
      { new: true }
    );

    if (!updatedPrice) {
      console.log("No Prices was updated. Prices might not exist.");
      req.body.id = await Gold.countDocuments();
      const updatedPrice = await saveGoldPrice(req.body);
      console.log("Prices Added & Updated");
    } else {
      console.log("Prices Has Been Updated !");
    }
  } catch (err) {
    for (let e in err.errors) {
      console.log(err.errors[e].message);
      res.status(400).send("Bad Request.. Some Fields are missed.");
    }
  }
};

module.exports = {
  getAllPrices,
  updateGoldPrices,
  addPrices,
  updateDbRecord,
  setCurrenciesData,
};
