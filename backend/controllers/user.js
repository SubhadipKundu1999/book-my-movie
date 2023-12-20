const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Booking = require('../models/Booking');

const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        return console.log(err);
    }

    if (!users) {
        return res.status(500).json({
            message: "Unexpected error occured"
        })
    }
    return res.status(200).json({ users })
}

//get user by id

const getUserById = async (req, res, next) => {

    const id = req.params.id;
    try {
        const existingUser = await User.findById(id).select({ password: 0 });
        if (!existingUser) {
            return res.ststus(400).send("user with given id was not found")
        }
        return res.status(200).json(existingUser);
    }
    catch (err) {
        console.log(err);
    }
}


const getBookingsOfUser = async (req, res, next) => {
    const id = req.params.id;
    let bookings;
    try {
        bookings = await Booking.find({ user: id })
            .populate("movie")
            .populate("user");
    } catch (err) {
        return console.log("booking error", err);
    }
    if (!bookings) {
        return res.status(500).json({ message: "Unable to get Bookings" });
    }
    return res.status(200).json({ bookings });
};

//sign up
const signUp = async (req, res, next) => {

    const { name, email, password } = req.body;

    if (!name && name.trim() === "" &&
        !email && email.trim() === "" &&
        !password && password.trim() === "") {
        return res.status(400).json({ message: "Invalid Inputs" })
    }

    try {

        var salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let user;
        user = new User({ name, email, password: hashedPassword })
        user = await user.save();

        if (!user) {
            return res.status(500).json({ message: "Unexpected Error Occurred" });
        }
        return res.status(201).json(user)
    }
    catch (err) {
        console.log(err)
        return res.json({ err });
    }
}

const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const { name, email, password } = req.body;
    if (!name && name.trim() === "" &&
        !email && email.trim() === "" &&
        !password && password.trim() === "") {
        return res.status(422).json({ message: "Invalid Inputs" })
    }

    var salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    let users;
    try {
        users = await User.findByIdAndUpdate(id, { name, email, password: hashedPassword }, { new: 'true' });
    } catch (err) {
        return res.send(err.message);
    }
    if (!users) {
        return res.status(500).json({ message: "Something went wrong" })
    }
    res.status(200).json({ message: "Updated successfully", user: users })
}

const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    let users;
    try {
        users = await User.findByIdAndDelete(id, { new: true })
    } catch (err) {
        return res.send(err.message);
    }
    if (!users) {
        return res.status(500).json({ message: "Something went wrong" })
    }
    res.status(200).json({ message: "Deleted successfully", user: users })
}

const logIn = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email && email.trim() === "" &&
        !password && password.trim() === "") {
        return res.status(400).json({ message: "Invalid Inputs" })
    }
    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        return res.send(err.message)
    }
    if (!existingUser) {
        return res.status(400).json({ message: "User not found" })
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Incorrect Password" })
    }
    return res.status(200).json({ message: "Login Successful", id: existingUser._id })
}

module.exports = { getAllUsers, signUp, logIn, deleteUser, getBookingsOfUser, updateUser, getUserById };