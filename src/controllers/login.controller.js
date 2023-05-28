const BaseController = require('./base.controller');
const loginModel = require('./../models/login.model');
const qs = require("qs");

class LoginController extends BaseController {
    async getLoginPage(req, res) {
        let html = await this.getTemplate('./src/views/Login.html');
        res.writeHead(200, {'Content-type': 'text/html'});
        res.write(html);
        res.end();
    }

    async loginToPage(req, res) {
        const buffers = [];
        for await (const chunk of req) {
            buffers.push(chunk);
        }
        const data = Buffer.concat(buffers).toString();
        const user = qs.parse(data);
        const username = user.username;
        const password = user.password;
        const isAdmin = await loginModel.loginAdmin(username, password);
        if (isAdmin) {
            console.log('Login success!');
            res.writeHead(301, {location: '/admin'});
            res.end();
        } else {
            console.log('Login fail!');
            res.writeHead(301, {location: '/login'})
            res.end()
        }
    }
}

module.exports = new LoginController;