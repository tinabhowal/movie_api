

const express = require('express'),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      uuid = require('uuid'),
      mongoose = require('mongoose'),
      Models = require('./models.js');

      const Movies = Models.Movie;
      const Users = Models.User;


const app = express();
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');

// let users = [
//     {id: 1,
//      name: 'Kim',
//      favoriteMovies: []   
//     },

//     {id: 2,
//     name: 'Jim',
//     favoriteMovies: ['8 Below', 'Panther Panchali'] 

//     }
// ]

// let topMovies = [
//     {
//         'Title': 'Panther Panchali',
//         'Director': 'Satyajit Ray',
//         'Genre': {
//             'Name':'Drama',
//             'Description': 'Pather Panchali is a 1955 Indian Bengali-language drama film written and directed by Satyajit Ray and produced by the Government of West Bengal.'

//         }
        

//     },
//     {
//         'Title': '8 Below',
//         'Director': 'Frank Marshall' ,
//         'Genre': {
//             'Name':'Drama',
//             'Description': 'Eight Below is a 2006 American survival drama film, a remake based on the 1983 Japanese film Antarctica by Toshirô Ishidô, Koreyoshi Kurahara, Tatsuo Nogami and Susumu Saji. '
//         }
//     },
//     {
//         'Title': 'Kung Fu Panda',
//          'Director': 'Mark Osborne and John Stevenson',
//          'Genre': {
//             'Name':'Animation',
//             'Description': 'Kung Fu Panda is a 2008 American CGI animated action comedy film produced by DreamWorks Animation . It was directed by Mark Osborne and John Stevenson and written by Jonathan Aibel and Glenn Berger .'
//         }
//     },
//     {
//         'Title': 'Love Actually',
//         'Director': 'Richard Curtis',
//         'Genre': {
//             'Name':'Drama',
//             'Description': 'Love Actually is a 2003 Christmas romantic comedy film written and directed by Richard Curtis. It features an ensemble cast, composed predominantly of British actors, many of whom had worked with Curtis in previous film and television projects. Mostly filmed on location in London, the screenplay delves into different aspects of love as shown through ten separate stories involving a wide variety of individuals, many of whom are shown to be interlinked as the tales progress. The story begins five weeks before Christmas and is played out in a weekly countdown until the holiday, followed by an epilogue that takes place one month later.'
//         }
//     },
//     {
//         'Title': 'Titanic',
//         'Director': 'James Cameron',
//         'Genre': {
//             'Name':'Drama',
//             'Description': 'Titanic is a 1997 American epic romance and disaster film directed, written, produced, and co-edited by James Cameron. Incorporating both historical and fictionalized aspects, it is based on accounts of the sinking of the RMS Titanic and stars Kate Winslet and Leonardo DiCaprio as members of different social classes who fall in love aboard the ship during its ill-fated maiden voyage. Also starring are Billy Zane, Kathy Bates, Frances Fisher, Gloria Stuart, Bernard Hill, Jonathan Hyde, Victor Garber, and Bill Paxton.'
//         }
//     },
//     {
//         'Title': 'Joker (2019)',
//         'Director': 'Todd Phillips',
//         'Genre': {
//             'Name':'Drama',
//             'Description': 'Joker is a 2019 American psychological thriller film directed by Todd Phillips, who also co-wrote the screenplay with Scott Silver. The film, based on DC Comics characters, stars Joaquin Phoenix as the Joker and serves as a standalone origin story for the character.'
//         }
//     },
//     {
//         'Title': 'Avengers:Endgame',
//         'Director': 'Anthony Russo, Joe Russo',
//         'Genre': {
//             'Name':'Action',
//             'Description': 'Avengers: Endgame is a 2019 American superhero film based on the Marvel Comics superhero team the Avengers.'
//         }
//     },
//     {
//         'Title': 'Hachi',
//         'Director': 'Lasse Hallström',
//         'Genre': {
//             'Name':'Drama',
//             'Description': 'Hachi is the tale of a dog.It is a 2009 American drama film and a remake of 1987 Japanese film Hachikō Monogatari by Kaneto Shindo. '
//         }
//     },
//     {
//         'Title': 'Rang De Basanti',
//         'Director': 'Rakeysh Omprakash Mehra',
//         'Genre': {
//             'Name':'Drama',
//             'Description': 'When Sue selects a few students to portray various Indian freedom fighters in her film, she unwittingly awakens their patriotism. The emotional and mental process turns them into rebels for a cause.'
//         }
//     },
//     {
//         'Title': 'Swades',
//         'Director': 'Ashutosh Gowariker',
//         'Genre': {
//             'Name':'Drama',
//             'Description': 'Mohan, an Indian expatriate employed with NASA, travels to his country to track down his beloved nanny, Kaveri. During his stay, he finds himself advocating for reform in a village.'
//         }
//     }
// ];


// CREATE/POST requests 
// app.post('/users', (req, res) => {
//     const newUser = req.body;

//     if(newUser.name){
//         newUser.id = uuid.v4();
//         users.push(newUser);
//         res.status(201).json(newUser)
//     }else{
//         res.status(400).send('User needs a name.')
//     }
// });

// app.post('/users/:id/:movieTitle', (req, res) => {
//     const { id, movieTitle } = req.params;

//     let user = users.find( user => user.id == id );

//     if(user){
//         user.favoriteMovies.push(movieTitle);
//         res.status(200).send(`${movieTitle} has been added to user ${id}'s array.`);
//     }else{
//         res.status(400).send('User not found.')
//     }
// });

// UPDATE/PUT requests
// app.put('/users/:id', (req, res) => {
//     const { id } = req.params;
//     const updatedUser = req.body;

//     let user = users.find(user => user.id == id);

//     if (user){
//         user.name = updatedUser.name;
//         res.status(200).json(user);
//     }else {
//         req.status(400).send('No such user found.')
//     }
// });

// app.delete('/users/:id', (req, res) => {
//     const { id } = req.params;

//     let user = users.find( user => user.id == id );

//     if(user){
//         users = users.filter(user => user.id != id);

//         res.status(200).send(`User id${id} has been deleted.`);
//     }else{
//         res.status(400).send('User not found.')
//     }
// });

// app.delete('/users/:id/:movieTitle', (req, res) => {
//     const { id, movieTitle } = req.params;

//     let user = users.find( user => user.id == id );

//     if(user){
//         user.favoriteMovies = user.favoriteMovies.filter(title => title !== movieTitle);
//         res.status(200).send(`${movieTitle} has been removed from user ${id}'s array.`);
//     }else{
//         res.status(400).send('User not found.')
//     }
// });

// GET/READ requests
// app.get('/', (req,res) => {res.send('Welcome to myFlix!');});

// app.get('/documentation', (req, res) => {                  
//     res.sendFile('public/documentation.html', { root: __dirname });
//   });

// app.get('/movies', (req,res) => {res.json(topMovies);});

// app.get('/users', (req,res) => {res.json(users);});

// app.get('/movies/:title', (req, res) => {
//     const { title } = req.params;
//     //  This is called object destructuring.
//     const movie = topMovies.find(movie => movie.Title === title);

//     if (movie){
//         res.status(200).json(movie);
//     }else{
//         res.status(404).send("Movie not found!")
//     }
// });

// app.get('/movies/genre/:genreName', (req, res) => {
//     const { genreName } = req.params;
    
//     const genre = topMovies.filter(movie => movie.Genre.Name === genreName || movie.genre === genreName);

//     if (genre){
//         res.status(200).json(genre);
//     }else{
//         res.status(404).send("No such genre found!")
//     }
// });

// app.get('/movies/director/:directorName', (req, res) => {
//     const { directorName } = req.params;
//     //  This is called object destructuring.
//     const director = topMovies.find(movie => movie.Director === directorName).Director;

//     if (director){
//         res.status(200).json(director);
//     }else{
//         res.status(404).send("Director asked for not found!")
//     }
// });






mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});


// GET/READ request in mongoose
app.get('/', (req,res) => {
    res.send('Welcome to MyFlix!');
});

app.get('/documentation', (req, res) => {                  
    res.sendFile('public/documentation.html', { root: __dirname });
});

// get all movies
app.get('/movies', passport.authenticate('jwt', {session:false}),(req,res) => {
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

// get director details
// app.get('/movies/director/:directorName', (req,res) => {
//     Movies.findOne({'Director.Name':req.params.directorName})
//     .then((movie) => {
//         res.status(201).json(movie.Director);
//     })
//     .catch((err) => {
//         console.error(err);
//         res.status(500).send('Error:' + err);
//     });
// });

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

// get all users
app.get('/users', (req,res) => {
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
app.post('/users', (req,res) => {
    Users.findOne({Username: req.body.Username})
    .then((user) => {
        if (user) {
            return res.status(400).send(req.body.Username + 'already exists');   
        } else {
            Users.create ({
                Username: req.body.Username,
                Password: req.body.Password,
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
app.post('/movies', (req,res) => {
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

app.put('/users/:Username', passport.authenticate('jwt', {session:false}), (req,res) => {
    Users.findOneAndUpdate({Username:req.params.Username},
        {$set:
            {
                Username: req.body.Username,
                Password: req.body.Password,
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

app.listen(5500, () => {
    console.log('Your app is listening on port 5500.');
  });