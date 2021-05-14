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
  project.images = req.files.map( f => ({ url: f.path, filename: f.filename }));
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
  const project = await Project.findByIdAndUpdate(id, {...req.body.project}, {new: true});
  const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
  project.images.push(...imgs);
  await campground.save();
  if(req.body.deleteImages) {
    for(let filename of req.body.dleteimages){
      await cloudinary.uploader.destroy(filename)
    };
    await project.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages }}}})
  };
  res.redirect(`${project._id}`)
};

module.exports.deleteProject = async (req, res) => {
  const { id } = req.params;
  await Project.findByIdAndDelete(id);
  res.redirect('/projects');
};