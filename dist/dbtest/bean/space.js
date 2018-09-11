"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fmongo = require("fmongo");
const Space = fmongo.BaseBean({
    _id: String,
    name: String,
    desc: String,
    isDelete: Boolean
});
exports.default = Space;
//# sourceMappingURL=space.js.map