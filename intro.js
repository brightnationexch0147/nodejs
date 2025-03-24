const http = require('http');

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/txt');
    res.end('Hello, World!\n');
})

port = 3000
server.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});