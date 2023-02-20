

const express = require('express'),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      uuid = require('uuid'),
      mongoose = require('mongoose'),
      Models = require('./models.js'),
      cors = require('cors');

const {check, validationResult} = require('express-validator');      
const { isEmpty } = require('lodash');

      const Movies = Models.Movie;
      const Users = Models.User;



const app = express();
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors());

let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');



 //mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
//mongoose.connect('mongodb+srv://MyFlixAdmin:Atlas5@cluster0.rwvyriz.mongodb.net/myFlixDB?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect(process.env.CONNECTION_URI, {useNewUrlParser: true, useUnifiedTopology: true});

// GET/READ request in mongoose
app.get('/', (req,res) => {
    res.send('Welcome to MyFlix!');
});

app.get('/documentation', (req, res) => {                  
    res.sendFile('public/documentation.html', { root: __dirname });
});

// get all movies
app.get('/movies', passport.authenticate('jwt',{session:false}),
(req,res) => {
    Movies.find()
    .then((movies) => {
        res.status(201).json(movies);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error:' + err);
    });
});

// get movie by title / name
app.get('/movies/:Title', passport.authenticate('jwt', {session:false}),(req,res) => {
    Movies.findOne({Title: req.params.Title})
    .then((movie) => {
        res.json(movie);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error:' + err);
    });
});

// get movie by genre name
app.get('/movies/genre/:genreName',passport.authenticate('jwt', {session:false}), (req,res) => {
    Movies.find({'Genre.Name':req.params.genreName})
    .then((movie) => {
        res.status(201).json(movie);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error:' + err);
    });
});


// get movie by actor name
app.get('/movies/actor/:actorName', passport.authenticate('jwt', {session:false}), (req,res) => {
    Movies.findOne({Actors: req.params.actorName})
    .then((movie) => {
        res.json(movie);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error:' + err);
    });
});

// get movie by director name
app.get('/movies/director/:directorName', passport.authenticate('jwt', {session:false}), (req,res) => {
    Movies.find({'Director.Name': req.params.directorName})
    .then((movie) => {
        res.json(movie);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error:' + err);
    });
});

// get user by username
app.get('/users/:Username', passport.authenticate('jwt', {session:false}), (req,res) => {
    Users.findOne({Username: req.params.Username})
    .then((user) => {
        res.status(201).json(user);     
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error:' + err)
    });

});

// get all users
app.get('/users', passport.authenticate('jwt', {session:false}), (req,res) => {
    Users.find()
    .then((users) => {
        res.status(201).json(users);     
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error:' + err)
    });

});







// CREATE/POST request in mongoose

// adding a new user
app.post('/users', 
[
    check('Username', 'Username is required and minimun length is 5 characters.').isLength({min:5}),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail(),
    // check('Birthday', 'Birthday should be in the format DD-MM-YYYY').isDate({format:'DD-MM-YYYY'}) 
],
(req,res) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors:errors.array()});
    }
    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({Username: req.body.Username})
    .then((user) => {
        if (user) {
            return res.status(400).send(req.body.Username + 'already exists');   
        } else {
            Users.create ({
                Username: req.body.Username,
                Password: hashedPassword,
                Email: req.body.Email,
                Birthday: req.body.Birthday
            })
            .then((user) => {
                res.status(201).json(user)
            })
            .catch((error) => {
                console.error(error);
                res.status(500).send('Error' + error);
            })
        }
    }) .catch((error)=> {
        console.error(error);
        res.status(500).send('Error' + error);
    });
});


// adding a movie to a user's favourite movies
app.post('/users/:Username/movies/:MovieId', passport.authenticate('jwt', {session:false}),(req,res) => {
    Users.findOneAndUpdate(
        {Username: req.params.Username},
        {$push:{FavouriteMovies:req.params.MovieId},},
        {new:true},
        (err,updatedUser) => {
            if (err) {
                console.error(error);
                res.status(500).send('Error' + error);
            } else {
                res.json(updatedUser);
            }
        }

    )
});

// add a new movie
app.post('/movies', passport.authenticate('jwt', {session:false}),(req,res) => {
    Movies.findOne({Title: req.body.Title})
    .then((movie) => {
        if(movie){
            return res.status(400).send(req.body.Title + 'already exists');
        } else {
            Movies.create({
                Title: req.body.Title,
                Description: req.body.Description,
                Genre: {
                    Name: req.body.Name,
                    Description: req.body.Description,
                },
                Director: {
                    Name: req.body.Name,
                    Bio: req.body.Bio,
                },
                ImageURL: req.body.ImageURL,
                Featured: req.body.Boolean,
            })
            .then ((movie) => {
                res.status(201).json(movie);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send('Error:' + err);
            });
        }
    });
});


// Update request in mongoose

// update a user by username

app.put('/users/:Username',
[
    check('Username', 'Username is reqyuired').isLength({min:5}),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail(),
    // check('Birthday', 'Birthday should be in the format DD/MM/YYYY').isDate({format:'DD/MM/YYYY'}) 
],
passport.authenticate('jwt', {session:false}), (req,res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
  
    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOneAndUpdate({Username:req.params.Username},
        {$set:
            {
                Username: req.body.Username,
                Password: hashedPassword,
                Email: req.params.Email,
                Birthday: req.params.Birthday
            }
           },
           {new:true},
           (err, updatedUser) => {
            if(err) {
                console.error(err);
                res.status(500).send('Error:' + err);    
            } else {
                res.json(updatedUser);
            
            }

            });
                      
});





// DELETE requests in Mongoose

// Deleting a user by username
app.delete('/users/:Username',passport.authenticate('jwt', {session:false}), (req,res) => {
    Users.findOneAndRemove({Username: req.params.Username})
    .then((user) => {
        if(!user){
           res.status(400).send(req.params.Username + 'was not found');
        } else {
            res.status(200).send(req.params.Username + ' was deleted.');
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error:'+ err);
    });
});


// Deleting a favourite movie from a user's list of favourites

app.delete('/users/:Username/movies/:MovieID',passport.authenticate('jwt', {session:false}), (req,res) => {
    Users.findOneAndUpdate({Username: req.params.Username},
        {$pull:{FavouriteMovies: req.params.MovieID}},
        {new:true},
        (err, updatedUser) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error:' + err);
            } else {
                res.json (updatedUser);
            }
        });
});








// error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


const port = process.env.PORT || 5500;
app.listen(port, '0.0.0.0',() => {
 console.log('Listening on Port ' + port);
});