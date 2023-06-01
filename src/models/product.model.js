const BaseModel = require("./base.model");
class ProductModel extends BaseModel {
    async getAllProduct () {
        let sql = `SELECT * FROM product order by pPrice`;
        return await this.querySql(sql);
    }

    async getSearchProduct (searchValue) {
        let sql = `SELECT * FROM product WHERE pName like '%${searchValue}%' order by pPrice`;
        return await this.querySql(sql);
    }

    async getProductByType (type) {
        let sql = `SELECT * FROM product WHERE pCode = ${parseInt(type)} order by pPrice`;
        return await this.querySql(sql);
    }
    async getProductByPrice (minPrice, maxPrice) {
        let sql = `SELECT * FROM product WHERE pPrice BETWEEN ${parseInt(minPrice)} AND ${parseInt(maxPrice)} order by pPrice`;
        return await this.querySql(sql);
    }
    async getProductBySize (minSize, maxSize) {
        let sql = `SELECT * FROM product WHERE pSize BETWEEN ${parseInt(minSize)} AND ${parseInt(maxSize)} order by pPrice`;
        return await this.querySql(sql);
    }
}

module.exports = new ProductModel();