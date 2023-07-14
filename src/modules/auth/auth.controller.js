const UserModel = require("./auth.models");
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcrypt');


const signUp = async (req, res) => {
  try {
    const { email, username, password } = req.body;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const user = new UserModel({ email, username, password: hashedPassword });
  user.save((err) => {
    if (err) {
      console.error(err);
      res.render('signup', { error: 'Error signing up. Please try again.' });
    } else {
      res.redirect('/login');
    }
  });

  } catch (error) {
    res.status(400).send(error);
    console.log(error)
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    UserModel.findOne({ email }, async (err, user) => {
    if (err) {
      console.error(err);
      res.status(401).render('login', { error: 'Error logging in. Please try again.' });
    } else if (!user) {
      res.status(401).render('login', { error: 'Invalid username or password.' });
    } else {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        req.session.userId = user._id;

        res.status(200).redirect('/');
      } else {
        res.status(401).render('login', { error: 'Invalid username or password.' });
      }
    }
  });

  } catch (error) {
    console.log("An error occurred:", error);
    res.status(500).send("Internal Server Error");
  }
};

const logOut = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect('/');  
  } catch (error) {
    console.log("An error occurred:", error);
    res.status(500).send("Internal Server Error");
  }
};

const authController = {
  signUp,
  signIn,
  logOut,
};

module.exports = authController;
