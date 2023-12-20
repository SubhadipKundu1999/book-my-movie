const express = require('express');

const {
    getAllMovies,
    addMovie,
    getMovieById
} = require('../controllers/movie');

const router = express.Router();

router.get('/', getAllMovies);
router.post('/add', addMovie);
router.get('/:id', getMovieById);

module.exports = router;