/**
 * Created by cyl on 2018/7/6.
 */
const fmongo = require('fmongo');
const Page = require('../bean/page');


var remark = require('remark');
var guide = require('remark-preset-lint-markdown-style-guide');
var html = require('remark-html');
var report = require('vfile-reporter');

class PageProcess extends fmongo.BaseDatalayer {

    constructor(collname, T) {
        super(collname, T);
    }

    getHtmlByMd(mdstr) {
        return new Promise(function (resolve, reject) {
            remark()
                .use(guide)
                .use(html)
                .process(mdstr, function (err, file) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(file);
                    }

                });
        })
    }
}
module.exports = new PageProcess("page", Page);// dbtest 是表名