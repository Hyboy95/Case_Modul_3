const BaseController = require('./base.controller');

class NotFoundController extends BaseController {
    async getNotFoundPage(req, res) {
        let html = await this.getTemplate('./src/views/NotFound.html');
        res.writeHead(404, {'Content-type': 'text/html'});
        res.write(html);
        res.end();
    }
}

module.exports = new NotFoundController;