/**
 * Created by ghy on 2017/10/9.
 */


const update = require('./operate/update');
const insert = require('./operate/insert');
const findOne = require('./operate/findOne');
const getList = require('./operate/getList');
const remove = require('./operate/delete');
// const User = require('../test/real/User');

class BaseDatalayer {
    constructor(collname, T) {
        this.collname = collname;
        this.T = T;
        this.cache = {};
    }

    /**
     * 插入
     * @param T {T}
     * @return {Promise}
     */
    insert(T) {
        if (T instanceof this.T) {
            let jsondom = T.toJSON();
            return insert(this.collname, jsondom);
        } else {
            return new Promise(function (resolve, reject) {
                console.error("bean type err");
                resolve(false);
            });
        }
    }

    /**
     * 更新
     * @param _id {String}
     * @param T {T}
     * @param upsert {Boolean}
     * @return {Promise}
     */
    update(_id, T, upsert) {
        if (T instanceof this.T) {
            let jsondom = T.toJSON();
            return update(this.collname, _id, jsondom, upsert);
        } else {
            return new Promise(function (resolve, reject) {
                console.error("bean type err");
                resolve(false);
            });
        }
    }

    // todo 后续实现
    updateMany(query, update_option, upsert) {
        // return updateMany(this.collname, query, update_option);
    }

    // todo 后续实现
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
        } else {
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
        return new Promise(async function (reslove, reject) {
            let T = _this.cache[_id];
            if (T == null) {
                T = await _this.getOneByid(_id);
                _this.cache[_id] = T;
            }
            reslove(T);
        });
    }

    /**
     * @param option {Object} 查询条件
     * @param sort {Object} 排序
     * @param skip {Integer} 起始位置 默认 0
     * @param limit {Integer} 查询条数 默认 1000
     */
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
        } catch (e) {

        }
        return retstr;
    }
}

module.exports = BaseDatalayer;
