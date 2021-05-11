const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const engine = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

//ROUTERS
const projectRoutes = require('./routes/projects');
const commentRoutes = require('./routes/comments');
const userRoutes = require('./routes/users')

mongoose.connect('mongodb://localhost:27017/hook-coder-designs', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
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
//SERVE UP PUBLIC FILE
app.use(express.static(path.join(__dirname, 'public')));

//******************************************** */
////////////SESSION MIDDLEWARE///////////////////
//******************************************** */
const sessionConfig = {
  secret: 'thishouldbeabettersecret!',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    httpOnly: true,
    //expire after week
    // Date.now() + milliseconds * seconds * minutes * hours * days
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
};
app.use(session(sessionConfig));
app.use(flash());
//******************************************** */
///////////PASSPORT MIDDLEWARE///////////////////
//******************************************** */
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser()); //start session
passport.deserializeUser(User.deserializeUser()); //Take out of session

//ADDITIONAL MIDDLEWARE FOR EVERY REQUEST
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

//NEW USER DEMONSTRATION
app.get('/fakeUser', async (req, res) => {
  const user = new User({email: 'rachel@gmail.com', username: 'rrrrachel'});
  const newUser = await User.register(user, 'jasmine');
  res.send(newUser);
});

//******************************************** */
/////////////ROUTER MIDDLEWARE///////////////////
//******************************************** */
app.use('/', userRoutes)
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