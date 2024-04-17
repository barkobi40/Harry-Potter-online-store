var locationTable = require("../models/location");

const addLocation = (req, res) => {
  const { latitude, longitude } = req.body;
  const location_elem = new locationTable({ latitude, longitude });
  location_elem.save().then(() => {
    locationTable.find().then((docs) => {
      res.json(docs);
    });
  });
};

const getLocations = (req, res) => {
  locationTable.find().then((docs) => {
    res.json(docs);
  });
};

module.exports = {
  addLocation,
  getLocations,
};
