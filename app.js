const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const engine = require('ejs-mate');
const catchAsync = require('./utils/catchAsync');
const methodOverride = require('method-override');
const Project = require('./models/project');
const Comment = require('./models/comment')
const ExpressError = require('./utils/ExpressError');
//ROUTERS
const projectRoutes = require('./routes/projects');
const commentRoutes = require('./routes/comments');

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
/////////////ROUTER MIDDLEWARE///////////////////
//******************************************** */
app.use('/projects', projectRoutes);
app.use('/projects/:id/comments', commentRoutes);

//HOME PAGE ROUTE
app.get('/', (req, res) => {
  res.render('home');
});

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