let manager = require('../DBManager');
function remove(collectionName, _id, o) {
    let delpromise = new Promise(function (resolve, reject) {
        manager.getDB().then(function (db) {
            var collection = db.collection(collectionName);
            collection.findOneAndDelete({ _id: _id }, o).then(function (r) {
                resolve(true);
            }).catch(function (err) {
                console.error("db delete err", err);
                return resolve(false);
            });
        }).catch(function (e) {
            console.error("db connect err", e);
            return resolve(false);
        });
    });
    return delpromise;
}
module.exports = remove;
//# sourceMappingURL=delete.js.map