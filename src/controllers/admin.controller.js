const BaseController = require('./base.controller');

class AdminController {
    static async handlerAdmin(req, res) {
        if (req.method === "GET") {
            let html = await BaseController.readFileData('./src/views/Admin/AdminHomePage.html');
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(html);
            res.end();
        }
    }
}

module.exports = AdminController;
