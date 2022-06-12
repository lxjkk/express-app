var mysql = require('mysql')
var dbconfig = require('./db.config')
var pool = mysql.createPool(dbconfig)
console.log(dbconfig);
var db = {
    escape: function(param) {
        return mysql.escape(param)
    },
    pool: (callback) => {
        pool.getConnection(function(err, connection){
            if (err) {
                console.log('链接失败');
            }
            callback(connection)
            pool.releaseConnection(connection);
        })
    },
    query: function(sql, params, callback) {
        console.log('sql语句', sql)
        // 每次使用的时候需要创建连接
        if (callback) {
            db.pool((connection)=> {
            connection && connection.query(sql, params, function(err,results,fields) {
                if (err) {
                    console.log('数据操作失败');
                    if (!callback) {
                        return Promise.reject('数据操作失败')
                    }
                    return
                }
                if (callback) {callback(results, fields && fields)}
                else {
                    return Promise.resolve(results)
                } 
            })
        })
        } else {
            return new Promise((resolve, reject) => {
                db.pool((connection)=> {
                    connection && connection.query(sql, params, function(err,results,fields) {
                        if (err) {
                            console.log('数据操作失败');
                            return reject('数据操作失败')
                        }
                        return resolve(results)
                    })
                })
            })
        }
        
    },
    token: function (token, callback) {
        var sql = 'select * from users where token='+ mysql.escape(token)
        console.log(sql);
        if (callback) {
            db.pool((connection)=> {
                connection.query(sql, [], function(err,results,fields) {
                    if (err) {
                        console.log('数据操作失败');
                        throw err
                    }
                    if (results.length) {
                        delete results[0].token
                    }
                    callback && callback(results[0] || false);
                })
            })
            return
        }
        return new Promise((resolve, reject) => {
            db.pool((connection)=> {
                connection.query(sql, [], function(err,results,fields) {
                    if (err) {
                        console.log('数据操作失败');
                        reject(err)
                        return
                    }
                    if (results.length) {
                        delete results[0].token
                    }
                    console.log('22223',results);
                    resolve(results[0] || false);
                })
            })
        })
    },
    find: function (tab, obj, callback) {
        var sql = `select * from ${tab} where`
        for (var key in obj) {
            sql += ` ${key}=${db.escape(obj[key])} and`
        }
        sql = sql.substr(0, sql.length - 3)
        console.log(sql);
        db.pool((connection)=> {
            connection.query(sql, [], function(err,results,fields) {
                if (err) {
                    console.log('数据操作失败');
                    throw err
                }
                callback && callback(results);
            })
        })
    },
    update: function (tab, obj, callback) {
        var param1 = ''
        var param2 = ''
        console.log(111);
        if (obj.get && obj.set) {
            for (var keyParam1 in obj.get) {
                param1 += ` ${keyParam1}=${db.escape(obj.get[keyParam1])}, `
            }
            for (var keyParam2 in obj.set) {
                param2 += ` ${keyParam2}=${db.escape(obj.set[keyParam2])}, `
            }
            param1 = param1.substr(0, param1.length - 2)
            param2 = param2.substr(0, param2.length - 2)
        } else {
            throw false
        }
        var sql = `update ${tab} set ${param2} where ${param1}`
        console.log(111,sql);
        db.pool((connection)=> {
            connection.query(sql, [param2,param1], function(err,results,fields) {
                if (err) {
                    console.log('数据操作失败');
                    throw err
                }
                callback && callback(results);
            })
        })
    },
    insert: function(tab, obj,callback) {
        var param1 = Object.keys(obj).toString()
        var param2 = Object.values(obj).map(function (item) {
            return item = mysql.escape(item)
        }).toString()
        var sql = `insert into ${tab}(${param1}) value(${param2})`
        console.log(111,sql);
        db.pool((connection)=> {
            connection.query(sql, [param2,param1], function(err,results,fields) {
                if (err) {
                    console.log('数据操作失败');
                    throw err
                }
                callback && callback(results);
            })
        })
    },
    del: function(tab, obj,callback) {
        var sql = `delete from  ${tab} where`
        for (var key in obj) {
            sql += ` ${key}=${db.escape(obj[key])} and`
        }
        sql = sql.substr(0, sql.length - 3)
        db.pool((connection)=> {
            connection.query(sql, [], function(err,results,fields) {
                if (err) {
                    console.log('数据操作失败');
                    throw err
                }
                callback && callback(results);
            })
        })
    }
}
module.exports = db