const BaseController = require('./base.controller');
const productController = require('./../controllers/product.controller')
const qs = require('qs');
class HomeController extends BaseController {


    async getHomePage(req, res) {
        let query = qs.parse(req.url.split("?")[1]);
        let html = await this.getTemplate('./src/views/Home.html');
        let htmlReplace = await productController.getListProduct(query.page ? query.page : 1);
        let newHtml = htmlReplace.listProducts;
        let paginationHtml = htmlReplace.paginationData;
        html = html.replace('{list-product}', newHtml);
        html = html.replace('{pagin}', paginationHtml);
        res.writeHead(200, { 'Content-type': 'text/html' });
        res.write(html);
        res.end();
    }
}

module.exports = new HomeController;