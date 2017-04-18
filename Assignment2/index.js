'use strict'

var http = require("http"), fs = require('fs'), qs = require("querystring");
let book = require("./lib/book.js");

function serveStatic(res, path, contentType, responseCode){
  if(!responseCode) responseCode = 200;
    console.log(__dirname + path)
  fs.readFile(__dirname + path, function(err, data){
      if(err){
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error');
      }
      else{
        res.writeHead(responseCode, {'Content-Type': contentType});
        res.end(data);
      }
  });
}

http.createServer((req,res) => {
  let url = req.url.split("?");  // seperate route from query string
  let params = qs.parse(url[1]); // convert query string to object
  let path = url[0].toLowerCase();

  switch(path) {
    case '/': 
      serveStatic(res, '/public/home.html', 'text/html');
      break;
    case '/about':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('About');
      break;
    case '/search':
      let found = book.get(params.title); // get book object
      res.writeHead(200, {'Content-Type': 'text/plain'});
      let results = (found) ? JSON.stringify(found) : "No records found";
      res.end('Searching for ' + params.title + "\n" + results);
      break;
    case '/delete':
      let removed = book.delete(params.title)    
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('The book ' + params.title + ' has been removed.' + JSON.stringify(removed)); 
      break;
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('404:Page not found.');
  }
  
}).listen(process.env.PORT || 3000);