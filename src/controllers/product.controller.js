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
            newHtml += `<p class="fw-bolder">${parseInt(product.pPrice).toLocaleString()} VNĐ</p>`;
            newHtml += `<p class="fw-bolder">Size: ${product.pSize}cm</p>`;
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
}

module.exports = ProductController;