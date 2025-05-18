// api/companies.js

const { getAllCompanies } = require("../controllers/CompaniesController");

module.exports = async (req, res) => {
  console.log("Request received in Companies Controller.");

  if (req.method === "GET") {
    try {
      const companies = await getAllCompanies(req, res);
      return res.status(200).json(companies);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Failed to fetch companies", details: error.message });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
};
