const qs = require('qs');
const url = require('url');

const BaseController = require('./base.controller');
const productModel = require('./../models/product.model');
class ProductController {
    static async getListProduct(page, func) {
        let products = await func;
        let startIndex = (parseInt(page) - 1) * 12;
        let endIndex = page * 12;
        let paginatedProducts = products.slice(startIndex, endIndex);
        let newHtml = '';
        paginatedProducts.forEach((product) => {
            newHtml += `<div class="col-md-3 mb-5">`;
            newHtml += `<div class="card h-100">`;
            newHtml += `<img class="card-img-top" src="${product.pImg}" alt="...">`;
            newHtml += `<div class="card-body p-4">`;
            newHtml += `<div class="text-center">`;
            newHtml += `<p class="fw-bolder">${product.pName}</p>`;
            newHtml += `<p class="fw-bolder">Size: ${product.pSize}cm</p>`;
            newHtml += `<p class="fw-bolder">${parseInt(product.pPrice).toLocaleString()} VNĐ</p>`;
            newHtml += `</div>
                        </div>
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="/login">Thêm vào giỏ hàng</a></div>
                        </div>
                    </div>
                </div>`
        })
        let totalPages = Math.ceil(products.length / 12);
        return {
            listProducts: newHtml,
            numPage: totalPages
        }
    }
    static async getBasePage(req, res, func, link, filePath) {
        let query = qs.parse(url.parse(req.url).query);
        let products = await func;
        let html = await BaseController.readFileData(filePath);
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
}

module.exports = ProductController;