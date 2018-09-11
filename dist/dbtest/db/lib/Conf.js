let dbconf = {};
module.exports = {
    setConf: function (conf) {
        dbconf = Object.assign({}, conf);
    },
    getConf: function () {
        return dbconf;
    }
};
//# sourceMappingURL=Conf.js.map