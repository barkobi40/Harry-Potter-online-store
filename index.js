const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const { loginCheck } = require("./auth/passport");
const path = require("path");
const aboutUsRouter = require("./controllers/aboutUsController.js").router;
const bodyParser = require("body-parser");
const Location = require("./models/location.js");
const app = express();

dotenv.config();
loginCheck(passport);

// Mongo DB connection
const database = process.env.MONGOLAB_URI;
mongoose
  .connect(database, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Server is up!"))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");

//BodyParsing
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

app.use(
  session({
    secret: "hogsmede",
    saveUninitialized: true,
    resave: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Routes
app.set("view engine", "ejs");
app.get("/where-to-find-us", async (req, res) => {
  try {
      const locations = await Location.find({});
      res.render("whereToFindUs", { locations });
  } catch(err) {
      console.error(err);
      res.status(500).send("Server Error");
  }
});

app.use("/about-us", aboutUsRouter);
app.use("/", require("./routes/routes"));

app.use(express.static(path.join(__dirname, "public")));

//socket.io
const PORT = process.env.PORT || 8080;
const server = app.listen(
  PORT,
  console.log("Server has started at port " + PORT)
);
const io = require("socket.io")(server, { allowEIO3: true });
io.on("connection", (socket) => {
  socket.on("new order", (order) => {
    io.emit("new order", order);
  });
});
