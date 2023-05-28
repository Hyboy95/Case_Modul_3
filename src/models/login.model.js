const BaseModel = require("./base.model");
class LoginModel extends BaseModel {
    async loginAdmin (username, password) {
        let sql = `CALL getAdminInfo('${username}', '${password}')`;
        const result = await this.querySql(sql);
        return result[0].length > 0;
    }
}

module.exports = new LoginModel();