const Gold = require("../database/GoldPriceDbModel");
const moment = require("moment-timezone");

const todaysDate = moment().format("D-MM-YYYY");

// ---------------------------------------------------------------------------

// separate function that saves data used in adding Prices
async function saveGoldPrice(data) {
  const newPrice = new Gold(data);
  return await newPrice.save();
}

// update database today's record with the latest gold prices
const updateDbRecord = async (req, res) => {
  // ✅ Add CORS headers
  // res.setHeader(
  //   "Access-Control-Allow-Origin",
  //   "https://gold-prices-today.vercel.app"
  // );
  // res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  // res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // // ✅ Handle preflight OPTIONS request
  // if (req.method === "OPTIONS") {
  //   return res.status(200).end();
  // }

  try {
    req.result.id = await Gold.countDocuments();

    let updatedPrice = await Gold.findOne({
      date: moment().format("D-MM-YYYY"),
    });

    // No prices for today found in DB
    if (!updatedPrice) {
      console.log("Today's Prices not exist.");
      const addedPrice = await saveGoldPrice(req.result);
      console.log("Prices Added.");
      res.send(addedPrice.currency.get(req.params.curr));
    }
    // today's prices found in DB
    else {
      // if needed currency not exist -> add it
      if (!updatedPrice.currency.has(req.params.curr)) {
        updatedPrice.timeUpdated = moment().tz("Africa/Cairo").format("HH:mm");
        updatedPrice.currency.set(
          req.params.curr,
          req.result.currency[req.params.curr]
        );
        await updatedPrice.save();
        console.log(`${req.params.curr} added to today's document.`);
      }
      // if needed currency exist -> update it
      else {
        updatedPrice.timeUpdated = moment().tz("Africa/Cairo").format("HH:mm");
        updatedPrice.currency.set(
          req.params.curr,
          req.result.currency[req.params.curr]
        );
        await updatedPrice.save();
        console.log(`${req.params.curr} exists & updated in today's document.`);
      }

      console.log("Prices Has Been Updated !");
      res.send(updatedPrice.currency.get(req.params.curr));
    }
  } catch (err) {
    for (let e in err.errors) {
      console.log(err.errors[e].message);
      res.status(400).send("Bad Request.. Some Fields are missed.");
    }
  }
};

module.exports = {
  updateDbRecord,
};
