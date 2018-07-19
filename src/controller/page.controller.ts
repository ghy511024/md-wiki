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

    @Get('ghy')
    async ddd(@Res() res, @Req() request) {
        let mdstr = fs.readFileSync('md/demo.md', "utf-8");
        let htmlstr = await PageProcess.getHtmlByMd(mdstr);
        res.render('page', {mdstr: mdstr, htmlstr: htmlstr});
    }

    @Get('app')
    async app(@Res() res, @Req() req) {
        let {_id} = req.query
        res.render('app', {_id: _id});
    }

    @Get('list')
    async list(@Res() res, @Req() request) {
        let list = await  PageProcess.getList();

        res.send(list);
    }

    @Post('create')
    async create(@Res() res, @Req() req) {
        let {_id, doc} = req.body
        let ret = 0;
        if (!!_id) {
            _id = +new Date();
        }
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

    @Post('update')
    async update(@Res() res, @Req() req) {
        let {_id, doc} = req.body
        let ret = 0;
        if (!_id) {
            _id = +new Date();
        }
        console.log(_id,"_id.........")
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