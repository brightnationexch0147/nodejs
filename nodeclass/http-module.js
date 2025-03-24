const http = require('http')
const fs = require('fs')

const intro = fs.readFileSync('./intro.html')

const server = http.createServer((req, res) => {
    const url = req.url
    if (url === '/'){
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end(intro)
    }else if (url === '/about'){
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end('<h1>About Page</h1>')
    }else{
        res.writeHead(404, {'Content-Type': 'text/html'})
        res.end('<h1>Error Page</h1>')
    }
}) 

const port = 4030

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})