const http = require('http');
const url = require('url');
const fs = require('fs');
const qs = require('qs');

const homeController = require('./src/controllers/home.controller');
const generalController = require('./src/controllers/general.controller');

const PORT = 3000;

handlers = {};

handlers.home = (req, res) => {
    if (req.method === "GET") {
        homeController.getHomePage(req, res).catch(err => {
            console.log(err.message);
        })
    } else {
        homeController.getSearchProductHomePage(req, res).catch(err => {
            console.log(err.message);
        })
    }
}

handlers.login = (req, res) => {
    if (req.method === 'GET') {
        generalController.getLoginPage(req, res).catch(err => {
            console.log(err.message);
        })
    } else {
        generalController.loginToPage(req, res).catch(err => {
            console.log(err.message);
        })
    }
}

handlers.register = (req, res) => {
    if (req.method === 'GET') {
        generalController.getRegisterPage(req, res).catch(err => {
            console.log(err.message);
        })
    }
}

handlers.notfound = (req, res) => {
    generalController.getNotFoundPage(req, res).catch(err => {
        console.log(err.message);
    })
}

handlers.homeFilter = (req, res) => {
    let query = qs.parse(url.parse(req.url).query);
    if (query.type && req.method === 'GET') {
        homeController.getFilterProductByType(req, res).catch(err => {
            console.log(err.message);
        })
    }
}

router = {
    '/': handlers.home,
    '/login': handlers.login,
    '/register': handlers.register,
    '/filter': handlers.homeFilter
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

server.listen(PORT, 'localhost', () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
})
