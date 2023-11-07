const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const PORT = 3000;

require("./database");

const routes = require("./routes");
const indWorldCup2019Route = routes.indWorldCup2019;
const indWorldCup2023Route = routes.indWorldCup2023;
const indWorldCupJerseyRoute = routes.indWorldCupJersey;
const auth = routes.auth;

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(
  session({
    secret: "INDIA-WON",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 360000,
      secure: false,
    },
  })
);

app.use((req, res, next) => {
  console.log(`COOKIE ${req.headers.cookie}`);
  next();
});

app.use((req, res, next) => {
  console.log("Processing middleware");
  // console.log(`Cookies in headers  ${req.headers.cookie}`);
  console.log("Cookies direct from req", req.cookies);
  console.log(`Request Method Type => ${req.method}`);
  console.log(`sessionID`, req.sessionID);
  console.log(`Requested Url => ${req.url}`);
  console.log("Ending middleware");
  next();
});

app.use("/api/2023", indWorldCup2023Route);
app.use("/api/2019", indWorldCup2019Route);
app.use("/api/buy/ind-jersey", indWorldCupJerseyRoute);
app.use("/api/auth", auth);

// /api/buy/ind-jersey/cart/item
app.listen(PORT, () => {
  console.log(`App is started at the port ${PORT}`);
});
