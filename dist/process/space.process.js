"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseDatalayer = require('fmongo/src/lib/BaseDatalayer.js');
const space_1 = require("../bean/space");
class SpaceProcess extends BaseDatalayer {
    constructor(collname, T) {
        super(collname, T);
    }
}
module.exports = new SpaceProcess("space", space_1.default);
//# sourceMappingURL=space.process.js.map