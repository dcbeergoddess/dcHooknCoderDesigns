const { projectSchema, commentSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const Project = require('./models/project');
const Comment = require('./models/comment');

//******************************************** */
//////////////AUTH MIDDLEWARE////////////////////
//******************************************** */
//USER LOGGED IN
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
//PROJECT AUTHOR
module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  if(!project.author.equals(req.user._id) || !req.user.isAdmin) {
    req.flash('error', 'You Do Not Have Permission To Do That!')
    res.redirect(`/projects/${project._id}`);
  } 
  next();
};
//REVIEW AUTHOR
module.exports.isCommentAuthor = async (req, res, next) => {
  const { id, commentId } = req.params;
  const comment = await Comment.findById(commentId);
  if(!comment.author.equals(req.user._id)) {
    req.flash('You Do Not Have Permission To Do That!');
    return res.redirect(`/projects/${id}`)
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
//COMMENT VALIDATION
module.exports.validateComment = (req, res, next) => {
  //Deconstruct error from response
  const { error } = commentSchema.validate(req.body);
  if(error){
    const msg = error.details.map(el => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};