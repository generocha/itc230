var http = require("http"),
    fs = require("fs");
http.createServer(function(req,res){
var path = req.url.toLowerCase();
switch(path){
    case '/':
        fs.readFile(__dirname + '/public/index.html', function(err,data){
            if(err){
               res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 - internal error');
               }else{
                 res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);   
               }  
        });
        
        break;
    case '/about':
        fs.readFile(__dirname + '/public/about.html', function(err,data){
            if(err){
               res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 - internal error');
               }else{
                 res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);   
               }  
        });
        
        break;
    default:
        res.writeHead(404,{ 'Content-Type': 'text/plain' });
        res.end('The URL '+ req.url +' is not found!');
        break;
        }
}).listen(3000);