const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const engine = require('ejs-mate');
const Joi = require('joi');
// const { projectSchema } = require('./schemas.js')
const catchAsync = require('./utils/catchAsync');
const methodOverride = require('method-override');
const Project = require('./models/project');
const ExpressError = require('./utils/ExpressError');

mongoose.connect('mongodb://localhost:27017/hook-coder-designs', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database Connected')
});

const app = express();
const PORT = 8080

app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//******************************************** */
///////////MONGOOSE MIDDLEWARE///////////////////
//******************************************** */
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
//******************************************** */
//////////////JOI MIDDLEWARE/////////////////////
//******************************************** */
// const validateProject = (req, res, next) => {
//   const { error } = projectSchema.validate(req.body);
//   if(error) {
//     const msg = error.details.map(el => el.message).join(',')
//     throw new ExpressError(msg, 400)
//   } else {
//     next();
//   }
// };

//******************************************** */
///////////////////ROUTES////////////////////////
//******************************************** */
//HOME PAGE
app.get('/', (req, res) => {
  res.render('home');
});
//PROJECTS INDEX - ALL PROJECTS
app.get('/projects', catchAsync(async (req, res) => {
  const projects = await Project.find({});
  res.render('projects/index', { projects } );
}));
//NEW FORM
app.get('/projects/new', (req, res) => {
  res.render('projects/new')
});
//POST PROJECTS
app.post('/projects', catchAsync(async (req, res, next) => {
  const projectSchema = Joi.object ({
    project: Joi.object({
      title: Joi.string().required(),
      craft: Joi.string().required()
    }).required()
  })
  const result = projectSchema.validate(req.body);
  if(result.error){
    throw new ExpressError(result.error.details, 400)
  }
  const project = new Project(req.body.project);
  await project.save();
  res.redirect(`projects/${project._id}`);
}));
//SHOW - PROJECT DETAIL PAGE
app.get('/projects/:id', catchAsync(async (req, res) => {
  const project = await Project.findById(req.params.id)
  res.render('projects/show', { project });
}));
//EDIT FORM
app.get('/projects/:id/edit', catchAsync(async (req, res) => {
  const project = await Project.findById(req.params.id)
  res.render('projects/edit', { project });
}));
//PUT ROUTE
app.put('/projects/:id', catchAsync(async (req, res) => {
  const { id } = req.params;
  const project = await Project.findByIdAndUpdate(id, {...req.body.project}, {new: true});
  res.redirect(`${project._id}`)
}));
//DELETE ROUTE
app.delete('/projects/:id', catchAsync(async (req, res) => {
  const { id } = req.params;
  await Project.findByIdAndDelete(id);
  res.redirect('/projects');
}));

//******************************************** */
/////////////BASIC 404 ERROR/////////////////////
//******************************************** */
app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 404))
});

//******************************************** */
//////BASIC EXPRESS ERROR HANDLER////////////////
//******************************************** */
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if(!err.message) err.message = 'Oh No, Something Went Wrong!'
  res.status(statusCode).render('error', { err });
});
//******************************************** */
/////////////////LISTENER////////////////////////
//******************************************** */
app.listen(PORT, () => {
  console.log(`LISTENING ON http://localhost:${PORT}` )
}); 