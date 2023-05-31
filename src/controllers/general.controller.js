const qs = require("qs");

const BaseController = require('./base.controller');
const generalModel = require('../models/general.model');

class GeneralController extends BaseController {

    async getDataByForm(req, res) {
        const buffers = [];
        for await (const chunk of req) {
            buffers.push(chunk);
        }
        const data = Buffer.concat(buffers).toString();
        return qs.parse(data);
    }

    async getLoginPage(req, res) {
        let html = await this.readFileData('./src/views/General/Login.html');
        res.writeHead(200, {'Content-type': 'text/html'});
        res.write(html);
        res.end();
    }

    async loginToPage(req, res) {
        let user = await this.getDataByForm(req, res);
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

    async getRegisterPage(req, res) {
        let html = await this.readFileData('./src/views/General/Register.html');
        res.writeHead(200, {'Content-type': 'text/html'});
        res.write(html);
        res.end();
    }

    async getNotFoundPage(req, res) {
        let html = await this.readFileData('./src/views/General/NotFound.html');
        res.writeHead(404, {'Content-type': 'text/html'});
        res.write(html);
        res.end();
    }
}

module.exports = new GeneralController;