"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
var PageProcess = require("../process/page.process");
var fs = require("fs");
const page_1 = require("../bean/page");
const RT = require('../util/UT');
let PageController = class PageController {
    test(request) {
        return 'Hello World!';
    }
    app(res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            let { _id } = req.query;
            console.log(req.url, "req", req.originalUrl);
            let ret = 0;
            let page, navs = {};
            if (ret == 0) {
                navs = yield PageProcess.getNavs(_id);
            }
            if (ret == 0) {
                res.render('app', { page: page, page_str: JSON.stringify(page), navs: JSON.stringify(navs) });
            }
            else {
                res.render("404");
            }
        });
    }
    list(res, request) {
        return __awaiter(this, void 0, void 0, function* () {
            let list = yield PageProcess.getList();
            res.send(list);
        });
    }
    create(res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            let { pid, name } = req.body;
            let ret = 0;
            if (!pid && !name) {
                ret = -1;
            }
            if (ret == 0) {
                var _id = (+new Date()) + "";
                let page = new page_1.default({ _id: _id, name: name, parent: pid });
                let b = yield PageProcess.update(_id, page, true);
                if (!b) {
                    ret = -1;
                }
            }
            var result = { code: ret, _id: _id };
            res.send(result);
        });
    }
    update(res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            let { _id, doc = "", name } = req.body;
            let ret = 0;
            if (!_id || (name == null && doc == null)) {
                ret = -1;
            }
            if (ret == 0) {
                let page = new page_1.default({ _id: _id, doc: doc, name: name });
                let b = yield PageProcess.update(_id, page, false);
                if (!b) {
                    ret = -2;
                }
            }
            var result = { code: ret, _id: _id };
            res.send(result);
        });
    }
    info(res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            let { _id } = req.query;
            let ret = 0, page;
            if (!_id) {
                ret = -1;
            }
            if (ret == 0) {
                page = yield PageProcess.getOneByid(_id);
            }
            var result = { code: ret, page: page };
            res.send(result);
        });
    }
    delete(res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            let { _id } = req.body;
            let ret = 0, page;
            if (!_id) {
                ret = RT.PARAMETER_ERR;
            }
            if (ret == 0) {
                let list = yield PageProcess.getList({ parent: _id });
                if (list != null && list.length > 0) {
                    ret = RT.PAGE_HAS_CHILD;
                }
            }
            if (ret == 0) {
                let b = yield PageProcess.delete(_id);
                if (!b) {
                    ret = RT.DB_DELETE_ERR;
                }
            }
            var result = RT.result(ret);
            res.send(result);
        });
    }
};
__decorate([
    common_1.Get('test'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PageController.prototype, "test", null);
__decorate([
    common_1.Get('app'),
    __param(0, common_1.Res()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PageController.prototype, "app", null);
__decorate([
    common_1.Get('list'),
    __param(0, common_1.Res()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PageController.prototype, "list", null);
__decorate([
    common_1.Post('create'),
    __param(0, common_1.Res()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PageController.prototype, "create", null);
__decorate([
    common_1.Post('update'),
    __param(0, common_1.Res()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PageController.prototype, "update", null);
__decorate([
    common_1.Get('info'),
    __param(0, common_1.Res()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PageController.prototype, "info", null);
__decorate([
    common_1.Post('delete'),
    __param(0, common_1.Res()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PageController.prototype, "delete", null);
PageController = __decorate([
    common_1.Controller('page')
], PageController);
exports.PageController = PageController;
//# sourceMappingURL=page.controller.js.map