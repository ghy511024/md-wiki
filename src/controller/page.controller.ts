/**
 * Created by cyl on 2018/5/13.
 */
import {Controller, Get, Post, Req, Res, Middleware, NestMiddleware} from '@nestjs/common';
var PageProcess = require("../process/page.process");
var fs = require("fs");

import Page from '../bean/page'
const RT = require('../util/UT');

@Controller('page')
export class PageController {
    @Get('test')
    test(@Req() request) {
        return 'Hello World!';
    }

    @Get('app')
    async app(@Res() res, @Req() req) {
        let {_id} = req.query;
        console.log(req.url, "req", req.originalUrl)
        let ret = 0;
        let page, navs = {};
        if (ret == 0) {
            navs = await PageProcess.getNavs(_id);
        }
        if (ret == 0) {
            res.render('app', {page: page, page_str: JSON.stringify(page), navs: JSON.stringify(navs)});
        }
        else {
            res.render("404");
        }
    }

    @Get('list')
    async list(@Res() res, @Req() request) {
        let list = await  PageProcess.getList();
        res.send(list);
    }

    @Post('create')
    async create(@Res() res, @Req() req) {
        let {pid, name} = req.body
        let ret = 0;
        if (!pid && !name) {
            ret = -1;
        }
        if (ret == 0) {
            var _id = (+new Date()) + ""
            let page = new Page({_id: _id, name: name, parent: pid});
            let b = await PageProcess.update(_id, page, true);
            if (!b) {
                ret = -1;
            }
        }
        var result = {code: ret, _id: _id};
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
}


