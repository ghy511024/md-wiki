/**
 * Created by cyl on 2018/7/6.
 */
// const fmongo = require('fmongo/src/lib/BaseDatalayer');

const BaseDatalayer = require('fmongo/src/lib/BaseDatalayer.js');
import Space from '../bean/space'


class SpaceProcess extends BaseDatalayer {

    constructor(collname, T) {
        super(collname, T);
    }
}

module.exports = new SpaceProcess("space", Space);