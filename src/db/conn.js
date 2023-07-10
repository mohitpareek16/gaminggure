const mongoose = require("mongoose");
const app = require("../app");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const crypto = require("crypto");

mongoose.set("strictQuery", false);

mongoose
  .connect("mongodb+srv://devraj:96805577733@cluster0.b5bzbm5.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`connection successful`);
  })
  .catch((e) => {
    console.log(`no connection`);
  });
