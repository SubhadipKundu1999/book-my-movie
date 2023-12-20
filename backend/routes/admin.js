const express = require('express');
const {
    getAdmins,
    getAdminByID,
    addAdmin,
    adminLogin } = require('../controllers/admin');

const router = express.Router();

router.get('/', getAdmins);
router.get('/:id', getAdminByID);

router.post('/add', addAdmin);
router.post('/login', adminLogin);
module.exports = router;
