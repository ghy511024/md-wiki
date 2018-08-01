/**
 * Created by ghy on 2018/7/30.
 * @desc 业务组，也可以叫空间，每个空间含有独立域名
 */
const fmongo = require("fmongo");

const Space = fmongo.BaseBean({
    _id: String,
    name: String,
    desc: String,
    isDelete: Boolean
});

export default Space;