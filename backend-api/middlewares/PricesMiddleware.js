const moment = require("moment-timezone");

// ------------------------------------------------------------------------
const convertCurrency = async (toCurrency, amount) => {
  // let api = await API.find({ api_name: "currency" });
  // const apiKey = api[0].api_key;
  // const baseUrl = api[0].base_url;

  const searchedCurr = toCurrency === "PSS" ? "ILS" : toCurrency;

  const apiKey =
    "t09MARxzaLV1fAc3JJ8K86aVU8nuj5Sl5mbvLkUxO83mvdWb0MROq7cK5lQFHGoZ";
  const baseUrl = "https://api.unirateapi.com/api";
  const fromCurrency = "USD";
  const primary_Url = `${baseUrl}/convert?api_key=${apiKey}&from=${fromCurrency}&to=${searchedCurr}&amount=${amount}`;

  const fallback_Url = `https://open.er-api.com/v6/latest/${fromCurrency}`;

  try {
    const response = await fetch(primary_Url);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (primaryError) {
    console.warn("Primary API failed. Trying fallback API...", primaryError);

    try {
      const fallbackResponse = await fetch(fallback_Url);

      if (!fallbackResponse.ok) {
        throw new Error(
          `Fallback API failed with status ${fallbackResponse.status}`
        );
      }

      const fallbackData = await fallbackResponse.json();

      const rate = fallbackData.rates[searchedCurr];
      if (!rate) throw new Error("Currency not found in fallback response.");

      return {
        result: amount * rate,
      };
    } catch (fallbackError) {
      console.error("Both APIs failed.", fallbackError);
      throw fallbackError;
    }
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
    "12879a129df3ab24943901124b4caaa912879a12",
    "4c34b658b98ec37b42cfebdd372ed2744c34b658",
    "e63b47f97489e7c9ec077cb61d970b3fe63b47f9",
    "76fe71cfb3e377f801fa4dc2c6d3ca3d76fe71cf",
    "a9ee0184e4955be3947a4625142bba67a9ee0184",
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
