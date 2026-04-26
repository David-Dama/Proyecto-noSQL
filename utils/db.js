const mongoose = require('mongoose');

const urlDb = 'mongodb://localhost:27017/proyecto-movies';

const connect = async () => {
    try {
        await mongoose.connect(urlDb);
        console.log('DB conectada');
    } catch (error) {
        console.log('Error DB');
    }
};

module.exports = { connect };