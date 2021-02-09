// const router = requier('express').Router();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
let UserModel = require('../models/User.model.js')


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index', {title: 'Basic Auth'});
});

module.exports = router;



