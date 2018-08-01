/**
 * Created by cyl on 2018/5/13.
 */
import {Controller, Get, Post, Req, Res, Middleware, NestMiddleware} from '@nestjs/common';
var SpaceProcess = require("../process/space.process");

import Space from '../bean/space'
const RT = require('../util/UT');

@Controller('space')
export class SpaceController {

    //=======================页面===================
    @Get('/')
    async list(@Res() res, @Req() req) {
        let {_id} = req.query;
        let ret = 0;
        let page, list = [];
        if (ret == 0) {
            list = await SpaceProcess.getList();
            console.log("list", list.length);
        }
        res.render("space", {list: list, ghy: "sdf"})
    }

    //=======================接口===================
    @Post('listapi')
    async listapi(@Res() res, @Req() req) {

    }

    @Post('update')
    async update(@Res() res, @Req() req) {
        let {_id, name, isdelete = false} = req.body
        let ret = 0;
        if (!name) {
            ret = RT.PARAMETER_ERR;
        }
        if (ret == 0) {
            _id = _id || (+new Date()) + ""
        }
        if (ret == 0) {

            let space = new Space({_id: _id, name: name, isdelete: isdelete});
            let b = await SpaceProcess.update(_id, space, true);
            if (!b) {
                ret = RT.DB_UPDATE_ERR;
            }
        }
        var result = RT.result(ret);
        res.send(result);
    }

    @Post('delete')
    async delete(@Res() res, @Req() req) {
        let {_id} = req.body
        let ret = 0, page;
        if (!_id) {
            ret = RT.PARAMETER_ERR;
        }
        if (ret == 0) {
            let space = new Space({_id: _id, isDelete: true});
            let b = await SpaceProcess.delete(_id);
            if (!b) {
                ret = RT.DB_DELETE_ERR;
            }
        }
        var result = RT.result(ret);
        res.send(result);
    }
}


