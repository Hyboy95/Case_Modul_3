const qs = require("qs");

const BaseController = require('./base.controller');
const generalModel = require('../models/general.model');

class GeneralController {

    static async getDataByForm(req, res) {
        const buffers = [];
        for await (const chunk of req) {
            buffers.push(chunk);
        }
        const data = Buffer.concat(buffers).toString();
        return qs.parse(data);
    }

    static async handlerLoginPage(req, res) {
        if (req.method === "GET") {
            let html = await BaseController.readFileData('./src/views/General/Login.html');
            res.writeHead(200, {'Content-type': 'text/html'});
            res.write(html);
            res.end();
        } else {
            let user = await GeneralController.getDataByForm(req, res);
            let username = user.username;
            let password = user.password;
            let isAdmin = await generalModel.loginAdmin(username, password);
            if (isAdmin) {
                console.log('Login success!');
                res.writeHead(301, {location: '/admin'});
                res.end();
            } else {
                console.log('Login fail!');
                res.writeHead(301, {location: '/login'})
                res.end();
            }
        }
    }

    static async handlerRegister(req, res) {
        if (req.method === "GET") {
            let html = await BaseController.readFileData('./src/views/General/Register.html');
            res.writeHead(200, {'Content-type': 'text/html'});
            res.write(html);
            res.end();
        }
    }

    static async getNotFoundPage(req, res) {
        let html = await BaseController.readFileData('./src/views/General/NotFound.html');
        res.writeHead(404, {'Content-type': 'text/html'});
        res.write(html);
        res.end();
    }
}

module.exports = GeneralController;