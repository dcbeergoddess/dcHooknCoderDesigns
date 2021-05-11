const { projectSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const Project = require('./models/project');
const Comment = require('./models/comment');

module.exports.isLoggedIn = (req, res, next) => {
  console.log(req.user)
  if(!req.isAuthenticated()) {
    //RETURN USER TO PAGE THEY WERE ON AFTER LOGIN
    req.session.returnTo = req.originalUrl;
    req.flash('error', 'you must be signed in');
    return res.redirect('/login'); 
  }
  next();
};
//******************************************** */
//////////////JOI MIDDLEWARE/////////////////////
//******************************************** */
//PROJECT VALIDATION
module.exports.validateProject = (req, res, next) => {
  //Deconstruct error from response
  const { error } = projectSchema.validate(req.body);
  if(error){
    const msg = error.details.map(el => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  if(!project.author.equals(req.user._id)) {
    req.flash('error', 'You Do Not Have Permission To Do That!')
    res.redirect(`/projects/${project._id}`);
  }
  next();
};