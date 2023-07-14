const express = require("express");
const path = require("path");
const app = express();
require("./db/conn");
const hbs = require("hbs");
const crypto = require("crypto");
const session = require("express-session");
const authRouter = require("./modules/auth/auth.router");
const tornamentRouter = require("./modules/tonaments/tonaments.router");
const paymentRouter = require("./modules/payment/payment.router");
const port = process.env.PORT || 5000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

const generateSecretKey = () => {
  return crypto.randomBytes(32).toString("hex");
};
const secretKey = generateSecretKey();
console.log(secretKey);

app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {

  const isAuthenticated = req.session.userId ? true : false;
  console.log(req.session.user,"isauthenticated")

  res.render("index",{ isAuthenticated });
});

app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/booking", (req, res) => {
  
  res.render("booking");
});

app.get("/signin", (req, res) => {
  res.render("signin");
});
app.get("/tournamentpage", (req, res) => {
  if (!req.session.userId) {

    res.redirect('/login');
  } else {
    res.render('tournamentpage');
  }

});

app.get("/cart", (req, res) => {
  if (!req.session.userId) {

    res.redirect('/login');
  } else {
    res.render('cart');
  }});

app.get("/step3", (req, res) => {
  const isAuthenticated = req.session.userId ? true : false;

  res.render("step3",{isAuthenticated});
});

app.get("/payment", (req, res) => {
  if (!req.session.userId) {
    res.redirect('/login');
  } else {
    const isAuthenticated = req.session.userId ? true : false;

    res.render('payment',{ isAuthenticated });

  }
});

///////////////////////////////////////////////
//                Middelwaire               //
/////////////////////////////////////////////*/





// Set up session middleware


app.use(authRouter);
app.use(tornamentRouter);
app.use(paymentRouter);

///////        End of Middelwaire     ////////

app.listen(port, () => {
  console.log(`server is running ${port}`);
});

module.exports = app;
