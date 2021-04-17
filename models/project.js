const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema ({
  title: String,
  image: String,
  craft: String,
  yarnCategory: String,
  tool: String,
  toolSize: Number,
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
});

//DELETE MIDDLEWARE
ProjectSchema.post('findOneAndDelete', async function (doc) {
  console.log(doc)
  console.log('DELETED!!!!')
});

module.exports = mongoose.model('Project', ProjectSchema);

