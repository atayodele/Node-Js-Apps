const Movie = require('../models/movie');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const APIFilters = require('../utils/apiFilters');

// Post Movie   =>    /api/v1/movie
exports.postMovie = catchAsyncErrors( async(req, res, next) => {
    let movie = await Movie.findOne({title: req.body.title, type: req.body.type});
    if(movie) return next(new ErrorHandler(`Movie already exist with this title ${req.body.title}`, 400));

    movie = new Movie(req.body);
    const genreIds = movie.Genre;
    for(var i of genreIds){
        const genre = await Genre.findById(i).select("movies");
        if(!genre) return next(new ErrorHandler(`Invalid genre id - ${i} sent`, 400));

        genre.movies.push(i);
        await genre.save();
    }
    await movie.save();  
    res.status(200).json({
        success : true,
        data : movie
    })
});

// Delete Movie   =>    /api/v1/movie/delete
exports.deleteMovie = catchAsyncErrors( async(req, res, next) => {

    const movie = await Movie.findByIdAndDelete(req.params.id);
    if(!movie) return next(new ErrorHandler(`Movie not found with id: ${req.params.id}`, 404));

    res.status(200).json({
        success : true,
        message : 'Movie has been deleted.'
    })
});

// Update Movie   =>    /api/v1/movie/update
exports.updateMovie = catchAsyncErrors( async(req, res, next) => {

    const movie = await Genre.findByIdAndUpdate(req.params.id, { $set: req.body }, {
        new : true,
        runValidators : true,
        useFindAndModify : false
    });
    if(!movie) return next(new ErrorHandler('Error occurred while updating a movie', 404));

    res.status(200).json({
        success : true,
        data : movie
    });
});

// Show all Movie  =>   /api/v1/movies
exports.getMovies = catchAsyncErrors( async (req, res, next) => {
    const apiFilters = new APIFilters(Movie.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .pagination();

    const movies = await apiFilters.query;

    res.status(200).json({
        success : true,
        results : movies.length,
        data : movies
    })
});

// Show random movie  =>   /api/v1/movies/:topic
exports.getRandomMovies = catchAsyncErrors( async (req, res, next) => {
    const movie_type = req.params.topic;
    let movie;
    if(movie_type === "series"){
        movie = await Movie.aggregate([
            { $match: { $text: { $search: "\"" + req.params.topic + "\"" } } }
        ])
    }else{
        movie = await Movie.aggregate([
            { $match: { $text: { $search: "\"" + req.params.topic + "\"" } } }
        ])
    }

    if (movie.length === 0) {
        return next(new ErrorHandler(`No Movie found for - ${req.params.topic}`, 200));
    }

    res.status(200).json({
        success: true,
        data: movie
    });
});

// Get Movie By Id   =>   /api/v1/movie/:id
exports.getMovieById = catchAsyncErrors( async (req, res, next) => {
    const movie = await Movie.findById(req.params.id);

    if(!movie) return next(new ErrorHandler(`Movie not found with id: ${req.params.id}`, 404));

    res.status(200).json({
        success : true,
        data : movie
    });
});