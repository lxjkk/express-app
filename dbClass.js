var mysql = require('mysql')
var dbconfig = require('./db.config')
var pool = mysql.createPool(dbconfig)

class db {
    constructor(arg) {
        
    }
    // pool连接池链接
    poolConnect(callback) {
        pool.getConnection(function(err, connection){
            if (err) {
                console.log('链接失败');
                return;
            }
            callback(connection)
            pool.releaseConnection(connection);
        })
    }
    // 普通查询
    query(sql, params) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function(err, connection){
                if (err) {
                    console.log('链接失败');
                    reject(err)
                    return;
                }
                connection.query(sql, params, (err, rows) => {
                    if (err) {
                        console.log('查询失败');
                        reject(err)
                    }
                    resolve(rows)
                })
                pool.releaseConnection(connection);
            })
        })
        
    }
    
}

export default db