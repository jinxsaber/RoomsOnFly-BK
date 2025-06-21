const express = require('express')

const routerBookings = express.Router();


// const {verify} = require('../controllers/authController')
const {postBooking, getBookings} = require('../controllers/bookingController');

routerBookings.get('/bookings', getBookings);

routerBookings.post('/bookings', postBooking);

module.exports= {
    routerBookings
}