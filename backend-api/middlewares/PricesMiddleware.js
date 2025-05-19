const moment = require("moment-timezone");

// ------------------------------------------------------------------------
const convertCurrency = async (toCurrency, amount) => {
  // let api = await API.find({ api_name: "currency" });
  // const apiKey = api[0].api_key;
  // const baseUrl = api[0].base_url;
  const apiKey =
    "t09MARxzaLV1fAc3JJ8K86aVU8nuj5Sl5mbvLkUxO83mvdWb0MROq7cK5lQFHGoZ";
  const baseUrl = "https://api.unirateapi.com/api";
  const fromCurrency = "USD";

  const url = `${baseUrl}/convert?api_key=${apiKey}&from=${fromCurrency}&to=${toCurrency}&amount=${amount}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const getAPIGoldPrices = async (currency) => {
  const baseUrl = "https://goldpricez.com/api/rates/currency";
  const apiKeys = [
    "0b06ee5beca7937d30aa9dd6aebd797d0b06ee5b",
    "6bea395b519ee78b09cb5c5157e085276bea395b",
    "1f549f7b2aa83e49536e4dc0934800c11f549f7b",
    "c99ba7582f191cbb4f03e7c26c78f5e8c99ba758",
    "108812f1a1c93b156b0509b91a6c4f71108812f1",
  ];

  for (const apiKey of apiKeys) {
    const url = `${baseUrl}/${currency}/measure/gram?X-API-KEY=${apiKey}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        console.warn(`API key failed (${apiKey}): Status ${response.status}`);
        continue; // Try the next key
      }

      return await response.json(); // Success
    } catch (error) {
      console.error(`Error with API key (${apiKey}):`, error.message);
    }
  }

  // If all keys fail
  throw new Error("All API keys failed to fetch gold prices.");
};

// ------------------------------------------------------------------------

const setCurrenciesData = async (req, res, nxt) => {
  try {
    req.result = {};
    req.result.currency = {};
    req.result.date = moment().tz("Africa/Cairo").format("D-MM-YYYY");
    req.result.timeUpdated = moment().tz("Africa/Cairo").format("HH:mm");

    const { result } = await convertCurrency(req.params.curr, req.gram_in_usd);

    let gram_in_curr = Number(result);

    req.result.currency[req.params.curr] = {
      curr: req.params.curr,
      ounce_price_usd: req.ounce_in_usd,
      gram_in_usd: req.gram_in_usd,
      usd_to_curr: Number(gram_in_curr / req.gram_in_usd),
      ounce_in_curr: gram_in_curr * 31.1,
      gram_in_curr: gram_in_curr,
      k24_sel: gram_in_curr - (req.params.curr == "EGP" ? 23 : 0),
      k21_pur: gram_in_curr * (21 / 24),
      k21_sel: gram_in_curr * (21 / 24) - (req.params.curr == "EGP" ? 20 : 0),
      k18_pur: gram_in_curr * (18 / 24),
      k18_sel: gram_in_curr * (18 / 24) - (req.params.curr == "EGP" ? 17 : 0),
      k14_pur: gram_in_curr * (14 / 24),
      k14_sel: gram_in_curr * (14 / 24) - (req.params.curr == "EGP" ? 13 : 0),
      coin: gram_in_curr * (21 / 24) * 8,
    };

    nxt();
  } catch (err) {
    for (let e in err.errors) {
      console.log(err.errors[e].message);
      res.status(400).send("Bad Request.. Some Fields are missed.");
    }
  }
};

// middleware get gold prices data and send it to the next Handler
const updateGoldPrices = async (req, res, nxt) => {
  try {
    const currCode = "EGP";
    const result = await getAPIGoldPrices(currCode);

    let { ounce_price_usd, gram_in_usd } = JSON.parse(result);

    req.gram_in_usd = gram_in_usd;
    req.ounce_in_usd = ounce_price_usd;

    nxt();
  } catch (err) {
    for (let e in err.errors) {
      console.log(err.errors[e].message);
      res.status(400).send("Bad Request.. Some Fields are missed.");
    }
  }
};

module.exports = { updateGoldPrices, setCurrenciesData };
