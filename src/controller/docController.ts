/**
 * Created by cyl on 2018/5/13.
 */
import {Controller, Get, Post, Req, Res, Middleware, NestMiddleware, Param} from '@nestjs/common';
var PageProcess = require("../process/pageProcess");
var SpaceProcess = require("../process/spaceProcess");
var fs = require("fs");

var remark = require('remark');
var guide = require('remark-preset-lint-markdown-style-guide');
var html = require('remark-html');
var report = require('vfile-reporter');


import Page from '../bean/page'
import Space from '../bean/space'
const RT = require('../util/RT');

@Controller('doc2')
export class DocController {
    @Get('/')
    async doc(@Res() res, @Req() req, @Param() params) {
        console.log(1);
        res.send("s")
    }

    @Get(':space_name/:_id')
    async doc(@Res() res, @Req() req, @Param() params) {
        let {space_name} = params;
        console.log(space_name);
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

    @Get('/:space_name')
    async doc(@Res() res, @Req() req, @Param() params) {
        let {space_name} = params;
        console.log(space_name);
        let ret = 0, html_doc;
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
            let page = await PageProcess.getOneByCond({space_id: space._id});
            if (!page) {
                ret = -3;
            }

        }
        if (ret == 0) {
            html_doc = await PageProcess.getHtmlByMd(page.doc);
        }
        if (ret == 0) {
            res.render('doc', {space: JSON.stringify(space), navs: JSON.stringify(navs), html_doc: html_doc});
        }
        else if (ret == 404) {
            res.render("404");
        }
    }

}


