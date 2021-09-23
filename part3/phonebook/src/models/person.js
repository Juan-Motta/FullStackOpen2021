const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

// for using this app change the url variable to a valid url from your mongo app like mongodb+srv://<user>:<password>@<mongo_url>
const url = process.env.MONGODB_URI;

console.log('Connecting to MongoDB...');

mongoose.connect(url)
    .then(result => {
        console.log('Connected to MongoDB succesfully');
    })
    .catch(err => {
        console.log('Connection to MongoDB failed');
    });

const personSchema = new mongoose.Schema({
    name: String,
    number: String
});

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
});

module.exports = mongoose.model('Person', personSchema);