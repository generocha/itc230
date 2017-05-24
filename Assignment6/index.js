'use strict'

let Brewery = require("./models/brewery.js");

const express = require("express");
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/views')); // allows direct navigation to static files
app.use(require("body-parser").urlencoded({extended: true})); // parse form submissions

// set template engine
let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html', defaultLayout: 'main' }));
app.set("view engine", ".html");
// list all breweries
app.get('/', (req,res) => {
    Brewery.find((err,brewery) => {
        if (err) return next(err);
        res.render('home', {breweries: brewery });
    })
});
app.get('/about', function(req,res){
 res.type('text/html');
 res.render('about');
});
// handle POST
app.post('/details', (req,res) => {
    var string = req.body.name.toLowerCase();
    Brewery.findOne({ name:string }, (err, brewery) => {
        if (err) return next(err);
        var found = brewery;
        if(!brewery){
          var found = string;
        }
        res.render('details', {result: found});
    });
});
// handle GET
app.get('/details', (req,res) => {
    Brewery.findOne({ name:req.query.name }, (err, brewery) => {
        if (err) return next(err);
        res.render('details', {result: brewery} );
    });
});
app.get('/delete', (req,res) => {
    Brewery.remove({ name:req.query.brewery }, (err, result) => {
        if (err) return next(err);
        let deleted = result.result.n !== 0; // n will be 0 if no docs deleted
        Brewery.count((err, total) => {
            res.type('text/html');
            res.render('delete', {brewery: req.query.brewery, deleted: result.result.n !== 0, total: total } );
        });
    });
});

app.post('/add', function(req,res){
  var string = req.body.name.toLowerCase();
  Brewery.findOne({ name:string }, (err, brewery) => {
      if (err) return next(err);
      var found = brewery;
      if(!brewery){
        new Brewery({name: req.body.name, address: req.body.address, city: req.body.city, state: req.body.state, zip: req.body.zip, founded: req.body.founded}).save();
        var newBrewery = string;
      }
      res.render('details', {result: found, added: newBrewery});
  });
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
