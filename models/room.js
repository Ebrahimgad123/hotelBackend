const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  maxCount: {
    type: Number,
    required: true
  },
  phoneNumber:{
    type:Number,
    required:true
  },
  rentPerDay:{
     type:Number,
     required:true
  },
  imageUrl: [],
  currentBookings:[],
   type:{
    type:String,
    required:true
   },
   description:{
    type:String,
    required:true
   }

},{
    timestamps:true,
});


const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
