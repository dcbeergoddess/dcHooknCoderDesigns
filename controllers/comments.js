const Comment = require('../models/comment');
const Project = require('../models/project')

module.exports.postComment = async (req, res) => {
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
};

module.exports.deleteComment = async (req, res) => {
  //DESTRUCTURE FROM REQ.PARAMS
  const { id, commentId } = req.params;
  //use $pull -> removes from array on specified condition
  await Project.findByIdAndUpdate(id, { $pull: { comments: commentId } });
  await Comment.findByIdAndDelete(commentId);
  res.redirect(`/projects/${id}`);
};