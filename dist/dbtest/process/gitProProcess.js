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
const gitpro_1 = require("../bean/gitpro");
const RT = require('../util/RT');
const path = require('path');
const fs = require('fs');
const page_1 = require("../bean/page");
const GIT_WORKSPACE = path.join(__dirname, "../../../git_wrokspace");
const GitTool = require('../util/GitTool.js');
const Gtool = new GitTool(GIT_WORKSPACE);
const PageProcess = require('./pageProcess');
const SpaceProcess = require('./spaceProcess');
class GitProProcess extends BaseDatalayer {
    constructor(collname, T) {
        super(collname, T);
    }
    mdsync(gitname, giturl, commitId, space_id) {
        return new Promise(function (resolve, reject) {
            return __awaiter(this, void 0, void 0, function* () {
                let ret = 0, redmePath, doc, _id, space_id, has_wiki = false;
                let wiki_path;
                let git_path = path.join(GIT_WORKSPACE, gitname);
                if (!gitname || !giturl) {
                    ret = RT.PARAMETER_ERR;
                }
                console.log("开始", ret);
                if (ret == 0) {
                    let tmp_ret = Gtool.gitInit(gitname, giturl, commitId);
                    if (tmp_ret != 0) {
                        ret = -1;
                    }
                    if (ret == 0) {
                        redmePath = path.join(git_path, "README.md");
                        if (!fs.existsSync(redmePath)) {
                            ret = -2;
                        }
                    }
                    if (ret == 0) {
                        let space = yield SpaceProcess.getOneByCond({ name: "pro" });
                        if (!space) {
                            ret = -3;
                        }
                        else {
                            space_id = space._id;
                        }
                        if (!space_id) {
                            ret = -10;
                        }
                    }
                    if (ret == 0) {
                        var page = yield PageProcess.getOneByCond({ name: gitname, space_id: space_id });
                        if (!!page && page._id) {
                            _id = page._id;
                            let list = (yield PageProcess.getList({ parent: _id })) || [];
                            console.log("list size", list.length);
                            for (let i = 0; i < list.length; i++) {
                                yield PageProcess.delete(list[i]._id);
                            }
                        }
                        else {
                            _id = (+new Date()) + "";
                        }
                        if (!_id) {
                            ret = -6;
                        }
                    }
                    console.log("数据预处理完毕", ret);
                    if (ret == 0) {
                        let doc = fs.readFileSync(redmePath, "utf-8");
                        let page = new page_1.default({
                            _id: _id,
                            parent: "root",
                            doc: doc,
                            name: gitname,
                            space_id: space_id
                        });
                        let b = yield PageProcess.update(_id, page, true);
                        if (!b) {
                            ret = RT.DB_UPDATE_ERR;
                        }
                    }
                    console.log("readme 同步完毕", ret);
                    if (ret == 0) {
                        wiki_path = path.join(git_path, "wiki");
                        if (fs.existsSync(wiki_path)) {
                            has_wiki = true;
                        }
                    }
                    if (ret == 0 && has_wiki) {
                        let array = fs.readdirSync(path.join(git_path, "wiki"));
                        console.log("array length", array == null, array.length);
                        let save_array = [];
                        if (!!array) {
                            for (let i = 0; i < array.length; i++) {
                                console.log(array[i], "文件");
                                let doc = fs.readFileSync(path.join(wiki_path, array[i]), "utf-8");
                                let page = new page_1.default({
                                    _id: (+new Date()) + "",
                                    parent: _id,
                                    doc: doc,
                                    name: array[i],
                                    space_id: space_id
                                });
                                save_array.push(page);
                            }
                            for (let i = 0; i < save_array.length; i++) {
                                let b = yield PageProcess.update(save_array[i]._id, save_array[i], true);
                            }
                        }
                    }
                    console.log("wiki 同步完毕", ret);
                }
                resolve(ret);
            });
        });
    }
    redDirFile() {
    }
}
module.exports = new GitProProcess("gitpro", gitpro_1.default);
//# sourceMappingURL=gitProProcess.js.map