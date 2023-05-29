const fs = require("fs");
const path = require('path');

class BaseController {
    getTemplate(pathFile) {
        return new Promise((resolve, reject) => {
            fs.readFile(pathFile, 'utf8', (err, data) => {
                if (err) {
                    reject(err.message)
                }
                resolve(data);
            })
        })
    }

    // getStaticFile(req, res, filePath) {
    //     return new Promise((resolve, reject) => {
    //         fs.readFile(filePath, (err, data) => {
    //             if (err) {
    //                 reject(err);
    //             } else {
    //                 let contentType = 'text/plain';
    //                 if (path.extname(filePath) === '.css') {
    //                     contentType = 'text/css';
    //                 } else if (path.extname(filePath) === '.js') {
    //                     contentType = 'text/javascript';
    //                 } else if (path.extname(filePath) === '.png') {
    //                     contentType = 'image/png';
    //                 } else if (path.extname(filePath) === '.jpg' || path.extname(filePath) === '.jpeg') {
    //                     contentType = 'image/jpeg';
    //                 }
    //                 res.writeHead(200, { 'Content-Type': contentType });
    //                 res.write(data);
    //                 res.end();
    //                 resolve();
    //             }
    //         });
    //     })
    // }
}

module.exports = BaseController;