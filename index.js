const express = require('express');
const { connect } = require('./utils/db');
const movieRoutes = require('./routes/movie.routes');

connect();

const server = express();
const PORT = 3000;

// IMPORTANTE para POST/PUT
server.use(express.json());

server.use('/movies', movieRoutes);

// 404
server.use((req, res, next) => {
    const error = new Error('Route not found');
    error.status = 404;
    next(error);
});

// errores
server.use((error, req, res, next) => {
    return res.status(error.status || 500).json(error.message || 'Error');
});

server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});