const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, validateProject, isAuthor } = require('../middleware')

const ExpressError = require('../utils/ExpressError');
const Project = require('../models/project');

//******************************************** */
///////////////////ROUTES////////////////////////
//******************************************** */
//PROJECTS INDEX - ALL PROJECTS
router.get('/', catchAsync(async (req, res) => {
  const projects = await Project.find({});
  res.render('projects/index', { projects } );
}));
//NEW FORM
router.get('/new', isLoggedIn, (req, res) => {
  res.render('projects/new')
});
//POST NEW PROJECT
router.post('/', isLoggedIn, validateProject, catchAsync(async (req, res, next) => {
  const project = new Project(req.body.project);
  project.author = req.user._id;
  await project.save();
  req.flash('success', 'Successfully Added a New Project!');
  res.redirect(`projects/${project._id}`);
}));
//SHOW - PROJECT DETAIL PAGE
router.get('/:id', catchAsync(async (req, res) => {
  const project = await Project.findById(req.params.id).populate('comments').populate('author');
  if(!project){
  req.flash('error', 'Cannot Find That Project')
  }
  console.log(project)
  res.render('projects/show', { project });
}));
//EDIT FORM
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
  const project = await Project.findById(req.params.id)
  res.render('projects/edit', { project });
}));
//PUT ROUTE TO UPDATE
router.put('/:id', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
  const { id } = req.params;
  const p = await Project.findById(id);
  if(!p.author.equals(req.user._id)) {
    req.flash('error', 'You do not have permission to do that');
    return res.redirect(`/projects/${id}`);
  }
  const project = await Project.findByIdAndUpdate(id, {...req.body.project}, {new: true});
  res.redirect(`${project._id}`)
}));
//DELETE ROUTE
router.delete('/:id', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
  const { id } = req.params;
  await Project.findByIdAndDelete(id);
  res.redirect('/projects');
}));

module.exports = router