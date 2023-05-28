const BaseModel = require("./base.model");
class ProductModel extends BaseModel {
    async getAllProduct () {
        let sql = `SELECT * FROM product`;
        return await this.querySql(sql);
    }
}

module.exports = new ProductModel();