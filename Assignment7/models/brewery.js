let credentials = require("../lib/credentials.js");
let mongoose = require('mongoose');
let options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } } };
mongoose.connect(credentials.connectionString, options);

let conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));

// define Brewery model in JSON key/value pairs
// values indicate the data type of each key
let mySchema = mongoose.Schema({
 name: String,
 address: String,
 city: String,
 state: String,
 zip: String,
 founded: String,
});

module.exports = mongoose.model('Brewery', mySchema);
