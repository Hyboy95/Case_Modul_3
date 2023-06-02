const BaseModel = require("./base.model");
class UserModel extends BaseModel {
    async getAllUser () {
        let sql = `SELECT * FROM Account WHERE role = 0`;
        return await this.querySql(sql);
    }
}
module.exports = new UserModel();