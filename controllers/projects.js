const Project = require('../models/project');
const { cloudinary } = require('../cloudinary')

module.exports.index = async (req, res) => {
  const projects = await Project.find({});
  res.render('projects/index', { projects });
};

module.exports.renderNewForm = (req, res) => {
  res.render('projects/new')
};

module.exports.createProject = async (req, res, next) => {
  const project = new Project(req.body.project);
  project.author = req.user._id;
  await project.save();
  req.flash('success', 'Successfully Added a New Project!');
  res.redirect(`projects/${project._id}`);
};

module.exports.showProject = async (req, res) => {
  const project = await Project.findById(req.params.id).populate({
    path: 'comments',
    populate: {
      path: 'author'
    }
  }).populate('author');
  if(!project){
  req.flash('error', 'Cannot Find That Project')
  }
  console.log(project)
  res.render('projects/show', { project });
};

module.exports.renderEditForm = async (req, res) => {
  const project = await Project.findById(req.params.id)
  res.render('projects/edit', { project });
};

module.exports.updateProject = async (req, res) => {
  const { id } = req.params;
  const p = await Project.findById(id);
  if(!p.author.equals(req.user._id)) {
    req.flash('error', 'You Do Not Have Permission To Do That!');
    return res.redirect(`/projects/${id}`);
  }
  const project = await Project.findByIdAndUpdate(id, {...req.body.project}, {new: true});
  res.redirect(`${project._id}`)
};

module.exports.deleteProject = async (req, res) => {
  const { id } = req.params;
  await Project.findByIdAndDelete(id);
  res.redirect('/projects');
};