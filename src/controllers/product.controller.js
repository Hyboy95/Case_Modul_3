const BaseController = require('./base.controller');
const productModel = require('./../models/product.model');
class ProductController extends BaseController {
    async getListProduct(page, numberPerPage = 12) {
        let products = await productModel.getAllProduct();
        let startIndex = (parseInt(page) - 1) * numberPerPage;
        let endIndex = page * numberPerPage;
        let paginatedProducts = products.slice(startIndex, endIndex);
        let newHtml = '';
        paginatedProducts.forEach((product) => {
            newHtml += `<div class="col-md-3 mb-5">`;
            newHtml += `<div class="card h-100">`;
            newHtml += `<img class="card-img-top" src="${product.pImg}" alt="...">`;
            newHtml += `<div class="card-body p-4">`;
            newHtml += `<div class="text-center">`;
            newHtml += `<p class="fw-bolder">${product.pName}</p>${parseInt(product.price).toLocaleString()} VNĐ`;
            newHtml += `</div>
                        </div>
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="/login">Add To Cart</a></div>
                        </div>
                    </div>
                </div>`
        })
        let totalPages = Math.ceil(products.length / numberPerPage);
        let paginationHtml = '';
        for (let i = 1; i <= totalPages; i++) {
            paginationHtml += `<li class="page-item"></li>`;
            paginationHtml += `<a class="page-link" href="?page=${i}">${i}</a>`;
            paginationHtml += `</li>`;
        }
        return {
            listProducts: newHtml,
            paginationData: paginationHtml
        }
    }
}

module.exports = new ProductController();