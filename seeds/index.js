const mongoose = require('mongoose');
const Project = require('../models/project');

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

const samplePs = [
  {
    title: 'Rubber Duck',
    craft: 'crochet',
    yarnCategory: 'worsted',
    tool: '4mm Hook'
  },
  {
    title: 'Baby Cardigan',
    craft: 'knit',
    yarnCategory: 'sport',
    tool: '3.75 Circular Needles'
  },
  {
    title: 'Yoda',
    craft: 'crochet',
    yarnCategory: 'worsted',
    tool: '4mm Hook'
  },
  {
    title: 'Mando',
    craft: 'crochet',
    yarnCategory: 'worsted',
    tool: '4mm Hook'
  },
  {
    title: 'Dalmatian',
    craft: 'crochet',
    yarnCategory: 'worsted',
    tool: '4mm Hook'
  },
  {
    title: 'Annie Afghan',
    craft: 'crochet',
    yarnCategory: 'worsted',
    tool: '5.5mm Hook'
  },
  {
    title: 'Rub-a-Dub Towel',
    craft: 'knit',
    yarnCategory: 'light worsted',
    tool: '5mm circular hooks'
  },
  {
    title: 'Convertible Wrap',
    craft: 'crochet',
    yarnCategory: 'worsted',
    tool: '5mm Hook'
  },
  {
    title: 'Veggies',
    craft: 'crochet',
    yarnCategory: 'worsted',
    tool: '4mm Hook'
  },
  {
    title: 'Sven',
    craft: 'crochet',
    yarnCategory: 'light worsted',
    tool: '4mm Hook'
  }
]

Project.insertMany(samplePs)
  .then(res => {
    console.log(res)
  })
  .catch(e => {
    console.log(e)
  });

mongoose.connection.close();