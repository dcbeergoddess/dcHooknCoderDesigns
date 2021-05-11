const mongoose = require('mongoose');
const Comment = require('./comment')
const Schema = mongoose.Schema;

const ProjectSchema = new Schema ({
  title: String,
  image: String,
  pattern: String,
  craft: String,
  yarnCategory: String,
  tool: String,
  toolSize: Number,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
});

//DELETE MIDDLEWARE
ProjectSchema.post('findOneAndDelete', async function (doc) {
  //if we find document
  if(doc){
    await Comment.deleteMany({ 
      //this doc has comments --> delete where their id field is in the document we just delete in it's comments array
      _id: {
        $in: doc.comments
      }
    })
  } 
  // console.log(doc)
  // console.log('DELETED!!!!')
});

module.exports = mongoose.model('Project', ProjectSchema);

