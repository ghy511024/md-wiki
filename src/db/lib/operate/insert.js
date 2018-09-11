/**
 * Created by ghy on 2017/10/9.
 */
let manager = require('../DBManager');

function insert(collectionName, jsonobj) {

    let insertpromise = new Promise(function (resolve, reject) {
        manager.getDB().then(function (db) {
            // 校验数据
            let dbobj = jsonobj;
            try {
                if (typeof dbobj == "string") {
                    dbobj = JSON.parse(jsonobj);
                }
            }
            catch (e) {
                return reject(e);
            }
            var collection = db.collection(collectionName);
            var o = {w: 1};
            o.serializeFunctions = true;
            collection.insertOne(dbobj, o).then(function (item) {
                let ret = item.result.ok === 1;
                return resolve(ret);
            }).catch(function (err) {
                console.error("db insert err", err)
                return resolve(false);
            })
        }).catch(function (err) {
            console.error("db connect err", err)
            return resolve(false);
        })
    })
    return insertpromise
}
module.exports = insert;