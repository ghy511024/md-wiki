/**
 * Created by ghy on 2017/10/11.
 */
let manager = require('../DBManager');

/**
 * 查询一条数据
 * @param collectionName<string> 表名
 * @param condition<object> 查询条件
 * @param fileds<object> 需要返回的字段
 * @returns {Promise}
 */
function findOne(collectionName, condition, fileds) {

    let findPromise = new Promise(function (resolve, reject) {
        manager.getDB().then(function (db) {

            var collection = db.collection(collectionName);
            var o = {};
            if (fileds != null && typeof fileds == "object") {
                o["fields"] = fileds;
            }
            collection.findOne(condition, o).then(function (item) {
                return resolve(item);
            }, function (err) {
                console.error("db find err", err)
                return resolve();
            })
        }).catch(function (e) {
            console.error("db connect err", e)
            return resolve();
        })
    })
    return findPromise
}
module.exports = findOne;