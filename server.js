const http = require('http');
const url = require('url');
const path = require('path');

const homeController = require('./src/controllers/home.controller');
const loginController = require('./src/controllers/login.controller');

const PORT = 3000;

const server = http.createServer((req, res) => {
    const pathUrl = url.parse(req.url).pathname;
    switch (pathUrl) {
        case '/':
            let currentPage = 1;
            homeController.getHomePage(req, res, currentPage).catch(err => {
                console.log(err.message);
            })
            break;
        case '/login':
            if (req.method === 'GET') {
                loginController.getLoginPage(req, res).catch(err => {
                    console.log(err.message);
                })
            } else {
                loginController.loginToPage(req, res).catch(err => {
                    console.log(err.message);
                })
            }
            break;
        case '/admin':
            res.end();
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
