const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const users = require('../controllers/users');

//RENDER REGISTER FORM
router.get('/register', users.renderRegisterForm)

//POST USER
router.post('/register', catchAsync(users.registerUser));

//RENDER LOGIN FORM
router.get('/login', users.renderLoginForm);

//POST LOGIN 
router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.loginUser);

//LOGOUT
router.get('/logout', users.logoutUser);

module.exports = router;