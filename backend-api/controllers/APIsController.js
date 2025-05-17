const API = require("../database/APIsDataDBModel");

const getAPI = async (req, res) => {
  try {
    let api = await API.find({ api_name: req.params.name });

    res.send(api);
  } catch (err) {
    for (let e in err.errors) {
      console.log(err.errors[e].message);
      res.status(400).send("Can't get API data.");
    }
  }
};

const addAPI = (req, res) => {
  try {
    const api = new API(req.body);
    api.save();

    res.send("API Sent!");
  } catch (err) {
    for (let e in err.errors) {
      console.log(err.errors[e].message);
      res.status(400).send("Can't Send API.");
    }
  }
};

module.exports = { getAPI, addAPI };
