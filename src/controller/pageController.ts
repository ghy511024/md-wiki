/**
 * Created by cyl on 2018/5/13.
 */
import {Controller, Get, Post, Req, Res, Middleware, NestMiddleware, Param} from '@nestjs/common';
var PageProcess = require("../process/pageProcess");
var SpaceProcess = require("../process/spaceProcess");
var fs = require("fs");

import Page from '../bean/page'
import Space from '../bean/space'
const RT = require('../util/RT');

@Controller('page')
export class PageController {

    @Get('list')
    async list(@Res() res, @Req() request) {
        let list = await  PageProcess.getList();
        res.send(list);
    }

    @Post('create')
    async create(@Res() res, @Req() req) {
        let {pid, name, space_id} = req.body
        let ret = 0, _id, space = new Space();
        if (!pid || !name || !space_id) {
            ret = RT.PARAMETER_ERR;
        }
        if (ret == 0) {
            space = await SpaceProcess.getOneByid(space_id);
            if (space == null) {
                space={};
                ret = RT.PARAMETER_ERR;
            }
        }
        if (ret == 0) {
            _id = (+new Date()) + ""
            let page = new Page({_id: _id, name: name, parent: pid, space_id: space_id});
            let b = await PageProcess.update(_id, page, true);
            if (!b) {
                ret = RT.DB_UPDATE_ERR;
            }
        }
        var result = RT.result(ret);
        result["_id"] = _id;
        console.log("创建新页面:", space.name, space_id, result);
        res.send(result);
    }

    @Post('update')
    async update(@Res() res, @Req() req) {
        let {_id, doc = "", name} = req.body
        let ret = 0;
        if (!_id || (name == null && doc == null)) {
            ret = -1;
        }
        if (ret == 0) {
            let page = new Page({_id: _id, doc: doc, name: name});
            let b = await PageProcess.update(_id, page, false);
            if (!b) {
                ret = -2;
            }
        }
        var result = {code: ret, _id: _id};
        res.send(result);
    }

    @Get('info')
    async info(@Res() res, @Req() req) {
        let {_id} = req.query
        let ret = 0, page;
        if (!_id) {
            ret = -1;
        }
        if (ret == 0) {
            page = await PageProcess.getOneByid(_id);
            if (!page) {
                ret = -3;
            }
        }
        var result = {code: ret, page: page};
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
            let list = await  PageProcess.getList({parent: _id});
            if (list != null && list.length > 0) {
                ret = RT.PAGE_HAS_CHILD;
            }
        }
        if (ret == 0) {
            let b = await PageProcess.delete(_id);
            if (!b) {
                ret = RT.DB_DELETE_ERR;
            }
        }
        var result = RT.result(ret);
        res.send(result);
    }

    @Get(':space_name')
    async app(@Res() res, @Req() req, @Param() params) {
        let {space_name} = params;
        // console.log(space_name);
        let ret = 0;
        let page, navs = {}, space = new Space();
        if (ret == 0) {
            space = await SpaceProcess.getOneByCond({name: space_name});
            if (space == null) {
                ret = 404;
            }
        }
        if (ret == 0) {
            navs = await PageProcess.getNavs(space._id, space.name);
        }
        if (ret == 0) {
            res.render('app', {space: JSON.stringify(space), navs: JSON.stringify(navs)});
        }
        else if (ret == 404) {
            res.render("404");
        }
    }

}


