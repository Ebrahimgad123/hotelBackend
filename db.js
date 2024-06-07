const mongoose = require('mongoose');

var mongoUrl ="mongodb+srv://hema123:123@cluster0.xaj2xnc.mongodb.net/roomBooking";
// { useUnifiedTopology: true, useNewUrlParser: true }
mongoose.connect(mongoUrl, )
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });


  module.exports= mongoose;
   


  


