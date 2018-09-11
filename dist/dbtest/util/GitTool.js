const path = require("path");
const child_process = require('child_process');
const os = require('os');
const fs = require('fs');
const platForm = os.platform();
const execFile = child_process.execFile;
class GitTool {
    constructor(dir) {
        this.binPath = path.join(__dirname, "./bin");
        this.plugin_lib = path.join(__dirname, "../../../plugin_lib");
        if (!dir) {
            this.git_wrokspace = path.join(__dirname, "../../../git_wrokspace");
            this.cwd = path.join(__dirname);
            this.cmd = this.git_wrokspace;
        }
        else {
            this.cwd = dir;
            this.git_wrokspace = dir;
        }
    }
    gitInit(git_name, git_url, commit_id) {
        console.log(git_url);
        let ret = 0, step = 0;
        try {
            if (!fs.existsSync(this.git_wrokspace)) {
                fs.mkdirSync(this.git_wrokspace);
            }
            this.cwd = this.git_wrokspace;
            if (!fs.existsSync(path.join(this.cwd, `${git_name}/.git`))) {
                step = 100;
                this.cmd = `git clone ${git_url}`;
                console.log(this.cmd);
                this.exec(this.cmd);
                this.cd(git_name);
                step = 101;
            }
            else {
                step = 4;
                this.cd(git_name);
                this.cmd = `git fetch --tags --progress ${git_url} +refs/heads/*:refs/remotes/origin/*`;
                this.exec(this.cmd);
                step = 41;
            }
            if (!commit_id) {
                step = 5;
                commit_id = this.getHEAD();
                step = 6;
            }
            this.cmd = `git checkout ${commit_id}`;
            this.exec(this.cmd);
        }
        catch (e) {
            ret = 100000;
        }
        finally {
            console.log("git step:", step, ret);
            return ret;
        }
    }
    CopyFile(file, tfile) {
        let ret = 0;
        try {
            var poi = tfile.lastIndexOf(path.join('/'));
            if (poi > 0) {
                var tdir = tfile.substring(0, poi);
                if (!fs.existsSync(tdir)) {
                    fs.mkdir(tdir);
                }
            }
            var tmpstr = fs.readFileSync(file, "utf-8");
            if (!!tmpstr && tmpstr.length > 0) {
                fs.writeFileSync(tfile, tmpstr);
            }
            else {
                ret = RT.SYSERR;
            }
        }
        catch (e) {
            ret = RT.SYSERR;
            console.log(e);
        }
        finally {
            return ret;
        }
    }
    gitCopy(sourcePath, targetPath, fun) {
        let _this = this;
        let cmd, cwd;
        sourcePath = path.join(this.plugin_git, sourcePath);
        targetPath = path.join(this.plugin_lib, targetPath);
        if (platForm == 'win32') {
            cmd = 'git_copy.bat';
            cwd = _this.binPath;
        }
        else {
            cmd = path.join(_this.binPath, 'git_copy.sh');
            cwd = '.';
        }
        return new Promise(function (resolve, reject) {
            execFile(cmd, [sourcePath, targetPath], {
                cwd: cwd,
                encoding: 'utf-8',
                maxBuffer: 5000 * 1024,
            }, (error, stdout, stderr) => {
                console.log(error);
                if (error) {
                    reject(stderr);
                }
                else {
                    console.log("copy 成功");
                    resolve(stdout);
                }
            });
        });
    }
    cd(dir) {
        this.cwd = path.join(this.cwd, dir);
        console.log("cd", this.cwd);
    }
    getHEAD() {
        let cmd = `git rev-parse refs/remotes/origin/master`;
        let HEAD = this.exec(cmd);
        HEAD = HEAD ? HEAD.replace(/[\r\n]/g, "") : null;
        console.log("HEAD", HEAD);
        return HEAD;
    }
    exec(cmd) {
        let array = cmd.split(" ");
        return child_process.execFileSync(array[0], array.slice(1), {
            cwd: this.cwd,
            encoding: 'utf-8',
            maxBuffer: 5000 * 1024,
            timeout: 60000
        });
    }
}
module.exports = GitTool;
//# sourceMappingURL=GitTool.js.map