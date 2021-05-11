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
    tool: 'Hook',
    toolSize: 4,
    author: '6099d4371131b51a8290cafb',
    pattern: 'https://www.ravelry.com/'
  },
  {
    title: 'Baby Cardigan',
    image: 'https://source.unsplash.com/collection/4756137',
    craft: 'knit',
    yarnCategory: 'sport',
    tool: 'Circular Needles',
    toolSize: 3.75,
    author: '6099d4371131b51a8290cafb',
    pattern: 'https://www.ravelry.com/'
  },
  {
    title: 'Yoda',
    image: 'https://source.unsplash.com/collection/4756137',
    craft: 'crochet',
    yarnCategory: 'worsted',
    tool: 'Hook',
    toolSize: 4,
    author: '6099d4371131b51a8290cafb',
    pattern: 'https://www.ravelry.com/'
  },
  {
    title: 'Mando',
    image: 'https://source.unsplash.com/collection/4756137',
    craft: 'crochet',
    yarnCategory: 'worsted',
    tool: 'Hook',
    toolSize: 4,
    author: '6099d4371131b51a8290cafb',
    pattern: 'https://www.ravelry.com/'
  },
  {
    title: 'Dalmatian',
    image: 'https://source.unsplash.com/collection/4756137',
    craft: 'crochet',
    yarnCategory: 'worsted',
    tool: 'Hook',
    toolSize: 4,
    author: '6099d4371131b51a8290cafb',
    pattern: 'https://www.ravelry.com/'
  },
  {
    title: 'Annie Afghan',
    image: 'https://source.unsplash.com/collection/4756137',
    craft: 'crochet',
    yarnCategory: 'worsted',
    tool: 'Hook',
    toolSize: 5.5,
    author: '6099d4371131b51a8290cafb',
    pattern: 'https://www.ravelry.com/'
  },
  {
    title: 'Rub-a-Dub Towel',
    image: 'https://source.unsplash.com/collection/4756137',
    craft: 'knit',
    yarnCategory: 'light worsted',
    tool: 'Circular Needles',
    toolSize: 5,
    author: '6099d4371131b51a8290cafb',
    pattern: 'https://www.ravelry.com/'
  },
  {
    title: 'Convertible Wrap',
    image: 'https://source.unsplash.com/collection/4756137',
    craft: 'crochet',
    yarnCategory: 'worsted',
    tool: 'Hook',
    toolSize: 5,
    author: '6099d4371131b51a8290cafb',
    pattern: 'https://www.ravelry.com/'
  },
  {
    title: 'Veggies',
    image: 'https://source.unsplash.com/collection/4756137',
    craft: 'crochet',
    yarnCategory: 'worsted',
    tool: 'Hook',
    toolSize: 4,
    author: '6099d4371131b51a8290cafb',
    pattern: 'https://www.ravelry.com/'
  },
  {
    title: 'Sven',
    image: 'https://source.unsplash.com/collection/4756137',
    craft: 'crochet',
    yarnCategory: 'light worsted',
    tool: 'Hook',
    toolSize: 4,
    author: '6099d4371131b51a8290cafb',
    pattern: 'https://www.ravelry.com/'
  }
]

const seedDB = async () => {
  await Project.deleteMany({});
  await Project.insertMany(samplePs)
  };


seedDB().then(() => {
    mongoose.connection.close();
});