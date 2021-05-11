module.exports.isLoggedIn = (req, res, next) => {
  if(!req.isAuthenticated()) {
    //RETURN USER TO PAGE THEY WERE ON AFTER LOGIN
    req.session.returnTo = req.originalUrl;
    req.flash('error', 'you must be signed in');
    return res.redirect('/login'); 
  }
  next();
};