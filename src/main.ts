import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
var cookieParser = require('cookie-parser');
import * as express from 'express';
var path=require("path");
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, '../build')));
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'html');
    app.engine('html', require('shtm').__express);

    await app.listen(3000);
}
bootstrap();
