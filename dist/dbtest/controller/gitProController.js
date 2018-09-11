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
var SpaceProcess = require("../process/spaceProcess");
var GitProProcess = require("../process/gitProProcess");
const RT = require('../util/RT');
let GitProController = class GitProController {
    index(res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            let { _id } = req.query;
            let ret = 0;
            let page, list = [];
            if (ret == 0) {
                list = yield GitProProcess.getList();
                console.log("list", list.length);
            }
            res.render("gitmanager", { list: list, ghy: "sdf" });
        });
    }
    update(res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            let { gitname, giturl, commitId } = req.body;
            let ret = 0;
            if (!gitname || !giturl) {
                ret = RT.PARAMETER_ERR;
            }
            if (ret == 0) {
                let tmp_ret = yield GitProProcess.mdsync(gitname, giturl, commitId).catch(function (e) {
                    ret = RT.SYSERR;
                });
                if (tmp_ret != 0) {
                    ret = RT.DB_UPDATE_ERR;
                }
            }
            console.log(ret);
            var result = RT.result(ret);
            res.send(result);
        });
    }
};
__decorate([
    common_1.Get('/manager'),
    __param(0, common_1.Res()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GitProController.prototype, "index", null);
__decorate([
    common_1.Post('gitsync'),
    __param(0, common_1.Res()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GitProController.prototype, "update", null);
GitProController = __decorate([
    common_1.Controller('pro')
], GitProController);
exports.GitProController = GitProController;
//# sourceMappingURL=gitProController.js.map