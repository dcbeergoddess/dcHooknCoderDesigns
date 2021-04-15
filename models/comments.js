const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//EXAMPLE TO BUILD TO
/*
const CommentSchema = new Schema({
  content: { type: String, required: true }
},
  {timestamps: {createdAt: 'created_at'}}
);
*/

const CommentSchema = new Schema({
  body: String,
  //timestamp
});

module.exports = mongoose.model('Comment', CommentSchema);