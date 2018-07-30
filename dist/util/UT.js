const RT = {
    result: function (code) {
        let ret = {};
        if (this.DESC[code] == null) {
            ret = {
                code: code,
                desc: '未知错误',
            };
        }
        else {
            ret = {
                code: code,
                desc: this.DESC[code],
            };
        }
        return ret;
    },
    getDesc: function (code) {
        return this.DESC[code];
    },
    SUCCESS: 0,
    SYSERR: 35100,
    PARAMETER_ERR: 36101,
    PAGE_HAS_CHILD: 36201,
    DB_DELETE_ERR: 36301,
    USER_NOT_EXIST: 35202,
    DESC: {
        0: '成功',
        36100: '系统错误',
        36101: '参数错误',
        36201: '当前页面存在子节点',
        36301: '删除失败',
    },
};
module.exports = RT;
//# sourceMappingURL=UT.js.map