'use strict'

let Brewery = require("./models/brewery.js");

const express = require("express");
const app = express();
let bodyParser = require("body-parser");


app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/views')); // allows direct navigation to static files
app.use(require("body-parser").urlencoded({extended: true})); // parse form submissions
app.use(bodyParser.json());
app.use('/api', require('cors')()); // set Access-Control-Allow-Origin header for api route
// set template engine
let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html', defaultLayout: 'main' }));
app.set("view engine", ".html");
// list all breweries
app.get('/', (req,res) => {
    Brewery.find((err,brewery) => {
        if (err) return next(err);
        res.render('home', {breweries: JSON.stringify(brewery) });
    })
});
app.get('/about', function(req,res){
 res.type('text/html');
 res.render('about');
});
// handle GET
app.get('/details', (req,res) => {
    Brewery.findOne({ name:req.query.name }, (err, brewery) => {
        if (err) return next(err);
        res.render('details', {result: brewery} );
    });
});
// return all items
app.get('/api/breweries', (req,res, next) => {
    Brewery.find((err,results) => {
        if (err || !results) return next(err);
        res.json(results);
    });
});
// return one item
app.get('/api/brewery/:name', (req,res, next) => {
  let string = req.params.name.toLowerCase();
  Brewery.findOne({ name:string }, (err, result) => {
      if (err || !result) return next(err);
      res.json( result );
  });
});
app.post('/api/details', (req,res, next) => {
    let string = req.body.name.toLowerCase();
    Brewery.findOne({ name:string }, (err, result) => {
        if (err || !result) return next(err);
        res.json( result );
    });
  });
// delete one item
app.get('/api/delete/:id', (req,res, next) => {
    Brewery.remove({"_id":req.params.id }, (err, result) => {
        if (err) return next(err);
        // return # of items deleted
        res.json({"deleted": result.result.n});
    });
});
app.post('/api/delete/', (req,res, next) => {
    Brewery.remove({"name":req.body.name }, (err, result) => {
        if (err) return next(err);
        // return # of items deleted
        res.json({"deleted": result.result.n});
    });
});
// add one item
app.get('/api/add/:name/:address/:city/:state/:zip/:founded', (req,res, next) => {
    // find & update existing item, or add new
    let name = req.params.name;
    Brewery.update({ name: name}, {name:name, address: req.params.address, city: req.params.city, state: req.params.state, zip:req.params.zip, founded: req.params.founded}, {upsert: true }, (err, result) => {
        if (err) return next(err);
        // nModified = 0 for new item, = 1+ for updated item
        res.json({updated: result.nModified});
    });
});
app.post('/api/add/', (req,res, next) => {
    // find & update existing item, or add new
    if (!req.body._id) { // insert new document
        let brewery = new Brewery({name:req.body.name, address:req.body.address, city:req.body.city, state: req.body.state, zip: req.body.zip, founded: req.body.founded});
        brewery.save((err,newBrewery) => {
            if (err) return next(err);
            console.log(newBrewery)
            res.json({updated: 0, _id: newBrewery._id});
        });
    } else { // update existing document
        Brewery.updateOne({ _id: req.body._id}, {name:req.body.name, address:req.body.address, city:req.body.city, state: req.body.state, zip: req.body.zip, founded: req.body.founded}, (err, result) => {
            if (err) return next(err);
            res.json({updated: result.nModified, _id: req.body._id});
        });
    }
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
