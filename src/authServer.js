require('dotenv').config()
const express = require('express')
const app = express()
const authRoutes = require('./api/auth/auth.routes')
const userDao = require('./dao/userDao')
const passport = require('passport')
const initializePassport = require('./config/passport-config')
initializePassport(
  passport,
  userDao.retrieveUserByUsername,
  userDao.retrieveUserById
)

app.use(express.json())
if (process.env.ALLOW_ACCESS_FROM_ANY_ORIGIN) {
  app.all('/*', function (req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method == 'OPTIONS') {
      res.status(200).end();
    } else {
      next();
    }
  });
}

app.use('/api/auth', authRoutes);



app.listen(4000)