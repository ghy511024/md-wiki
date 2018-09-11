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
const space_1 = require("../bean/space");
const RT = require('../util/RT');
let SpaceController = class SpaceController {
    list(res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            let { _id } = req.query;
            let ret = 0;
            let page, list = [];
            if (ret == 0) {
                list = yield SpaceProcess.getList();
                console.log("list", list.length);
            }
            res.render("space", { list: list, ghy: "sdf" });
        });
    }
    listapi(res, req) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    update(res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            let { _id, name, isdelete = false } = req.body;
            let ret = 0;
            if (!name) {
                ret = RT.PARAMETER_ERR;
            }
            if (ret == 0) {
                _id = _id || (+new Date()) + "";
            }
            if (ret == 0) {
                let space = new space_1.default({ _id: _id, name: name, isdelete: isdelete });
                let b = yield SpaceProcess.update(_id, space, true);
                if (!b) {
                    ret = RT.DB_UPDATE_ERR;
                }
            }
            console.log(ret);
            var result = RT.result(ret);
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
                let space = new space_1.default({ _id: _id, isDelete: true });
                let b = yield SpaceProcess.delete(_id);
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
    common_1.Get('/'),
    __param(0, common_1.Res()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SpaceController.prototype, "list", null);
__decorate([
    common_1.Post('listapi'),
    __param(0, common_1.Res()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SpaceController.prototype, "listapi", null);
__decorate([
    common_1.Post('update'),
    __param(0, common_1.Res()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SpaceController.prototype, "update", null);
__decorate([
    common_1.Post('delete'),
    __param(0, common_1.Res()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SpaceController.prototype, "delete", null);
SpaceController = __decorate([
    common_1.Controller('space')
], SpaceController);
exports.SpaceController = SpaceController;
//# sourceMappingURL=spaceController.js.map