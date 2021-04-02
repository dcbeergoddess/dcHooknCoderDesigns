const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Project = require('./models/project')

mongoose.connect('mongodb://localhost:27017/hook-coder-designs', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database Connected')
});

const app = express();
const PORT = 8080

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//ROUTES
app.get('/', (req, res) => {
  res.render('home');
});

//TEST ROUTE
app.get('/newproject', async (req, res) => {
  const project = new Project({title: 'Rubber Duck Debugging', craft: 'Crochet'})
  await project.save();
  res.send(project);
})


//ERROR ROUTE 
app.get('*', (req, res) => {
  res.send(`I DO NOT KNOW THAT PATH!!!!`)
})
//Listener
app.listen(PORT, () => {
  console.log(`LISTENING ON http://localhost:${PORT}` )
}); 