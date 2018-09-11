var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const update = require('./operate/update');
const insert = require('./operate/insert');
const findOne = require('./operate/findOne');
const getList = require('./operate/getList');
const remove = require('./operate/delete');
class BaseDatalayer {
    constructor(collname, T) {
        this.collname = collname;
        this.T = T;
        this.cache = {};
    }
    insert(T) {
        if (T instanceof this.T) {
            let jsondom = T.toJSON();
            return insert(this.collname, jsondom);
        }
        else {
            return new Promise(function (resolve, reject) {
                console.error("bean type err");
                resolve(false);
            });
        }
    }
    update(_id, T, upsert) {
        if (T instanceof this.T) {
            let jsondom = T.toJSON();
            return update(this.collname, _id, jsondom, upsert);
        }
        else {
            return new Promise(function (resolve, reject) {
                console.error("bean type err");
                resolve(false);
            });
        }
    }
    updateMany(query, update_option, upsert) {
    }
    insertMany(array) {
        let b = true;
        for (let i = 0; i < array.length; i++) {
            if (!array[i] instanceof this.T) {
                b = false;
                break;
            }
        }
        if (b) {
            return insertMany(this.collname, array);
        }
        else {
            return new Promise(function (resolve, reject) {
                resolve(false);
            });
        }
    }
    getOneByCond(cond) {
        return findOne(this.collname, cond);
    }
    getOneByid(_id) {
        let cond = {
            _id: _id,
        };
        return findOne(this.collname, cond);
    }
    getOneByCache(_id) {
        let _this = this;
        return new Promise(function (reslove, reject) {
            return __awaiter(this, void 0, void 0, function* () {
                let T = _this.cache[_id];
                if (T == null) {
                    T = yield _this.getOneByid(_id);
                    _this.cache[_id] = T;
                }
                reslove(T);
            });
        });
    }
    getList(option, sort, skip, limit) {
        return getList(this.collname, option, sort, skip, limit);
    }
    findAndModify() {
    }
    getCount() {
    }
    delete(_id) {
        return remove(this.collname, _id);
    }
    getReplicaStatus() {
    }
    objtoString(classobj) {
        let tmp = {};
        let retstr;
        for (let key in classobj) {
            if (typeof classobj[key] != 'function') {
                if (!this.Null(classobj[key])) {
                    tmp[key] = classobj[key];
                }
            }
        }
        try {
            retstr = JSON.stringify(tmp);
        }
        catch (e) {
        }
        return retstr;
    }
}
module.exports = BaseDatalayer;
//# sourceMappingURL=BaseDatalayer.js.map