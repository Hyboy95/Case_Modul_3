const qs = require('qs');
const url = require("url");

const BaseController = require('./base.controller');
const GeneralController = require('./../controllers/general.controller');
const ProductController = require('./../controllers/product.controller');
const productModel = require('./../models/product.model');

class HomeController {
    static async getBasePage(req, res, func, link) {
        let query = qs.parse(url.parse(req.url).query);
        let products = await func;
        let html = await BaseController.readFileData('./src/views/General/Home.html');
        let htmlReplace = await ProductController.getListProduct(query.page ? query.page : 1, products);
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
        res.writeHead(200, {'Content-type': 'text/html'});
        res.write(html);
        res.end();
    }

    static async handlerHomePage(req, res) {
        if (req.method === "GET") {
            let getAllProducts = productModel.getAllProduct();
            await HomeController.getBasePage(req, res, getAllProducts, '?page=')
        } else {
            let searchValue = await GeneralController.getDataByForm(req, res);
            let getSearchProduct = productModel.getSearchProduct(searchValue.search);
            await HomeController.getBasePage(req, res, getSearchProduct, '?page=');
        }
    }

    static async handlerFilterProductByType(req, res) {
        let query = qs.parse(url.parse(req.url).query);
        if (query.type && req.method === 'GET') {
            let type = qs.parse(url.parse(req.url).query).type;
            let getProductFilterByType = productModel.getProductByType(type);
            await HomeController.getBasePage(req, res, getProductFilterByType, `filter?type=${type}&page=`);
        } else if (query.minprice && req.method === 'GET') {
            let minPrice = qs.parse(url.parse(req.url).query).minprice;
            let maxPrice = qs.parse(url.parse(req.url).query).maxprice;
            let getProductFilterByPrice = productModel.getProductByPrice(minPrice, maxPrice);
            await HomeController.getBasePage(req, res, getProductFilterByPrice, `filter?minprice=${minPrice}&maxprice=${maxPrice}&page=`);
        } else if (query.minsize && req.method === 'GET') {
            let minSize = qs.parse(url.parse(req.url).query).minsize;
            let maxSize = qs.parse(url.parse(req.url).query).maxsize;
            let getProductFilterBySize = productModel.getProductBySize(minSize, maxSize);
            await HomeController.getBasePage(req, res, getProductFilterBySize, `filter?minsize=${minSize}&maxsize=${maxSize}&page=`);
        }
    }
}

module.exports = HomeController;