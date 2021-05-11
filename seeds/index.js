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
    image: 'https://source.unsplash.com/collection/4756137',
    craft: 'crochet',
    yarnCategory: 'worsted',
    tool: '4mm Hook',
    author: '6099d4371131b51a8290cafb'
  },
  {
    title: 'Baby Cardigan',
    image: 'https://source.unsplash.com/collection/4756137',
    craft: 'knit',
    yarnCategory: 'sport',
    tool: '3.75 Circular Needles',
    author: '6099d4371131b51a8290cafb'
  },
  {
    title: 'Yoda',
    image: 'https://source.unsplash.com/collection/4756137',
    craft: 'crochet',
    yarnCategory: 'worsted',
    tool: '4mm Hook',
    author: '6099d4371131b51a8290cafb'
  },
  {
    title: 'Mando',
    image: 'https://source.unsplash.com/collection/4756137',
    craft: 'crochet',
    yarnCategory: 'worsted',
    tool: '4mm Hook',
    author: '6099d4371131b51a8290cafb'
  },
  {
    title: 'Dalmatian',
    image: 'https://source.unsplash.com/collection/4756137',
    craft: 'crochet',
    yarnCategory: 'worsted',
    tool: '4mm Hook',
    author: '6099d4371131b51a8290cafb'
  },
  {
    title: 'Annie Afghan',
    image: 'https://source.unsplash.com/collection/4756137',
    craft: 'crochet',
    yarnCategory: 'worsted',
    tool: '5.5mm Hook',
    author: '6099d4371131b51a8290cafb'
  },
  {
    title: 'Rub-a-Dub Towel',
    image: 'https://source.unsplash.com/collection/4756137',
    craft: 'knit',
    yarnCategory: 'light worsted',
    tool: '5mm circular hooks',
    author: '6099d4371131b51a8290cafb'
  },
  {
    title: 'Convertible Wrap',
    image: 'https://source.unsplash.com/collection/4756137',
    craft: 'crochet',
    yarnCategory: 'worsted',
    tool: '5mm Hook',
    author: '6099d4371131b51a8290cafb'
  },
  {
    title: 'Veggies',
    image: 'https://source.unsplash.com/collection/4756137',
    craft: 'crochet',
    yarnCategory: 'worsted',
    tool: '4mm Hook',
    author: '6099d4371131b51a8290cafb'
  },
  {
    title: 'Sven',
    image: 'https://source.unsplash.com/collection/4756137',
    craft: 'crochet',
    yarnCategory: 'light worsted',
    tool: '4mm Hook',
    author: '6099d4371131b51a8290cafb'
  }
]

const seedDB = async () => {
  await Project.deleteMany({});
  await Project.insertMany(samplePs)
  };


seedDB().then(() => {
    mongoose.connection.close();
});