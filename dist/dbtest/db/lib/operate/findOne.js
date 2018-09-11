let manager = require('../DBManager');
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
                console.error("db find err", err);
                return resolve();
            });
        }).catch(function (e) {
            console.error("db connect err", e);
            return resolve();
        });
    });
    return findPromise;
}
module.exports = findOne;
//# sourceMappingURL=findOne.js.map