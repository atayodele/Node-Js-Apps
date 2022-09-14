const passport = require('passport')
const User = require('../models/user')
const localStrategy = require('passport-local').Strategy

passport.serializeUser(function(user, done) {
    done(null, user.id)
})

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user)
    })
})

passport.use('local.signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done){
    User.findOne({'email': email}, function(err, user){
        if(err){
            return done(err, false, {message: err})
        }
        if(user){
            return done(null, false, {message: 'Email is already in use.'});
        }
        var create = new User()
        create.email = email;
        create.password = create.encryptPassword(password);
        create.save(function(err, result){
            if(err){
                return done(err, null)
            }
            return done(null, create)
        })
    })
}))