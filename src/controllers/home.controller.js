const BaseController = require('./base.controller');
const productController = require('./../controllers/product.controller')
class HomeController extends BaseController {
    // async getStaticFile(req, res, filePath) {
    //     try {
    //         await super.getStaticFile(req, res, filePath);
    //     } catch (err) {
    //         res.writeHead(404, {'Content-Type': 'text/plain'});
    //         res.write('404 Not Found');
    //         res.end();
    //     }
    // }

    async getHomePage(req, res, currentPage) {
        let html = await this.getTemplate('./src/views/Home.html');
        let htmlReplace = await productController.getListProduct(currentPage);
        let newHtml = htmlReplace.listProducts;
        let paginationHtml = htmlReplace.paginationData;
        html = html.replace('{list-product}', newHtml);
        html = html.replace('{pagination}', paginationHtml);
        res.writeHead(200, {'Content-type': 'text/html'});
        res.write(html);
        res.end();
    }
}

module.exports = new HomeController;