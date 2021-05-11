const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateComment, isLoggedIn } = require('../middleware')
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

const Project = require('../models/project')
const Comment = require('../models/comment')

//******************************************** */
///////////////////ROUTES////////////////////////
//******************************************** */
//POST COMMENT TO PROJECT SHOW PAGE
router.post('/', isLoggedIn, validateComment, catchAsync(async (req, res) => {
  // console.log(req.body);
  // res.send("YOU MADE A COMMENT!!!")
  const project = await Project.findById(req.params.id);
  const comment = new Comment(req.body.comment);
  comment.author = req.user._id;
  project.comments.push(comment);
  await comment.save();
  await project.save();
  req.flash('success', 'New Comment Posted!')
  res.redirect(`/projects/${project._id}`)
}));
//DELETE COMMENT
router.delete('/:commentId', isLoggedIn, catchAsync(async (req, res) => {
  //DESTRUCTURE FROM REQ.PARAMS
  const { id, commentId } = req.params;
  //use $pull -> removes from array on specified condition
  await Project.findByIdAndUpdate(id, { $pull: { comments: commentId } });
  await Comment.findByIdAndDelete(commentId);
  res.redirect(`/projects/${id}`);
}));


module.exports = router