// /api/updateData.js
const moment = require("moment");

const priceController = require("../controllers/PricesController");
const ignotsController = require("../controllers/IgnotsController");
const coinsController = require("../controllers/CoinsController");

export default async function handler(req, res) {
  console.log(
    "⏰ Cron job triggered at:",
    moment().format("YYYY-MM-DD HH:mm:ss")
  );

  // Fake req and res (if your functions require them)
  const fakeReq = { body: {}, params: {}, query: {} };
  const fakeRes = {
    send: (data) => console.log("Response:", data),
    status: (code) => ({
      send: (msg) => console.error(`Error ${code}:`, msg),
    }),
  };

  try {
    // Run updateGoldPrices (middleware-style)
    await priceController.updateGoldPrices(fakeReq, fakeRes, async (err) => {
      if (err) {
        console.error("❌ Error in updateGoldPrices:", err);
        return res.status(500).json({ error: "updateGoldPrices failed" });
      }

      // Run setCurrenciesData (middleware-style)
      await priceController.setCurrenciesData(
        fakeReq,
        fakeRes,
        async (err2) => {
          if (err2) {
            console.error("❌ Error in setCurrenciesData:", err2);
            return res.status(500).json({ error: "setCurrenciesData failed" });
          }

          try {
            await priceController.updateDbRecord(fakeReq, fakeRes);
            await ignotsController.updateIgnotsData(fakeReq, fakeRes);
            await coinsController.updateCoinsData(fakeReq, fakeRes);

            console.log("✅ Cron job completed successfully.");
            return res.status(200).json({ message: "Cron job executed" });
          } catch (finalErr) {
            console.error("❌ Error in final handlers:", finalErr);
            return res.status(500).json({ error: "Final handler failed" });
          }
        }
      );
    });
  } catch (err) {
    console.error("❌ Unexpected error:", err);
    return res.status(500).json({ error: "Unexpected error in cron job" });
  }
}
