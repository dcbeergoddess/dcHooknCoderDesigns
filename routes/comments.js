const express = require('express');
const router = express.Router({ mergeParams: true });
const comments = require('../controllers/comments');
const { validateComment, isLoggedIn, isCommentAuthor } = require('../middleware');
const catchAsync = require('../utils/catchAsync');

//******************************************** */
///////////////////ROUTES////////////////////////
//******************************************** */
//POST COMMENT TO PROJECT SHOW PAGE
router.post('/', isLoggedIn, validateComment, catchAsync(comments.postComment));
//DELETE COMMENT
router.delete('/:commentId', isLoggedIn, isCommentAuthor, catchAsync(comments.deleteComment));


module.exports = router