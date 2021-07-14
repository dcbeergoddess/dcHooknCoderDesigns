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
    images: [
      {
        url: 'https://res.cloudinary.com/dc03tm19jx/image/upload/v1620938566/HooknCoderDesigns/xvs6jbya9j27r2znjr5k.png',
        filename: 'HooknCoderDesigns/xvs6jbya9j27r2znjr5k'
      },
      {
        url: 'https://res.cloudinary.com/dc03tm19jx/image/upload/v1619476221/HooknCoderDesigns/usskamvgahxibbtbrony.jpg',
        filename: 'HooknCoderDesigns/gusskamvgahxibbtbrony'
      }
    ],
    craft: 'crochet',
    yarnCategory: 'worsted',
    tool: 'Hook',
    toolSize: 4,
    author: '6099d4371131b51a8290cafb',
    pattern: 'https://www.ravelry.com/patterns/library/yellow-rubber-duck'
  },
  {
    title: 'Baby Cardigan',
    images: [
      {
        url: 'https://res.cloudinary.com/dc03tm19jx/image/upload/v1620938564/HooknCoderDesigns/hla0uqhtecwqhyhyflcb.jpg',
        filename: 'HooknCoderDesigns/hla0uqhtecwqhyhyflcb'
      },
      {
        url: 'https://res.cloudinary.com/dc03tm19jx/image/upload/v1620933319/HooknCoderDesigns/fdjvxw02yslzinmzw7wd.jpg',
        filename: 'HooknCoderDesigns/fdjvxw02yslzinmzw7wd'
      }
    ],
    craft: 'knit',
    yarnCategory: 'sport',
    tool: 'Circular Needles',
    toolSize: 3.75,
    author: '6099d4371131b51a8290cafb',
    pattern: 'https://www.ravelry.com/'
  },
  {
    title: 'Yoda',
    images: [
      {
        url: 'https://res.cloudinary.com/dc03tm19jx/image/upload/v1620938562/HooknCoderDesigns/mqkbrexf8qfepu682jx0.jpg',
        filename: 'HooknCoderDesigns/mqkbrexf8qfepu682jx0'
      },
      {
        url: 'https://res.cloudinary.com/dc03tm19jx/image/upload/v1620933319/HooknCoderDesigns/fdjvxw02yslzinmzw7wd.jpg',
        filename: 'HooknCoderDesigns/fdjvxw02yslzinmzw7wd'
      }
    ],
    craft: 'crochet',
    yarnCategory: 'worsted',
    tool: 'Hook',
    toolSize: 4,
    author: '6099d4371131b51a8290cafb',
    pattern: 'https://www.ravelry.com/'
  },
  {
    title: 'Mando',
    images: [
      {
        url: 'https://res.cloudinary.com/dc03tm19jx/image/upload/v1620938818/HooknCoderDesigns/vhwwzjfvuutbodnt50qh.jpg',
        filename: 'HooknCoderDesigns/vhwwzjfvuutbodnt50qh'
      },
      {
        url: 'https://res.cloudinary.com/dc03tm19jx/image/upload/v1620933319/HooknCoderDesigns/fdjvxw02yslzinmzw7wd.jpg',
        filename: 'HooknCoderDesigns/fdjvxw02yslzinmzw7wd'
      }
    ],    craft: 'crochet',
    yarnCategory: 'worsted',
    tool: 'Hook',
    toolSize: 4,
    author: '6099d4371131b51a8290cafb',
    pattern: 'https://www.ravelry.com/'
  },
  {
    title: 'Dalmatian',
    images: [
      {
        url: 'https://res.cloudinary.com/dc03tm19jx/image/upload/v1620938568/HooknCoderDesigns/lje2plsvt68b21w2qn1d.jpg',
        filename: 'HooknCoderDesigns/lje2plsvt68b21w2qn1d'
      },
      {
        url: 'https://res.cloudinary.com/dc03tm19jx/image/upload/v1620933319/HooknCoderDesigns/fdjvxw02yslzinmzw7wd.jpg',
        filename: 'HooknCoderDesigns/fdjvxw02yslzinmzw7wd'
      }
    ],
    craft: 'crochet',
    yarnCategory: 'worsted',
    tool: 'Hook',
    toolSize: 4,
    author: '6099d4371131b51a8290cafb',
    pattern: 'https://www.ravelry.com/'
  },
  {
    title: 'Annie Afghan',
    images: [
      {
        url: 'https://res.cloudinary.com/dc03tm19jx/image/upload/v1620933318/HooknCoderDesigns/mgdltyuijus7jxdeigxj.jpg',
        filename: 'HooknCoderDesigns/mgdltyuijus7jxdeigxj'
      },
      {
        url: 'https://res.cloudinary.com/dc03tm19jx/image/upload/v1620933319/HooknCoderDesigns/fdjvxw02yslzinmzw7wd.jpg',
        filename: 'HooknCoderDesigns/fdjvxw02yslzinmzw7wd'
      }
    ],
    craft: 'crochet',
    yarnCategory: 'worsted',
    tool: 'Hook',
    toolSize: 5.5,
    author: '6099d4371131b51a8290cafb',
    pattern: 'https://www.ravelry.com/'
  },
  {
    title: 'Rub-a-Dub Towel',
    images: [
      {
        url: 'https://res.cloudinary.com/dc03tm19jx/image/upload/v1620933318/HooknCoderDesigns/mgdltyuijus7jxdeigxj.jpg',
        filename: 'HooknCoderDesigns/mgdltyuijus7jxdeigxj'
      },
      {
        url: 'https://res.cloudinary.com/dc03tm19jx/image/upload/v1620933319/HooknCoderDesigns/fdjvxw02yslzinmzw7wd.jpg',
        filename: 'HooknCoderDesigns/fdjvxw02yslzinmzw7wd'
      }
    ],
    craft: 'knit',
    yarnCategory: 'light worsted',
    tool: 'Circular Needles',
    toolSize: 5,
    author: '6099d4371131b51a8290cafb',
    pattern: 'https://www.ravelry.com/'
  },
  {
    title: 'Convertible Wrap',
    images: [
      {
        url: 'https://res.cloudinary.com/dc03tm19jx/image/upload/v1620938569/HooknCoderDesigns/shxuoeftczjjhi0im0ol.jpg',
        filename: 'HooknCoderDesigns/shxuoeftczjjhi0im0ol'
      },
      {
        url: 'https://res.cloudinary.com/dc03tm19jx/image/upload/v1620933319/HooknCoderDesigns/fdjvxw02yslzinmzw7wd.jpg',
        filename: 'HooknCoderDesigns/fdjvxw02yslzinmzw7wd'
      }
    ],
    craft: 'crochet',
    yarnCategory: 'worsted',
    tool: 'Hook',
    toolSize: 5,
    author: '6099d4371131b51a8290cafb',
    pattern: 'https://www.ravelry.com/'
  },
  {
    title: 'Veggies',
    images: [
      {
        url: 'https://res.cloudinary.com/dc03tm19jx/image/upload/v1620938563/HooknCoderDesigns/p9sly6merzz02wasmbxp.jpg',
        filename: 'HooknCoderDesigns/p9sly6merzz02wasmbxp'
      },
      {
        url: 'https://res.cloudinary.com/dc03tm19jx/image/upload/v1620939027/HooknCoderDesigns/imzgabpbrergyqonrsvd.jpg',
        filename: 'HooknCoderDesigns/imzgabpbrergyqonrsvd'
      }
    ],
    craft: 'crochet',
    yarnCategory: 'worsted',
    tool: 'Hook',
    toolSize: 4,
    author: '6099d4371131b51a8290cafb',
    pattern: 'https://www.ravelry.com/'
  },
  {
    title: 'Sven',
    images: [
      {
        url: 'https://res.cloudinary.com/dc03tm19jx/image/upload/v1620938818/HooknCoderDesigns/vhwwzjfvuutbodnt50qh.jpg',
        filename: 'HooknCoderDesigns/vhwwzjfvuutbodnt50qh'
      },
      {
        url: 'https://res.cloudinary.com/dc03tm19jx/image/upload/v1620933319/HooknCoderDesigns/fdjvxw02yslzinmzw7wd.jpg',
        filename: 'HooknCoderDesigns/fdjvxw02yslzinmzw7wd'
      }
    ],
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