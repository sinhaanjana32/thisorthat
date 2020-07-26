const mongoose = require('mongoose');


require('dotenv').config();

mongoose.set('debug', true); // it will show debug in console
mongoose.Promise = global.Promise; // it allow us to handle promises like async js
mongoose.connect(process.env.MONGODB_URI || process.env.DB_CONNECT,{ 
    useNewUrlParser: true }, ()=>console.log('connected to DB'));

module.exports.User = require('./user');
module.exports.Poll = require('./poll');

//process.env.MONGODB_URI ||
//mongoose.connect('mongodb://localhost/vote');