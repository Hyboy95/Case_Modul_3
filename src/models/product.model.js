const BaseModel = require("./base.model");
class ProductModel extends BaseModel {
    async getAllProduct () {
        let sql = `SELECT * FROM product`;
        return await this.querySql(sql);
    }

    async getSearchProduct (searchValue) {
        let sql = `SELECT * FROM product WHERE pName like '%${searchValue}%'`;
        return await this.querySql(sql);
    }

    async getProductByType (type) {
        let sql = `SELECT * FROM product WHERE pCode = ${parseInt(type)}`;
        return await this.querySql(sql);
    }
}

module.exports = new ProductModel();