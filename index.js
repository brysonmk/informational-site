const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url + '.html';

    // If the requested URL is '/', set filePath to 'index.html'
    if (filePath === './.html') {
        filePath = './index.html';
    }

    // Read the file and serve the content
    fs.readFile(filePath, (err, content) => {
        if (err) {
            // If the file is not found, serve the 404.html page
            fs.readFile('./404.html', (err, notFoundContent) => {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(notFoundContent);
            });
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        }
    });
});

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
