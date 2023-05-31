const fs = require("fs");

class BaseController {
    static readFileData(pathFile) {
        return new Promise((resolve, reject) => {
            fs.readFile(pathFile, 'utf8', (err, data) => {
                if (err) {
                    reject(err.message)
                }
                resolve(data);
            })
        })
    }
}

module.exports = BaseController;