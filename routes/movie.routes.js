const express = require('express');
const Movie = require('../models/Movie');

const router = express.Router();


// GET todos
router.get('/', async (req, res, next) => {
    try {
        const movies = await Movie.find();
        return res.json(movies);
    } catch (error) {
        next(error);
    }
});


// GET por id
router.get('/:id', async (req, res, next) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json('No encontrada');
        }

        return res.json(movie);
    } catch (error) {
        next(error);
    }
});


// POST crear
router.post('/', async (req, res, next) => {
    try {
        const newMovie = new Movie(req.body);

        const created = await newMovie.save();

        return res.status(201).json(created);
    } catch (error) {
        next(error);
    }
});


// PUT editar
router.put('/:id', async (req, res, next) => {
    try {
        const updated = await Movie.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // devuelve actualizado
        );

        return res.json(updated);
    } catch (error) {
        next(error);
    }
});


// DELETE
router.delete('/:id', async (req, res, next) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);
        return res.json('Película eliminada');
    } catch (error) {
        next(error);
    }
});

module.exports = router;