const express = require('express');
const router = express.Router();

const { 
    postGenre,
    updateGenre,
    deleteGenre,
    getGenres,
    getGenreById
 } = require('../controllers/genreController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.use(isAuthenticatedUser);

router.route('/genres').get(getGenres);
router.route('/genre/:id').get(getGenreById);

// Admin only routes
router.route('/genre/create').post(authorizeRoles('admin'),postGenre);
router.route('/genre/:id')
        .put(authorizeRoles('admin'),updateGenre)
        .delete(authorizeRoles('admin'),deleteGenre);

module.exports = router;