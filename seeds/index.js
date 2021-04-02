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

const seedDB = async () => {
    await Project.deleteMany({});
    const p = new Project({title: 'baby cardigan', craft: 'knit'});
    await p.save();
};

seedDB();
