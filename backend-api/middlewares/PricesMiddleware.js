const API = require("../database/APIsDataDBModel");
const moment = require("moment");

const allCurrencies = [
  "EGP",
  "SAR",
  "SYP",
  "TND",
  "AED",
  "YER",
  "QAR",
  "ILS",
  "OMR",
  "MAD",
  "LBP",
  "KWD",
  "JOD",
  "IQD",
];

const convertCurrency = async (toCurrency, amount) => {
  let api = await API.find({ api_name: "currency" });
  const apiKey = api[0].api_key;
  const baseUrl = api[0].base_url;
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

// get gold prices data from (goldPricesz API)
const getAPIGoldPrices = async (currency) => {
  let api = await API.find({ api_name: "gold" });
  const baseUrl = api[0].base_url;
  const apiKey = api[0].api_key;

  const url = `${baseUrl}/${currency}/measure/gram?X-API-KEY=${apiKey}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data from API:", error);
    throw error;
  }
};

const setCurrenciesData = async (req, res, nxt) => {
  try {
    for (let c of allCurrencies) {
      const { result } = await convertCurrency(c, req.gram_in_usd);

      let gram_in_curr = Number(result);
      let ounce_in_usd = req.ounce_in_usd;
      let ounce_in_curr = gram_in_curr * 31.1;
      let usd_to_curr = gram_in_curr / req.gram_in_usd;
      let k24_sel = gram_in_curr - (c == "EGP" ? 23 : 0);
      let k21_pur = gram_in_curr * (21 / 24);
      let k21_sel = gram_in_curr * (21 / 24) - (c == "EGP" ? 20 : 0);
      let k18_pur = gram_in_curr * (18 / 24);
      let k18_sel = gram_in_curr * (18 / 24) - (c == "EGP" ? 17 : 0);
      let k14_pur = gram_in_curr * (14 / 24);
      let k14_sel = gram_in_curr * (14 / 24) - (c == "EGP" ? 13 : 0);
      let coin = k21_pur * 8;

      req.body.currency[c] = {
        curr: c,
        ounce_price_usd: ounce_in_usd,
        gram_in_usd: req.gram_in_usd,
        usd_to_curr: Number(usd_to_curr),
        ounce_in_curr: ounce_in_curr,
        gram_in_curr: gram_in_curr,
        k24_sel: k24_sel,
        k21_pur: k21_pur,
        k21_sel: k21_sel,
        k18_pur: k18_pur,
        k18_sel: k18_sel,
        k14_pur: k14_pur,
        k14_sel: k14_sel,
        coin: coin,
      };
    }

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

    let {
      ounce_price_usd,
      gram_in_usd,
      usd_to_egp,
      ounce_in_egp,
      gram_in_egp,
    } = JSON.parse(result);

    req.body.currency = {};
    req.gram_in_usd = gram_in_usd;
    req.ounce_in_usd = ounce_price_usd;
    req.body.date = moment().format("D-MM-YYYY");
    req.body.timeUpdated = moment().format("HH:mm");

    nxt();
  } catch (err) {
    for (let e in err.errors) {
      console.log(err.errors[e].message);
      res.status(400).send("Bad Request.. Some Fields are missed.");
    }
  }
};

module.exports = { updateGoldPrices, setCurrenciesData };
