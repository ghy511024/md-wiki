/**
 * Created by cyl on 2018/5/13.
 */
import {Controller, Get, Post, Req, Res, Middleware, NestMiddleware} from '@nestjs/common';
var PageProcess = require("../process/page.process");
var Page = require("../bean/page");
var fs = require("fs");


@Controller('page')
export class PageController {
    @Get('test')
    test(@Req() request) {
        return 'Hello World!';
    }

    @Get('app')
    async app(@Res() res, @Req() req) {
        let {_id} = req.query;
        let ret = 0;
        let page, navs = {};
        if (!_id) {
            ret = -1;
        }
        if (ret == 0) {
            page = await PageProcess.getOneByid(_id);
            if (!page) {
                ret = -2;
            }
        }
        if (ret == 0) {
            navs = await PageProcess.getNavs(_id);
        }

        console.log(_id, ret);
        if (ret == 0) {
            res.render('app', {page: page, page_str: JSON.stringify(page), navs: JSON.stringify(navs)});
        }
        else if (ret == -1) {
            res.render('app', {page: {}, page_str: JSON.stringify({})});
        } else {
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
        let {_id, doc} = req.body
        let ret = 0;
        if (!_id) {
            _id = +new Date();
        }
        console.log(_id, "_id.........")
        if (ret == 0) {
            let page = new Page({_id: _id, doc: doc});
            console.log(page.toJSON(), ".................")
            let b = await PageProcess.update(_id, page, false);
            if (!b) {
                ret = -1;
            }
        }
        var result = {code: ret, _id: _id};
        res.send(result);
    }

}