const mongoose = require('mongoose');
const Movie = require('../models/Movie');

const movies = [
    { title: 'The Matrix', director: 'Wachowski', year: 1999, genre: 'Acción' },
    { title: 'Interestelar', director: 'Christopher Nolan', year: 2014, genre: 'Ciencia ficción' }
];

const movieDocs = movies.map(m => new Movie(m));

mongoose.connect('mongodb://localhost:27017/proyecto-movies')
    .then(async () => {
        await Movie.collection.drop().catch(() => {});
        await Movie.insertMany(movieDocs);
        console.log('🌱 Seed hecha');
    })
    .catch(err => console.log(err))
    .finally(() => mongoose.disconnect());