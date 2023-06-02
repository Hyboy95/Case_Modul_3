const BaseController = require('./base.controller');
const productModel = require('./../models/product.model');
const userModel = require('./../models/user.model');
class AdminController {
    static async handlerAdmin(req, res) {
        if (req.method === "GET") {
            let html = await BaseController.readFileData('./src/views/Admin/AdminHomePage.html');
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(html);
            res.end();
        }
    }
    static async handlerUserByAdmin(req, res) {
        if (req.method === "GET") {
            let users = await userModel.getAllUser();
            let newHtml = '';
            users.forEach((user) => {

                newHtml += `<tr>`;
                newHtml += `<td>${user.userID}</td>`;
                newHtml += `<td>${user.name}</td>`;
                newHtml += `<td>${(user.username)}</td>`;
                newHtml += `<td>${user.email}</td>`;
                newHtml += `<td>${user.phone}</td>`;
                newHtml += `<td>${user.address}</td>`;
                newHtml += `<td><button >Sửa</button>
                         <button>Xóa</button></td>`;
            })
            let html = await BaseController.readFileData('./src/views/admin/userManager.html');
            html = html.replace('{user-data}', newHtml);
            res.writeHead(200, {'Content-Type':'text/html'});
            res.write(html);
            res.end();
        }
    }


    static async handlerProductByAdmin(req, res) {
        if (req.method === "GET") {
            let products = await productModel.getAllProduct();
            let newHtml = '';
            products.forEach((product) => {
                newHtml += `<tr>`;
                newHtml += `<td>${product.pID}</td>`;
                newHtml += `<td>${product.pName}</td>`;
                newHtml += `<td>${parseInt(product.pPrice).toLocaleString()}</td>`;
                newHtml += `<td>${product.pQuantity}</td>`;
                newHtml += `<td>${product.pSize}</td>`;
                newHtml += `<td><button>Sửa</button>
                         <button>Xóa</button></td>`;
            })

            let html = await BaseController.readFileData('./src/views/admin/productManager.html');
            html = html.replace('{product-data}', newHtml);
            res.writeHead(200, {'Content-Type':'text/html'});
            res.write(html);
            res.end();
        }
    }
}

module.exports = AdminController;
