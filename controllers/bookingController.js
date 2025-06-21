const Booking = require('../model/booking')
const mongoose = require('mongoose')

const postBooking = async (req, res) => {
    try{
        const {userId,from,to,hotelId} = req.body;

        const newBooking = await Booking.create({
            userId,
            from,
            to,
            hotelId
        })
        res.status(200).json(newBooking);
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
};

const getBookings = async (req, res) => {
    const id = req.user._id;
    
    try {
        const bookings = await Booking.find({ userId: id });
        res.status(200).json(bookings);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
};



module.exports = {
    postBooking,
    getBookings
}