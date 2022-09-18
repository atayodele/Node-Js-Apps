const User = require('../models/user');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const APIFilters = require('../utils/apiFilters');

// Get current user profile   =>    /api/v1/me
exports.getUserProfile = catchAsyncErrors( async(req, res, next) => {

    const user = await User.findById(req.user.id);

    res.status(200).json({
        success : true,
        data : user
    })
});

// Update current user data   =>    /api/v1/me/update
exports.updateUser = catchAsyncErrors( async(req, res, next) => {

    const user = await User.findByIdAndUpdate(req.user.id, { $set: req.body }, {
        new : true,
        runValidators : true,
        useFindAndModify : false
    });
    if(!user) return next(new ErrorHandler('Error occurred while updating user', 404));

    res.status(200).json({
        success : true,
        data : user
    });
});

// Delete current user   =>    /api/v1/me/delete
exports.deleteUser = catchAsyncErrors( async(req, res, next) => {

    const user = await User.findByIdAndDelete(req.params.id);
    if(!user) {
        return next(new ErrorHandler(`User not found with id: ${req.params.id}`, 404));
    }
    res.status(200).json({
        success : true,
        message : 'User account has been deleted.'
    })
});

// Adding controller methods that only accessible by admins

// Show all users  =>   /api/v1/users
exports.getUsers = catchAsyncErrors( async (req, res, next) => {
    const apiFilters = new APIFilters(User.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .pagination();

    const users = await apiFilters.query;

    res.status(200).json({
        success : true,
        results : users.length,
        data : users
    })
});

// Get User By Id   =>   /api/v1/user/:id
exports.getUserById = catchAsyncErrors( async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user) {
        return next(new ErrorHandler(`User not found with id: ${req.params.id}`, 404));
    }

    res.status(200).json({
        success : true,
        data : user
    });
});