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

module.exports = mongoose.model('Project', ProjectSchema);

