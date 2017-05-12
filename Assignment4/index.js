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
app.get('/', (req,res) => {
 res.type('text/html');
 res.sendFile(__dirname + '/public/home.html');
});

// handle GET
app.get('/delete', (req,res) => {
    let result = brewery.delete(req.query.brewery); // delete brewery object
    res.render('delete', {brewery: req.query.brewery, result: result});
});

app.post('/add', (req,res) => {
  let newBrewery = {"name": req.body.name, "address": req.body.address, "city": req.body.city, "zip": req.body.zip, "founded": req.body.founded }; // add to the brewery array
  //var add = brewery.add(newBrewery);
  //res.render("add", {brewery: newBrewery, result: add});
  let found = brewery.add(newBrewery);
  res.render("add", {brewery: req.body.name, result: found});
});

// handle POST
app.post('/get', (req,res) => {
    let string = req.body.name.toLowerCase();
    let found = brewery.get(string);
    res.render("details", {brewery: string, result: found});
});


// define 404 handler
app.use((req,res) => {
 res.type('text/plain');
 res.status(404);
 res.send('404 - Not found');
});

// send plain text response
app.get('/about', (req,res) => {
 res.type('text/plain');
 res.send('About page');
});

app.listen(app.get('port'), () => {
 //console.log('Express started');
});
