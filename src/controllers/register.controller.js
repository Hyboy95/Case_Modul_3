const BaseController = require('./base.controller');

class RegisterController extends BaseController {
    async getRegisterPage(req, res) {
        let html = await this.getTemplate('./src/views/Register.html');
        res.writeHead(200, {'Content-type': 'text/html'});
        res.write(html);
        res.end();
    }
}

module.exports = new RegisterController;