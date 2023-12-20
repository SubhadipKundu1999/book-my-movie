const express = require('express');

const {
    getAllUsers,
    logIn,
    signUp,
    deleteUser,
    updateUser,
    getUserById,
    getBookingsOfUser
} = require('../controllers/user');

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
// router.get('/booking/:id', getBookInfoOfUser);

router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

router.post('/signup', signUp);
router.post('/login', logIn);
router.get("/bookings/:id", getBookingsOfUser);



module.exports = router;
