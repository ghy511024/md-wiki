/**
 * Created by ghy on 2017/10/9.
 */


let manager = require('../DBManager');

function update(collectionName, _id, jsonobj, upsert) {
    let updatepromise = new Promise(function (resolve, reject) {
        manager.getDB().then(function (db) {
            let dbobj = jsonobj;
            let upobj = {};
            try {
                if (typeof dbobj == "string") {
                    dbobj = JSON.parse(jsonobj);
                }
            }
            catch (e) {
                return reject(e);
            }
            upobj["$set"] = dbobj;
            delete dbobj._id;
            var collection = db.collection(collectionName);
            var o = {w: 1};
            if (upsert != null) {
                o["upsert"] = upsert;
            }
            o.serializeFunctions = true;
            collection.updateOne({_id: _id}, upobj, o).then(function (r) {
                let b = r.result.n === 1;
                return resolve(b);
            }).catch(function (err) {
                console.error("db update err", err)
                return resolve(false);
            })
        }).catch(function (e) {
            console.error("db connect err", e)
            return resolve(false);
        })
    })
    return updatepromise
}

module.exports = update;