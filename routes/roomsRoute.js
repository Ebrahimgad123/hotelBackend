const express = require('express');
const router = express.Router();
const Room = require('../models/room');

router.get('/getAllRoom', async (req, res) =>  {
    try {
      const rooms = await Room.find();
      res.status(200).json(rooms);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
 

  module.exports= router;
