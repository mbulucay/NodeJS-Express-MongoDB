const http = require('http');
const hostname = 'localhost';
const port = 3000;

const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {

    console.log(`Req for ${req.url} by method ${req.method}`);
    if(req.method == 'GET'){
        
        var fileUrl;
        if(req.url == '/') fileUrl = '/index.html'
        else fileUrl = req.url;

        var filePath = path.resolve('./public' + fileUrl);
        const fileExtension = path.extname(filePath);

        if(fileExtension == '.html'){

            fs.access(filePath, fs.constants.F_OK, (err) =>{
                if(err){
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end('<html><body><h1>Error 404: ' + fileUrl + 
                                ' not found</h1></body></html>');
                    return;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                fs.createReadStream(filePath).pipe(res);
            });

        }else{
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end(`<h1>Error 404</h1><br> <h3>${fileUrl} not an html file</h3>`) 
        }

    }else{
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end(`<h1>Error 404</h1><br> <h3>${req.method} not supporting</h3>`) 
    }
});

server.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}`)
});
