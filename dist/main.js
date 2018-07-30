"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const express = require("express");
const cookieParser = require('cookie-parser');
const path = require("path");
const ConfManager_1 = require("./util/ConfManager");
const fmongo = require('fmongo');
let conf = ConfManager_1.default.getConf("db");
fmongo.config(conf);
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        app.use(cookieParser());
        app.use(express.static(path.join(__dirname, '../build')));
        app.set('views', path.join(__dirname, '../src/views'));
        app.set('view engine', 'html');
        app.engine('html', require('shtm').__express);
        yield app.listen(3100);
        console.log("start app listen:", 3100);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map