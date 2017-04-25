'use strict'

let brewery = require("./lib/brewery.js");

const express = require("express");
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/views')); // allows direct navigation to static files
app.use(require("body-parser").urlencoded({extended: true})); // parse form submissions

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

// send static file as response
app.get('/', function(req,res){
 res.type('text/html');
 res.sendFile(__dirname + '/public/home.html');
});

// handle GET
app.get('/delete', function(req,res){
    let result = brewery.delete(req.query.brewery); // delete brewery object
    res.render('delete', {brewery: req.query.brewery, result: result});
});

// handle POST
app.post('/get', function(req,res){
    var string = req.body.brewery.toLowerCase()
    var found = brewery.get(string);
    res.render("details", {brewery: string, result: found});
});

// define 404 handler
app.use(function(req,res) {
 res.type('text/plain');
 res.status(404);
 res.send('404 - Not found');
});

// send plain text response
app.get('/about', function(req,res){
 res.type('text/plain');
 res.send('About page');
});

app.listen(app.get('port'), function() {
 console.log('Express started');
});
