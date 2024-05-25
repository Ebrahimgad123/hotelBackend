const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Room = require('../models/room');
const stripe = require('stripe')('sk_test_51Oeb4QGKxFmziudOhMKUXH8VjNQimC76mjcWuKAXUc6Rl9knREd5ubZZbTItvSrTTInG3DosTVnOnP2LHYsAIxJf00PYdwFoPr');
const { v4: uuidv4 } = require('uuid');

router.post('/bookings', async (req, res) => {
  const { room, userId, fromDate, toDate, totalAmount, totalDays, token } = req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: totalAmount * 100,
        customer: customer.id,
        currency: 'USD',
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      try {
        const newBooking = new Booking({
          room: room.name,
          roomId: room._id,
          userId,
          fromDate,
          toDate,
          totalAmount,
          totalDays,
          transactionId: '1234',
        });

        const booking = await newBooking.save();

        const bookedRoom = await Room.findOne({ _id: room._id });
        bookedRoom.currentBookings.push({
          bookingId: booking._id,
          fromDate: fromDate,
          toDate: toDate,
          userId: userId,
          status: booking.status,
        });

        await bookedRoom.save();

        res.status(200).json({ message: 'Room booked successfully' });
      } catch (err) {
        console.error('Error in booking process:', err);
        res.status(500).json({ message: 'Failed to book the room' });
      }
    } else {
      res.status(500).json({ message: 'Payment failed' });
    }
  } catch (error) {
    console.error('Error in payment processing:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
router.post('/getBookingByUserId', async (req, res) => {
  const userId = await req.body.userId;
  try {
    const booking = await Booking.find({ userId: userId });
    res.send(booking);
  } catch (error) {
    // Handle errors
  }
});
router.post('/cancelBooking', async (req, res) => {
  const { roomId } = req.body;

  try {
   
    const booking = await Booking.findById(roomId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    const room = await Room.findOne({ _id: booking.roomId });

    room.currentBookings = room.currentBookings.filter(booking => booking.bookingId.toString() !== roomId);

    await room.save();
    
    await Booking.deleteOne({ _id: roomId });

    res.status(200).json({ message: 'Booking canceled and removed successfully' });
  } catch (error) {
    console.error('Error in canceling and removing booking:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



module.exports = router;
