const express = require('express');
const { newbooking, deleteBooking, getBookingById } = require('../controllers/booking');
const router = express.Router();

router.post('/', newbooking);
router.delete('/:id', deleteBooking);
router.get("/:id", getBookingById);

module.exports = router;
