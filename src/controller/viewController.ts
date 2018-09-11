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

@Controller('view')
export class ViewController {


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
            res.render('view', {space: JSON.stringify(space), navs: JSON.stringify(navs)});
        }
        else if (ret == 404) {
            res.render("404");
        }
    }

}


