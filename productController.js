var productTable = require("../models/product");

const createProduct = (req, res) => {
  const { department, title, price, collectionName, character, enc_image } =
    req.body;

  const product_elem = new productTable({
    department: department,
    title: title,
    price: price,
    collectionName: collectionName,
    character: character,
    image: enc_image,
  });
  product_elem.save().then(() => {
    productTable.find().then((docs, err) => {
      if (!err) {
        res.render("homeprovider", {
          user: req.user,
          productData: docs,
          google_maps_api_key: process.env.GOOGLE_MAPS_KEY,
        });
      } else {
        console.log("Failed to create product: " + err);
      }
    });
  });
};

const changeProductTable = (req, res) => {
  const { id, department, title, price, collectionName, character } = req.body; //URL
  if (req.body.submit == "Edit") {
    const update = {
      department: department,
      title: title,
      price: price,
      collectionName: collectionName,
      character: character,
    };
    productTable.findByIdAndUpdate(id, update, { new: true }).then(() => {
      productTable.find().then((docs, err) => {
        if (!err) {
          res.render("homeprovider", {
            user: req.user,
            productData: docs,
            google_maps_api_key: process.env.GOOGLE_MAPS_KEY,
          });
        } else {
          console.log("Failed to update the list of products: " + err);
        }
      });
    });
  } else if (req.body.submit == "Delete") {
    productTable.findByIdAndRemove(id, { new: true }).then(() => {
      productTable.find().then((docs, err) => {
        if (!err) {
          res.render("homeprovider", {
            user: req.user,
            productData: docs,
            google_maps_api_key: process.env.GOOGLE_MAPS_KEY,
          });
        } else {
          console.log("Failed to remove product: " + err);
        }
      });
    });
  }
};


const filterProducts = async (req, res) => {
  const {
    price_from,
    price_to,
    filter_department,
    filter_collectionName,
    filter_character,
  } = req.body;

  let query = {};

  if (price_from) {
    query.price = { ...query.price, $gte: parseInt(price_from) };
  }

  if (price_to) {
    query.price = { ...query.price, $lte: parseInt(price_to) };
  }

  if (filter_department) {
    query.department = filter_department;
  }

  if (filter_collectionName) {
    query.collectionName = filter_collectionName;
  }

  try {
    const filteredProducts = await productTable.find(query);
    res.render("homeFan", {
      user: req.user,
      productData: filteredProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching filtered products.");
  }
};


module.exports = {
  createProduct,
  changeProductTable,
  filterProducts,
};
