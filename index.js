

const express = require('express'),
morgan = require('morgan');
const app = express();
app.use(morgan('common'));
app.use('/documentation.html', express.static('public'));

let topMovies = [
    {
        title: 'Panther Panchali',
        director: 'Satyajit Ray'
    },
    {
        title: '8 Below',
        director: 'Frank Marshall' 
    },
    {
        title: 'Kung Fu Panda',
        creator: 'Ethan Reiff, Cyrus Voris'
    },
    {
        title: 'Love Actually',
        director: 'Richard Curtis'
    },
    {
        title: 'Titanic',
        director: 'James Cameron'
    },
    {
        title: 'Joker (2019)',
        director: 'Todd Phillips'
    },
    {
        title: 'Avengers:Endgame',
        directors: 'Anthony Russo, Joe Russo'
    },
    {
        title: 'Hachikō',
        director: 'Lasse Hallström'
    },
    {
        title: 'Rang De Basanti',
        director: 'Rakeysh Omprakash Mehra'
    },
    {
        title: 'Swades',
        director: 'Ashutosh Gowariker'
    }
];





// GET requests
app.get('/', (req,res) => {res.send('Welcome to myFlix!');});

app.get('/movies', (req,res) => {res.json(topMovies);});


// error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');;
});

app.listen(5500, () => {
    console.log('Your app is listening on port 5500.');
  });