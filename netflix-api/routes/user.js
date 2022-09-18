const express = require('express');
const router = express.Router();

const { 
    getUserProfile,
    updateUser,
    deleteUser,
    getUsers,
    getUserById
 } = require('../controllers/userController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.use(isAuthenticatedUser);

router.route('/me').get(getUserProfile);
router.route('/me/update').put(updateUser);


// Admin only routes
router.route('/user/:id')
        .delete(authorizeRoles('admin'),deleteUser)
        .get(authorizeRoles('admin'),getUserById);
router.route('/users').get(authorizeRoles('admin'),getUsers);

module.exports = router;