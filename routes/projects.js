const express = require('express');
const router = express.Router();
const projects = require('../controllers/projects')
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, validateProject, isAuthor } = require('../middleware')

//******************************************** */
///////////////////ROUTES////////////////////////
//******************************************** */
//PROJECTS INDEX - ALL PROJECTS
router.get('/', catchAsync(projects.index));
//NEW FORM
router.get('/new', isLoggedIn, projects.renderNewForm);
//POST NEW PROJECT
router.post('/', isLoggedIn, validateProject, catchAsync(projects.createProject));
//SHOW - PROJECT DETAIL PAGE
router.get('/:id', catchAsync(projects.showProject));
//EDIT FORM
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(projects.renderEditForm));
//PUT ROUTE TO UPDATE
router.put('/:id', isLoggedIn, isAuthor, catchAsync(projects.updateProject));
//DELETE ROUTE
router.delete('/:id', isLoggedIn, isAuthor, catchAsync(projects.deleteProject));

module.exports = router;