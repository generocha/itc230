'use strict'

let brewery = require("./lib/brewery.js");

const express = require("express");
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/views')); // allows direct navigation to static files
app.use(require("body-parser").urlencoded({extended: true})); // parse form submissions

// set template engine
let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html', defaultLayout: 'main' }));
app.set("view engine", ".html");


// send static file as response
app.get('/', function(req,res) {
    res.render('home', {breweries: brewery.getAll() });    
});
app.get('/about', function(req,res){
 res.type('text/html');
 res.render('about');
});
// handle POST
app.post('/details', function(req,res){
	res.type('text/html');
    var string = req.body.name.toLowerCase();
    var found = brewery.get(string);
    res.render('details', {brewery: string, result: found});
});
// handle GET
app.get('/details', function(req,res){
	res.type('text/html');
    var string = req.query.name.toLowerCase();
    var found = brewery.get(string);
    res.render('details', {brewery: string, result: found});
});
app.get('/delete', function(req,res){
    let result = brewery.delete(req.query.brewery); // delete brewery object
    res.render('delete', {brewery: req.query.brewery, result: result});
});

app.post('/add', function(req,res){
  let newBrewery = {"brewery": req.body.name, "address": req.body.address, "city": req.body.city, "zip": req.body.zip, "founded": req.body.founded }; // add to the brewery array
  //var add = brewery.add(newBrewery);
  //res.render("add", {brewery: newBrewery, result: add});
  var found = brewery.add(newBrewery);
  res.render("add", {brewery: req.body.name, result: found});
});
// define 404 handler
app.use(function(req,res) {
 res.type('text/plain');
 res.status(404);
 res.send('404 - Not found');
});
app.listen(app.get('port'), function() {
 console.log('Express started');
});