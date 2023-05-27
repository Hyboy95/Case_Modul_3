const http = require('http');
const url = require('url');
const homeController = require('./src/controllers/home.controller');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
    const pathUrl = url.parse(req.url).pathname;

    switch (pathUrl) {
        case '/':
            homeController.getHomePage(req, res).catch(err => {
                console.log(err.message);
            })
            break;
        default:
            const filePath = path.join(__dirname, 'src/views', pathUrl);
            homeController.getStaticFile(req, res, filePath).catch(err => {
                console.log(err.message);
            });
            break;
    }
})

server.listen(PORT, 'localhost', () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
})