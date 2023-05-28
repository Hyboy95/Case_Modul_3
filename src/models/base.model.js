const database = require("./database.model");

class BaseModel {
    constructor() {
        this.connect = database.connect();
    }

    querySql(sql) {
        return new Promise((resolve, reject) => {
            this.connect.query(sql, (err, data) => {
                if (err) {
                    reject(err.message);
                }
                resolve(data);
            })
        })
    }
    async testConnection() {
        const sql = 'SELECT 1 AS result';
        try {
            const data = await this.querySql(sql);
            console.log('Connection to database is successful!');
            console.log('Result:', data);
        } catch (error) {
            console.error('Error connecting to database:', error);
        } finally {
            this.connect.end();
        }
    }
}

module.exports = BaseModel;