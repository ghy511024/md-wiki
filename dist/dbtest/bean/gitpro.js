"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fmongo = require("fmongo");
const Page = fmongo.BaseBean({
    _id: String,
    parent: String,
    doc: String,
    name: String,
    space_id: String
});
exports.default = Page;
//# sourceMappingURL=gitpro.js.map