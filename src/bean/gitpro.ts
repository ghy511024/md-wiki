/**
 * Created by gonghongyu on 2018/7/19.
 */
const fmongo = require("fmongo");

const Page = fmongo.BaseBean({
    _id: String,
    parent: String,
    doc: String,
    name: String,
    space_id: String
});

export default Page;