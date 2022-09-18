const express = require('express');
const router = express.Router();

const { 
    postMovie,
    updateMovie,
    deleteMovie,
    getMovies,
    getMovieById,
    getRandomMovies
 } = require('../controllers/movieController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.use(isAuthenticatedUser);

// Admin only routes
router.route('/movies').get(authorizeRoles('admin'),getMovies);
router.route('/movies/:topic').get(authorizeRoles('admin'),getRandomMovies);
router.route('/movie/create').post(authorizeRoles('admin'),postMovie);
router.route('/movie/:id')
        .get(authorizeRoles('admin'),getMovieById)
        .put(authorizeRoles('admin'),updateMovie)
        .delete(authorizeRoles('admin'),deleteMovie);

module.exports = router;