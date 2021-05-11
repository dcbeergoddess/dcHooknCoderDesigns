const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { projectSchema } = require('../schemas.js')
const { isLoggedIn } = require('../middleware')

const ExpressError = require('../utils/ExpressError');
const Project = require('../models/project');

//******************************************** */
//////////////JOI MIDDLEWARE/////////////////////
//******************************************** */
//PROJECT VALIDATION
const validateProject = (req, res, next) => {
  //Deconstruct error from response
  const { error } = projectSchema.validate(req.body);
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
router.post('/', validateProject, catchAsync(async (req, res, next) => {
  const project = new Project(req.body.project);
  await project.save();
  req.flash('success', 'Successfully Added a New Project!');
  res.redirect(`projects/${project._id}`);
}));
//SHOW - PROJECT DETAIL PAGE
router.get('/:id', catchAsync(async (req, res) => {
  const project = await Project.findById(req.params.id).populate('comments');
  req.flash('error', 'Cannot Find That Campground')
  res.render('projects/show', { project });
}));
//EDIT FORM
router.get('/:id/edit', catchAsync(async (req, res) => {
  const project = await Project.findById(req.params.id)
  res.render('projects/edit', { project });
}));
//PUT ROUTE
router.put('/:id', catchAsync(async (req, res) => {
  const { id } = req.params;
  const project = await Project.findByIdAndUpdate(id, {...req.body.project}, {new: true});
  res.redirect(`${project._id}`)
}));
//DELETE ROUTE
router.delete('/:id', catchAsync(async (req, res) => {
  const { id } = req.params;
  await Project.findByIdAndDelete(id);
  res.redirect('/projects');
}));

module.exports = router