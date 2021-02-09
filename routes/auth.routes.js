const router = require('express').Router();
const bcrypt = require('bcryptjs');
const UserModel = require('../models/User.model')


//-----Sign Up-----//
router.get('/signup', (req, res, next) => {
  res.render('auth/signup.hbs')
})

//-----Sign In-----//
router.get('/login', (req, res, next) => {
  res.render('auth/login.hbs')
})

//-----Handle POST requests to /signup-----//
router.post('/signup', (req, res, next) => {
  const {name, password} = req.body
  
  if(!name.length || !password.length) {
    res.render('auth/signup', {msg: 'Please enter all fields'})
    return;
  }

  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);
  UserModel.create({name, password: hash})
    .then(() => {
      res.redirect('/')
    })
    .catch((err) => {
      next(err)
    })
});

//-----Handle POST requests to /login-----//
router.post('/login', (req, res, next) => {
  const {name, password} = req.body

  UserModel.findOne({name: name})
    .then((result) => {
      if(result) {
        bcrypt.compare(password, result.password)
          .then((isMatching) => {
            if(isMatching) {
              req.session.loggedInUser = result
              res.redirect('/profile')
            }
            else {
              res.render('auth/login.hbs', {msg: 'Paswords dont match'})
            }
          })
      }
      else {
        res.render('auth/login.hbs', {msg: 'Email does not exist'})
      }
    })
    .catch((err) => {
      next(err)
    })
})

const checkLoggedInUser = (req, res, next) => {
  if(req.session.loggedInUser) {
    next()
  }
  else {
    res.redirect('/signin')
  }
}

router.get('/profile', checkLoggedInUser, (req, res, next) => {
  let name = req.session.loggedInUser.name
  res.render('profile.hbs', {name})
})

module.exports = router;
