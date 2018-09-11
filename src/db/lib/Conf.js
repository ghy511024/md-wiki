/**
 * Created by ghy on 2018/6/11.
 */
let dbconf = {}

module.exports = {
    setConf: function (conf) {
        dbconf = Object.assign({}, conf)
    },
    getConf: function () {
        return dbconf;
    }
}