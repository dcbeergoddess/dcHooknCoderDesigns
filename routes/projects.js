const express = require('express');
const router = express.Router();
const projects = require('../controllers/projects')
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, validateProject, isAuthor } = require('../middleware')

const multer = require('multer');
const { storage } = require('../cloudinary')
const upload = multer({ storage });

//******************************************** */
///////////////////ROUTES////////////////////////
//******************************************** */
router.route('/')
  .get(catchAsync(projects.index))
  .post(isLoggedIn,
    upload.array('project[image]'), 
    validateProject, 
    catchAsync(projects.createProject));

router.get('/new', 
  isLoggedIn, 
  projects.renderNewForm);

router.route('/:id')
  .get(catchAsync(projects.showProject))
  .put(isLoggedIn, 
    isAuthor, 
    catchAsync(projects.updateProject))
  .delete(isLoggedIn, 
    isAuthor, 
    catchAsync(projects.deleteProject));

router.get('/:id/edit', 
  isLoggedIn, 
  isAuthor, 
  catchAsync(projects.renderEditForm));

module.exports = router;