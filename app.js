if(process.env.NODE_ENV !== "production") {
  require('dotenv').config();
};

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
//SECURITY
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');

//ROUTERS
const projectRoutes = require('./routes/projects');
const commentRoutes = require('./routes/comments');
const userRoutes = require('./routes/users');

//MONGO
const MongoStore = require('connect-mongo');

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/hook-coder-designs';
mongoose.connect(dbUrl, {
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
//SECURITY
app.use(mongoSanitize({
  replaceWith: '_'
}));

//SECRET
const secret = process.env.SECRET || 'thisshouldbeabettersecret!';

//MONGO STORE
const store = MongoStore.create({
  mongoUrl: dbUrl,
  secret,
  touchAfter: 24 * 60 * 60
});

store.on('error', function(e) {
  console.log("SESSION STORE ERROR", e)
});

//******************************************** */
////////////SESSION MIDDLEWARE///////////////////
//******************************************** */
const sessionConfig = {
  store,
  name: 'session',
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: { 
    httpOnly: true,
    // secure: true,
    //expire after week
    // Date.now() + milliseconds * seconds * minutes * hours * days
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
};
app.use(session(sessionConfig));
app.use(flash());
app.use(helmet());
//HELMET FOR THIS PROJECT/APIS
const scriptSrcUrls = [
  "https://stackpath.bootstrapcdn.com/",
  "https://kit.fontawesome.com/",
  "https://cdnjs.cloudflare.com/",
  "https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
  "https://kit-free.fontawesome.com/",
  "https://stackpath.bootstrapcdn.com/",
  "https://fonts.googleapis.com/",
  "https://use.fontawesome.com/",
  "https://cdn.jsdelivr.net/",
];
const connectSrcUrls = [];
const fontSrcUrls = [];

app.use(
  helmet.contentSecurityPolicy({
      directives: {
          defaultSrc: [],
          connectSrc: ["'self'", ...connectSrcUrls],
          scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
          styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
          workerSrc: ["'self'", "blob:"],
          objectSrc: [],
          imgSrc: [
              "'self'",
              "blob:",
              "data:",
              "https://res.cloudinary.com/dc03tm19jx/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT! 
              "https://images.unsplash.com/",
          ],
          fontSrc: ["'self'", ...fontSrcUrls],
      },
  })
);
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
  if(!['/login', '/'].includes(req.originalUrl)) {
    req.session.returnTo = req.originalUrl
  }
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
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
const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`LISTENING ON http://localhost:${port}` )
}); 