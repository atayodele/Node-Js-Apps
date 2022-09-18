const User = require('../models/user');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwtToken');

// Register a new user   =>   /api/v1/register
exports.registerUser = catchAsyncErrors( async (req, res, next) => {
    const {username,email,password,role} = req.body;
    let user = await User.findOne({email: req.body.email});
    if(user) return next(new ErrorHandler(`User already exist with this email ${req.body.email}`, 400));

    user = await User.create({
        username,
        email,
        password,
        role
    });

    res.status(200).json({
        success : true,
        data : user
    })
});

// Login user  =>  /api/v1/login
exports.loginUser = catchAsyncErrors( async (req, res, next) => {
    const { email, password } = req.body;

    // Checks if email or password is entered by user
    if(!email || !password) {
        return next(new ErrorHandler('Please enter email & Password'), 400)
    }

    // Finding user in database
    const user = await User.findOne({email}).select('+password');

    if(!user) {
        return next(new ErrorHandler('Invalid Email or Password.', 401))
    }

    // Check if password is correct
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    sendToken(user, 200, res);
});