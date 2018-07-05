/**
 * Created by cyl on 2018/5/13.
 */
import {Controller, Get, Req, Res, Middleware, NestMiddleware} from '@nestjs/common';
var PageProcess = require("../process/page.process");
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

}