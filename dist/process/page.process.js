"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseDatalayer = require('fmongo/src/lib/BaseDatalayer.js');
const page_1 = require("../bean/page");
var remark = require('remark');
var guide = require('remark-preset-lint-markdown-style-guide');
var html = require('remark-html');
var report = require('vfile-reporter');
class PageProcess extends BaseDatalayer {
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
                }
                else {
                    resolve(file);
                }
            });
        });
    }
    getNavs(space_id, space_name) {
        return __awaiter(this, void 0, void 0, function* () {
            var list = yield this.getList({ space_id: space_id });
            var map = {};
            for (var i = 0; i < list.length; i++) {
                map[list[i]._id] = {
                    _id: list[i]._id,
                    name: list[i].name || list[i]._id,
                    type: "page-nav",
                    parent: list[i].parent || "root"
                };
            }
            var root = {
                _id: space_name,
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
            return root;
        });
    }
}
module.exports = new PageProcess("page", page_1.default);
//# sourceMappingURL=page.process.js.map