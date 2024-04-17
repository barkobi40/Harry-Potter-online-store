var fanTable = require("../models/user");

const getAllFans = (req, res) => {
  fanTable.find({ role: "fan" }).then((result) => {
    res.json(result);
  });
};

module.exports = {
  getAllFans,
};
