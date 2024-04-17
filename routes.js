const express = require("express");
const {
  registerView,
  loginView,
  registerUser,
  loginUser,
} = require("../controllers/loginController");
const router = express.Router();
const { protectRoute } = require("../auth/protect");
const { homeView } = require("../controllers/homeController");
const {
  createProduct,
  changeProductTable,
  filterProducts,
} = require("../controllers/productController");
const {
  order,
  getOrders,
  deleteOrder,
  orderSumAverage,
} = require("../controllers/orderController");
const { getAllFans } = require("../controllers/providerController");
const { getCurrency } = require("../controllers/currencyController");
const {
  addLocation,
  getLocations,
} = require("../controllers/locationController");
const { createFBPosting } = require("../controllers/fbController");

router.get("/", homeView);
router.get("/register", registerView);
router.get("/login", loginView);
router.get("/home", protectRoute, homeView);

router.get("/clearFilters", protectRoute, homeView);

router.get("/video", loginView);

router.post("/login", loginUser);
router.get("/logout", loginView);
router.post("/register", registerUser);

router.post("/getAllFans", getAllFans);

router.post("/createProduct", createProduct);
router.post("/changeProductTable", changeProductTable);


router.post("/filterProducts", filterProducts);

router.post("/order", order);
router.post("/getOrders", getOrders);
router.post("/deleteOrder", deleteOrder);
router.post("/orderSumAverage", orderSumAverage);

router.post("/getCurrency", getCurrency);

router.post("/addLocation", addLocation);
router.post("/getLocations", getLocations);



router.post("/createFBPosting", createFBPosting);

module.exports = router;
