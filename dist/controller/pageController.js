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
var SpaceProcess = require("../process/space.process");
var fs = require("fs");
const page_1 = require("../bean/page");
const space_1 = require("../bean/space");
const RT = require('../util/UT');
let PageController = class PageController {
    list(res, request) {
        return __awaiter(this, void 0, void 0, function* () {
            let list = yield PageProcess.getList();
            res.send(list);
        });
    }
    create(res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            let { pid, name, space_id } = req.body;
            let ret = 0, _id, space = new space_1.default();
            if (!pid || !name || !space_id) {
                ret = RT.PARAMETER_ERR;
            }
            if (ret == 0) {
                space = yield SpaceProcess.getOneByid(space_id);
                if (space == null) {
                    space = {};
                    ret = RT.PARAMETER_ERR;
                }
            }
            if (ret == 0) {
                _id = (+new Date()) + "";
                let page = new page_1.default({ _id: _id, name: name, parent: pid, space_id: space_id });
                let b = yield PageProcess.update(_id, page, true);
                if (!b) {
                    ret = RT.DB_UPDATE_ERR;
                }
            }
            var result = RT.result(ret);
            result["_id"] = _id;
            console.log("创建新页面:", space.name, space_id, result);
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
                if (!page) {
                    ret = -3;
                }
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
    app(res, req, params) {
        return __awaiter(this, void 0, void 0, function* () {
            let { space_name } = params;
            let ret = 0;
            let page, navs = {}, space = new space_1.default();
            if (ret == 0) {
                space = yield SpaceProcess.getOneByCond({ name: space_name });
                if (space == null) {
                    ret = 404;
                }
            }
            if (ret == 0) {
                navs = yield PageProcess.getNavs(space._id, space.name);
            }
            if (ret == 0) {
                res.render('app', { space: JSON.stringify(space), navs: JSON.stringify(navs) });
            }
            else if (ret == 404) {
                res.render("404");
            }
        });
    }
};
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
__decorate([
    common_1.Get(':space_name'),
    __param(0, common_1.Res()), __param(1, common_1.Req()), __param(2, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PageController.prototype, "app", null);
PageController = __decorate([
    common_1.Controller('page')
], PageController);
exports.PageController = PageController;
//# sourceMappingURL=pageController.js.map