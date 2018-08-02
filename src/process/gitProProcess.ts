/**
 * Created by ghy on 2018/8/2.
 */

const BaseDatalayer = require('fmongo/src/lib/BaseDatalayer.js');
import GitPro from '../bean/gitpro'

const RT = require('../util/RT');
const path = require('path');
const fs = require('fs');
import Page from '../bean/page'

const GIT_WORKSPACE = path.join(__dirname, "../../../git_wrokspace");
const GitTool = require('../util/GitTool.js');
const Gtool = new GitTool(GIT_WORKSPACE);

const PageProcess = require('./pageProcess');
const SpaceProcess = require('./spaceProcess');

class GitProProcess extends BaseDatalayer {

    constructor(collname, T) {
        super(collname, T);
    }

    /**
     * 同步git 项目到文档中
     *
     * */
    mdsync(gitname, giturl, commitId, space_id) {
        return new Promise(async function (resolve, reject) {
            let ret = 0, redmePath, doc, _id, space_id, has_wiki = false;
            let wiki_path;
            let git_path = path.join(GIT_WORKSPACE, gitname);
            if (!gitname || !giturl) {
                ret = RT.PARAMETER_ERR;
            }
            console.log("开始", ret);
            if (ret == 0) {
                // 初始化git 项目
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
                if (ret == 0) {// 找到pro空间的 _id;
                    let space = await SpaceProcess.getOneByCond({name: "pro"});
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
                if (ret == 0) {// 如果数据库中存在，则批量删除原有的数据
                    var page = await PageProcess.getOneByCond({name: gitname, space_id: space_id});
                    if (!!page && page._id) {
                        _id = page._id;
                        let list = await PageProcess.getList({parent: _id}) || [];
                        console.log("list size", list.length);
                        // 不支持批量删除，暂时一个一个删除 todo 后续完善
                        for (let i = 0; i < list.length; i++) {
                            await PageProcess.delete(list[i]._id);
                        }
                    } else {
                        _id = (+new Date()) + "";
                    }
                    if (!_id) {
                        ret = -6;
                    }
                }
                console.log("数据预处理完毕", ret);

                if (ret == 0) {// 更新readme
                    let doc = fs.readFileSync(redmePath, "utf-8");
                    let page = new Page({
                        _id: _id,
                        parent: "root",
                        doc: doc,
                        name: gitname,
                        space_id: space_id
                    });
                    let b = await PageProcess.update(_id, page, true);
                    if (!b) {
                        ret = RT.DB_UPDATE_ERR;
                    }
                }
                console.log("readme 同步完毕", ret);
                if (ret == 0) {
                    wiki_path = path.join(git_path, "wiki")
                    if (fs.existsSync(wiki_path)) {
                        has_wiki = true;
                    }
                }
                if (ret == 0 && has_wiki) {
                    let array = fs.readdirSync(path.join(git_path, "wiki"));
                    console.log("array length", array == null, array.length)
                    let save_array = [];
                    if (!!array) {
                        for (let i = 0; i < array.length; i++) {
                            console.log(array[i], "文件")
                            let doc = fs.readFileSync(path.join(wiki_path, array[i]),"utf-8");
                            let page = new Page({
                                _id: (+new Date()) + "",
                                parent: _id,
                                doc: doc,
                                name: array[i],
                                space_id: space_id
                            })
                            save_array.push(page);
                        }
                        // todo 批量插入，暂时没有这个函数，所以循环一次一次的插入了
                        for (let i = 0; i < save_array.length; i++) {
                            let b = await PageProcess.update(save_array[i]._id, save_array[i], true);
                        }
                    }
                }
                console.log("wiki 同步完毕", ret);
            }
            resolve(ret);
        })
    }
    // 返回一个目录结构下的
    redDirFile(){

    }
}

module.exports = new GitProProcess("gitpro", GitPro);