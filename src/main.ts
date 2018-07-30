import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as express from 'express';

const cookieParser = require('cookie-parser');
const path = require("path");
import ConfManager  from "./util/ConfManager";

//============配置数据库==================
const fmongo = require('fmongo');
let conf = ConfManager.getConf("db");
fmongo.config(conf);
//=============配置数据集结束===============


async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, '../build')));
    app.set('views', path.join(__dirname, '../src/views'));
    app.set('view engine', 'html');
    app.engine('html', require('shtm').__express);

    await app.listen(3100);
    console.log("start app listen:", 3100)
}
bootstrap();
