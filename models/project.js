const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ProjectSchema = new Schema ({
  title: String,
  image: String,
  craft: String,
  yarnCategory: String,
  tool: String
});

module.exports = mongoose.model('Project', ProjectSchema);

