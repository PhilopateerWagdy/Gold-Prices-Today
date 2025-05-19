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

// get latest gold prices for today
const getAllPrices = async (req, res) => {
  try {
    let price = await Gold.find({ date: moment().format("D-MM-YYYY") }).lean();

    console.log(price[0].currency[req.params.curr]);
    res.send(price[0].currency[req.params.curr]);
  } catch (err) {
    for (let e in err.errors) {
      console.log(err.errors[e].message);
      res.status(400).send("Can't get gold price data.");
    }
  }
};

// update database today's record with the latest gold prices
const updateDbRecord = async (req, res, nxt) => {
  try {
    req.body.id = await Gold.countDocuments();

    let updatedPrice = await Gold.findOneAndUpdate(
      { date: moment().format("D-MM-YYYY") },
      { $set: req.body },
      { new: true }
    );

    if (!updatedPrice) {
      console.log("No Prices was updated. Today's Prices might not exist.");
      const updatedPrice = await saveGoldPrice(req.body);
      console.log("Prices Added & Updated");
    } else {
      console.log("Prices Has Been Updated !");
    }

    nxt();
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
  updateDbRecord,
  setCurrenciesData,
};
