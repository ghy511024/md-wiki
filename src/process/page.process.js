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

    async getNavs(_id) {
        var list = await this.getList();
        var map = {}
        for (var i = 0; i < list.length; i++) {
            map[list[i]._id] = {
                _id: list[i]._id,
                name: list[i].name || list[i]._id,
                type: "page-nav",
                parent: list[i].parent || "root"
            };
        }
        var root = {
            _id: "root",
            isopen: true,
            type: "page-nav"
        };

        function addNode(node_id, parent_id) {
            var parent = map[parent_id] || root;
            parent.children = parent.children || [];
            parent.children.push(map[node_id]);
        }

        for (var i = 0; i < list.length; i++) {
            addNode(list[i]._id, list[i].parent);
        }
        map[_id].active = true;
        var pid = _id;
        while (map[pid]) {
            map[pid].isopen = true;
            pid = map[pid].parent;
        }
        return root;
    }
}
module.exports = new PageProcess("page", Page);// dbtest 是表名