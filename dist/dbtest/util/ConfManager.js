"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os = require('os');
const fs = require('fs');
const path = require('path');
const serverConf = path.join(__dirname, '../../../conf/conf.json');
class ConfManager {
    constructor() {
        this._layout();
    }
    _layout() {
        try {
            let confPath = serverConf;
            if (!fs.existsSync(serverConf)) {
                confPath = path.join(__dirname, '../../conf/conf.json');
            }
            let confstr = fs.readFileSync(confPath, 'utf-8');
            if (confstr != null && confstr.length > 0) {
                let tmpmap = JSON.parse(confstr);
                this.map = tmpmap;
                console.log('初始化配置文件成功，配置文件地址:' + confPath);
            }
        }
        catch (e) {
            console.error('初始化配置文件异常', e);
        }
    }
    getConf(key) {
        return this.map[key];
    }
}
const ConfManager_singlton = new ConfManager();
exports.default = ConfManager_singlton;
//# sourceMappingURL=ConfManager.js.map