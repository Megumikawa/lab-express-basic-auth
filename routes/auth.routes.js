const router = require('express').Router();
const UserModel = require('../models/User.model')


//-----Sign In-----//
router.get('/signin', (req, res, next) => {
  res.render('auth/signin.hbs')
})

//-----Sign Up-----//
router.get('/signup', (req, res, next) => {
  res.render('auth/signup.hbs')
})






module.exports = router;
