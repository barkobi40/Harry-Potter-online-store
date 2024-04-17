var productTable = require("../models/product");

const homeView = (req, res) => {
  if (req.user && req.user.role == "provider") {
    productTable.find().then((docs, err) => {
      if (!err) {
        res.render("homeProvider", {
          user: req.user,
          productData: docs,
          google_maps_api_key: process.env.GOOGLE_MAPS_KEY,
        });
      } else {
        console.log("Failed to retrieve the List of products: " + err);
      }
    });
  } else if (req.user && req.user.role == "fan") {
    productTable.find().then((docs, err) => {
      if (!err) {
        res.render("homeFan", {
          user: req.user,
          productData: docs,
          google_maps_api_key: process.env.GOOGLE_MAPS_KEY,
        });
      } else {
        console.log("Failed to retrieve the List of products: " + err);
      }
    });

  } else {
  res.render("login");
  }
};

module.exports = {
  homeView,
};
