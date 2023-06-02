const qs = require("qs");
const url = require("url");
const fs = require('fs');

const BaseController = require('./base.controller');
const productModel = require('./../models/product.model');
const GeneralController = require("./general.controller");

class AdminController {
    static async handlerAdmin(req, res) {
        try {
            if (req.method === "GET") {
                let html = await BaseController.readFileData('./src/views/Admin/AdminHomePage.html');
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(html);
                res.end();
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    static async handlerProductByAdmin(req, res) {
        try {
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
                    newHtml += `<td><a href='/admin/productManager/updateProduct?id=${product.pID}'><button type="button" class="btn btn-primary">Chi Tiết</button></a>
                  <button type="button" class="btn btn-danger">Xóa</button></td>`;
                })
                let html = await BaseController.readFileData('./src/views/admin/productManager.html');
                html = html.replace('{product-data}', newHtml);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(html);
                res.end();
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    static async updateProductByAdmin(req, res) {
        let id = qs.parse(url.parse(req.url).query).id;
        if (id && req.method === "GET") {
            let productDataArray = await productModel.getInfoProductByID(id);
            let productInfo = productDataArray[0][0];
            let html = await BaseController.readFileData('./src/views/admin/updateProduct.html');
            html = html.replace('{pImg}', `<img src="${productInfo.pImg}" alt="Profile" class="rounded-circle"></img>`);
            html = html.replace('{productName1}', `${productInfo.pName}`);
            html = html.replace('{productDescribe}', `${productInfo.pdesc}`);
            html = html.replace('{productID}', `${productInfo.pID}`);
            html = html.replace('{productName2}', `${productInfo.pName}`);
            html = html.replace('{productType}', `${productInfo.pCode}`);
            html = html.replace('{productPrice}', `${parseInt(productInfo.pPrice).toLocaleString()}`);
            html = html.replace('{productQuantity}', `${productInfo.pQuantity}`);
            html = html.replace('{productSize}', `${productInfo.pSize}`);
            html = html.replace('{productNameUpdate}', `<input name="pName" type="text" class="form-control" id="pName" value="${productInfo.pName}">`);
            html = html.replace('{producTypeUpdate}', `<option selected value="${productInfo.pCode}">${productInfo.typeName}</option>`);
            html = html.replace('{productDescribeUpdate}', `${productInfo.pdesc}`);
            html = html.replace('{productPriceUpdate}', `<input name="pPrice" type="text" class="form-control" id="pPrice"value="${productInfo.pPrice}">`);
            html = html.replace('{productQtyUpdate}', `<input name="pQuantity" type="number" class="form-control" id="pQuantity" value="${productInfo.pQuantity}">`);
            html = html.replace('{productSizeUpdate}', `<input name="pSize" type="text" class="form-control" id="pSize" value="${productInfo.pSize}">`);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(html);
            res.end();
        } else if (req.method === "POST") {
            try {
                let data = await GeneralController.getDataByForm(req, res);
                let {pImg, pName, pCode, pDesc, pPrice, pQuantity, pSize} = data;
                if (pImg === '') {
                    await productModel.getProductImgByID(id).then(data => {
                        pImg = data[0].pImg
                        console.log(data[0].pImg)
                    });
                } else {
                    pImg = '/assets/img/productImage/' + pImg;
                }
                await productModel.updateProduct(id, pName, pCode, pDesc, pPrice, pQuantity, pSize, pImg);
                res.writeHead(301, {location: '/admin/productManager'});
                res.end();
            } catch (err) {
                console.log(err.message);
            }
        } else {
            await GeneralController.getNotFoundPage(req, res);
        }
    }
}

module.exports = AdminController;