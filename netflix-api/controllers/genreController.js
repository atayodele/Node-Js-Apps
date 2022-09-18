const Genre = require('../models/genre');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const APIFilters = require('../utils/apiFilters');

// Post Genre   =>    /api/v1/genre
exports.postGenre = catchAsyncErrors( async(req, res, next) => {
    let genre = await Genre.findOne({name: req.body.name});
    if(genre) return next(new ErrorHandler(`Genre already exist with this name ${req.body.name}`, 400));

    genre = new Genre(req.body);
    await genre.save();  
    res.status(200).json({
        success : true,
        data : genre
    })
});

// Delete Genre   =>    /api/v1/genre/delete
exports.deleteGenre = catchAsyncErrors( async(req, res, next) => {

    const genre = await Genre.findByIdAndDelete(req.params.id);
    if(!genre) {
        return next(new ErrorHandler(`Genre not found with id: ${req.params.id}`, 404));
    }
    res.status(200).json({
        success : true,
        message : 'Genre has been deleted.'
    })
});

// Update Genre   =>    /api/v1/genre/update
exports.updateGenre = catchAsyncErrors( async(req, res, next) => {

    const genre = await Genre.findByIdAndUpdate(req.params.id, { $set: req.body }, {
        new : true,
        runValidators : true,
        useFindAndModify : false
    });
    if(!genre) return next(new ErrorHandler('Error occurred while updating genre', 404));

    res.status(200).json({
        success : true,
        data : genre
    });
});

// Show all Genre  =>   /api/v1/genres
exports.getGenres = catchAsyncErrors( async (req, res, next) => {
    const apiFilters = new APIFilters(Genre.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .pagination();

    const genres = await apiFilters.query;

    res.status(200).json({
        success : true,
        results : genres.length,
        data : genres
    })
});

// Get Genre By Id   =>   /api/v1/genre/:id
exports.getGenreById = catchAsyncErrors( async (req, res, next) => {
    const genre = await Genre.findById(req.params.id);

    if(!genre) {
        return next(new ErrorHandler(`Genre not found with id: ${req.params.id}`, 404));
    }

    res.status(200).json({
        success : true,
        data : genre
    });
});