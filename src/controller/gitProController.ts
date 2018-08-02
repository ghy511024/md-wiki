/**
 * Created by cyl on 2018/5/13.
 */
import {Controller, Get, Post, Req, Res, Middleware, NestMiddleware} from '@nestjs/common';
var SpaceProcess = require("../process/spaceProcess");
var GitProProcess = require("../process/gitProProcess");

import Space from '../bean/space'
const RT = require('../util/RT');

@Controller('pro')
export class GitProController {

    //=======================页面===================
    @Get('/manager')
    async index(@Res() res, @Req() req) {
        let {_id} = req.query;
        let ret = 0;
        let page, list = [];
        if (ret == 0) {
            list = await GitProProcess.getList();
            console.log("list", list.length);
        }
        res.render("gitmanager", {list: list, ghy: "sdf"})
    }

    //=======================接口===================

// 同步git 项目
    @Post('gitsync')
    async update(@Res() res, @Req() req) {
        let {gitname, giturl, commitId} = req.body
        let ret = 0;
        if (!gitname || !giturl) {
            ret = RT.PARAMETER_ERR;
        }
        if (ret == 0) {
            // let space = new Space({_id: _id, name: name, isdelete: isdelete});
            let tmp_ret = await GitProProcess.mdsync(gitname, giturl, commitId).catch(function (e) {
                ret = RT.SYSERR;
            });
            if (tmp_ret != 0) {
                ret = RT.DB_UPDATE_ERR;
            }
        }
        console.log(ret);
        var result = RT.result(ret);
        res.send(result);
    }
}


