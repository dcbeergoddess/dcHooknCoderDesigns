const User = require('../models/user');

module.exports.renderRegisterForm = (req, res) => {
  res.render('users/register')
};

module.exports.registerUser = async (req, res) => {
  try {
  const { email, username, password } = req.body;
  const user = new User({ email, username });
  if(req.body.admin === process.env.SECRETCODE ) {
    user.isAdmin = true;
  }
  const registeredUser = await User.register(user, password);
  // console.log(registeredUser);
  //KEEP USER LOGGED IN AFTER REGISTERING--> passport helper method `login()`
  req.login(registeredUser, err => {
    if(err) return next(err)
    req.flash('success', 'Welcome to DC Hook & Coder Designs!');
    res.redirect('/projects');
  })
  } catch(e) {
    req.flash('error', e.message);
    res.redirect('register');
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render('users/login')
};

module.exports.loginUser = (req, res) => {
  req.flash('success', 'Welcome Back!');
  const redirectURL = req.session.returnTo || '/projects'
  delete req.session.returnTo;
  res.redirect(redirectURL);
};

module.exports.logoutUser = (req, res) => {
  req.logout();
  req.flash('success', "GoodBye!")
  res.redirect('/projects');
};