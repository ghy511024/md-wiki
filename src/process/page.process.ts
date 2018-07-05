/**
 * Created by cyl on 2018/7/6.
 */

var remark = require('remark');
var guide = require('remark-preset-lint-markdown-style-guide');
var html = require('remark-html');
var report = require('vfile-reporter');

class PageProcess {

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
module.exports =new PageProcess();