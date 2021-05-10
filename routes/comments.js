const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const { commentSchema } = require('../schemas.js')
const ExpressError = require('../utils/ExpressError');

const Project = require('../models/project')
const Comment = require('../models/comment')

//******************************************** */
//////////////JOI MIDDLEWARE/////////////////////
//******************************************** */
//COMMENT VALIDATION
const validateComment = (req, res, next) => {
  //Deconstruct error from response
  const { error } = commentSchema.validate(req.body);
  if(error){
    const msg = error.details.map(el => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
//******************************************** */
///////////////////ROUTES////////////////////////
//******************************************** */
//POST COMMENT TO PROJECT SHOW PAGE
router.post('/', validateComment, catchAsync(async (req, res) => {
  // console.log(req.body);
  // res.send("YOU MADE A COMMENT!!!")
  const project = await Project.findById(req.params.id);
  const comment = new Comment(req.body.comment);
  project.comments.push(comment);
  await comment.save();
  await project.save();
  res.redirect(`/projects/${project._id}`)
}));
//DELETE COMMENT
router.delete('/:commentId', catchAsync(async (req, res) => {
  //DESTRUCTURE FROM REQ.PARAMS
  const { id, commentId } = req.params;
  //use $pull -> removes from array on specified condition
  await Project.findByIdAndUpdate(id, { $pull: { comments: commentId } });
  await Comment.findByIdAndDelete(commentId);
  res.redirect(`/projects/${id}`);
}));


module.exports = router