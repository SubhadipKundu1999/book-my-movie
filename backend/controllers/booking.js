const mongoose = require("mongoose");
const Movie = require("../models/Movie");
const User = require("../models/User");
const Booking = require("../models/Booking");

const newbooking = async (req, res, next) => {
    const { movie, date, seatNumber, user } = req.body;
    let existingMovie;
    let existingUser;
    try {

        existingMovie = await Movie.findById(movie);
        existingUser = await User.findById(user);
        console.log(existingMovie, existingUser);

        if (!existingMovie) {
            return res.status(404).json({ message: "Movie not found by given id" });
        }
        if (!existingUser) {
            return res.status(404).json({ message: "User not found by given id" });
        }

        let newBooking;

        newBooking = new Booking({
            movie, date: new Date(`${date}`),
            seatNumber,
            user
        });

        const session = await mongoose.startSession();

        session.startTransaction();

        existingMovie.bookings.push(newBooking);
        existingUser.bookings.push(newBooking);
        await existingMovie.save({ session });
        await existingUser.save({ session });
        await newBooking.save({ session });

        session.commitTransaction()

        if (!newBooking) {
            res.status(400).json({ message: "Something Went Wrong" })
        }
        console.log(newBooking);
        return res.status(201).json({ newBooking });
    }
    catch (err) {
        console.log(err);
        res.send("newbooking error", err.message);
    }
}

const getBookingById = async (req, res, next) => {
    const id = req.params.id;
    let booking;
    try {
        booking = await Booking.findById(id);
    } catch (err) {
        return console.log(err);
    }
    if (!booking) {
        return res.status(500).json({ message: "Unexpected Error" });
    }
    return res.status(200).json({ booking });
};


const deleteBooking = async (req, res, next) => {
    let id = req.params.id;
    let booking;
    try {

        booking = await Booking.findByIdAndDelete(id).populate("user movie");

        const session = await mongoose.startSession();

        session.startTransaction();

        await booking.user.bookings.pull(booking);
        await booking.movie.bookings.pull(booking);
        await booking.user.save({ session });
        await booking.movie.save({ session });

        session.commitTransaction();

        if (!booking) {
            return res.status(404).json({ message: "Booking not found by given id" });
        }
        return res.status(200).json({ message: "Booking deleted successfully" });

    }
    catch (error) {
        return console.log(error);
    }

}

module.exports = { newbooking, deleteBooking, getBookingById }