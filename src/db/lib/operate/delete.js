/**
 * Created by ghy on 2017/10/9.
 */

let manager = require('../DBManager');

function remove(collectionName, _id, o) {

    let delpromise = new Promise(function (resolve, reject) {
        manager.getDB().then(function (db) {
            var collection = db.collection(collectionName);
            collection.findOneAndDelete({_id: _id}, o).then(function (r) {
                // console.log(r.value.b)
                // console.log(r.lastErrorObject.n)
                resolve(true);
            }).catch(function (err) {
                console.error("db delete err", err)
                return resolve(false);
            })
        }).catch(function (e) {
            console.error("db connect err", e)
            return resolve(false);
        })
    })
    return delpromise
}
module.exports = remove;