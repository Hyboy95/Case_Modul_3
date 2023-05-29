const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const qs = require('qs');

const notFoundController = require('./src/controllers/notfound.controller');
const homeController = require('./src/controllers/home.controller');
const loginController = require('./src/controllers/login.controller');

const PORT = 3000;

handlers = {};

handlers.home = (req, res) => {
    let currentPage = 1;
        homeController.getHomePage(req, res, currentPage).catch(err => {
        console.log(err.message);
    })
}

handlers.login = (req, res) => {
    if (req.method === 'GET') {
        loginController.getLoginPage(req, res).catch(err => {
            console.log(err.message);
        })
    } else {
        loginController.loginToPage(req, res).catch(err => {
            console.log(err.message);
        })
    }
}
handlers.notfound = (req, res) => {
    notFoundController.getNotFoundPage(req, res).catch(err => {
        console.log(err.message);
    })
}

router = {
    '/': handlers.home,
    '/login': handlers.login
};

let mimeTypes={
    'jpeg': 'images/jpeg',
    'jpg' : 'images/jpg',
    'png' : 'images/png',
    'js' :'text/javascript',
    'css' : 'text/css',
    'svg':'image/svg+xml',
    'ttf':'font/ttf',
    'woff':'font/woff',
    'woff2':'font/woff2',
    'eot':'application/vnd.ms-fontobject'
};

const server = http.createServer(async(req, res)=>{
    let urlPath = url.parse(req.url).pathname;
    const filesDefences = urlPath.match(/\.js|\.css|\.png|\.svg|\.jpg|\.jpeg|\.ttf|\.woff|\.woff2|\.eot/);
    if (filesDefences) {
        const extension = mimeTypes[filesDefences[0].toString().split('.')[1]];
        res.writeHead(200, {'Content-Type': extension});
        fs.createReadStream(__dirname  + req.url).pipe(res)
    } else {
        let chosenHandler = (typeof (router[urlPath]) !== 'undefined') ? router[urlPath] : handlers.notfound;
        chosenHandler(req, res);
    }
})

// const server = http.createServer((req, res) => {
//     const pathUrl = url.parse(req.url).pathname;
//     switch (pathUrl) {
//         case '/':
//             let currentPage = 1;
//             homeController.getHomePage(req, res, currentPage).catch(err => {
//                 console.log(err.message);
//             })
//             break;
//         case '/login':
//             if (req.method === 'GET') {
//                 loginController.getLoginPage(req, res).catch(err => {
//                     console.log(err.message);
//                 })
//             } else {
//                 loginController.loginToPage(req, res).catch(err => {
//                     console.log(err.message);
//                 })
//             }
//             break;
//         case '/admin':
//             res.end();
//             break;
//         default:
//             const filePath = path.join(__dirname, 'src/views', pathUrl);
//             homeController.getStaticFile(req, res, filePath).catch(err => {
//                 console.log(err.message);
//             });
//             break;
//     }
// })

server.listen(PORT, 'localhost', () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
})
