const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync')
const User = require('../models/user');

//RENDER REGISTER FORM
router.get('/register', (req, res) => {
  res.render('users/register')
})

//POST USER
router.post('/register', catchAsync(async (req, res) => {
  try {
  const { email, username, password } = req.body;
  const user = new User({ email, username });
  const registeredUser = await User.register(user, password);
  console.log(registeredUser);
  req.flash('success', 'Welcome to DC Hook & Coder Designs!');
  res.redirect('/projects');
  } catch(e) {
    req.flash('error', e.message);
    res.redirect('register');
  }
}));

module.exports = router;