const BaseController = require('./base.controller');

class NotFoundController extends BaseController {
    // async getStaticFile(req, res, filePath) {
    //     try {
    //         await super.getStaticFile(req, res, filePath);
    //     } catch (err) {
    //         res.writeHead(404, {'Content-Type': 'text/plain'});
    //         res.write('404 Not Found');
    //         res.end();
    //     }
    // }

    async getNotFoundPage(req, res) {
        let html = await this.getTemplate('./src/views/NotFound.html');
        res.writeHead(404, {'Content-type': 'text/html'});
        res.write(html);
        res.end();
    }
}

module.exports = new NotFoundController;