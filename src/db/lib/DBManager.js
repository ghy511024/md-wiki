/**
 * Created by ghy on 2017/10/9.
 */
let mydb;
let MongoClient = require('mongodb').MongoClient;
let f = require('util').format;
let DBConf = require("./Conf");

const manager = {
    getUrl: function () {
        let config = DBConf.getConf();
        let dbUser = encodeURIComponent(config.dbUser);
        let passwd = encodeURIComponent(config.passwd);
        return f('mongodb://%s:%s@' + config.dbAttr + ':' + config.dbPort + '/' + config.dbName + '?authMechanism=%s',
            dbUser, passwd, config.authMechanism||'DEFAULT');
    },
    // 获取db 链接
    getDB: function () {
        let _this = this;
        return new Promise(function (resolve, reject) {
            if (mydb != null) {
                return resolve(mydb);
            } else {
                MongoClient.connect(_this.getUrl(), function (err, db) {
                    if (err == null) {
                        mydb = db;
                        resolve(db);
                    } else {
                        reject(err);
                    }
                });
            }
        })
    },
    //
    close: function () {

    }
}

module.exports = manager;