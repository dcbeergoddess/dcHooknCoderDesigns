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
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
  //timestamp
});

module.exports = mongoose.model('Comment', CommentSchema);