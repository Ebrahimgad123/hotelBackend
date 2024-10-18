const mongoose = require("mongoose");

var mongoUrl =
  "mongodb+srv://ibrahimabokhalil05:123@room.jowso5y.mongodb.net/?retryWrites=true&w=majority&appName=room";
// { useUnifiedTopology: true, useNewUrlParser: true }
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

module.exports = mongoose;
