let manager = require('../DBManager');
function getList(collectionName, option, sort, skip, limit) {
    let getListpromise = new Promise(function (resolve, reject) {
        skip = Number(skip) || 0;
        limit = Number(limit) || 1000;
        manager.getDB().then(function (db) {
            var collection = db.collection(collectionName);
            let s = [];
            if (sort != null) {
                for (let key in sort) {
                    let tmp = [];
                    tmp[0] = key;
                    tmp[1] = sort[key];
                    s.push(tmp);
                }
            }
            collection.find(option).sort(s).skip(skip).limit(limit).toArray().then(function (docs) {
                return resolve(docs);
            }, function (err) {
                console.error("db getlist err", err);
                return resolve();
            });
        }).catch(function (e) {
            console.error("db connect err", e);
            return resolve(false);
        });
    });
    return getListpromise;
}
module.exports = getList;
//# sourceMappingURL=getList.js.map