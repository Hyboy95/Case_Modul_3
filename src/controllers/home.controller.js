const qs = require('qs');
const url = require("url");

const BaseController = require('./base.controller');
const generalController = require('./../controllers/general.controller');
const productController = require('./../controllers/product.controller');
const productModel = require('./../models/product.model');

class HomeController extends BaseController {
    async getBasePage (req, res, func, link) {
        let query = qs.parse(url.parse(req.url).query);
        let products = await func;
        let html = await this.readFileData('./src/views/General/Home.html');
        let htmlReplace = await productController.getListProduct(query.page ? query.page : 1, products);
        let newHtml = htmlReplace.listProducts;
        let totalPages = htmlReplace.numPage;
        let paginationHtml = '';
        for (let i = 1; i <= totalPages; i++) {
            paginationHtml += `<li class="page-item"></li>`;
            paginationHtml += `<a class="page-link" href="${link}${i}">${i}</a>`;
            paginationHtml += `</li>`;
        }
        html = html.replace('{list-product}', newHtml);
        html = html.replace('{pagin}', paginationHtml);
        res.writeHead(200, { 'Content-type': 'text/html' });
        res.write(html);
        res.end();
    }
    async getHomePage(req, res) {
        let getAllProducts = productModel.getAllProduct();
        await this.getBasePage(req, res, getAllProducts, '?page=')
    }

    async getSearchProductHomePage(req, res) {
        let searchValue = await generalController.getDataByForm(req, res);
        let getSearchProduct = productModel.getSearchProduct(searchValue.search);
        await this.getBasePage(req, res, getSearchProduct, '?page=');
    }

    async getFilterProductByType(req, res){
        let type = qs.parse(url.parse(req.url).query).type;
        let getProductFilterByType = productModel.getProductByType(type);
        await this.getBasePage(req, res, getProductFilterByType, `?filter=${type}&page=`);
    }
}

module.exports = new HomeController;