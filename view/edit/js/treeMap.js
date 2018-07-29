/**
 * Created by cyl on 2018/7/28.
 */
function get_idByHash() {
    var _id;
    var hash = window.location.hash;
    hash.replace(/(?:#|&)_id=(.*?)(?:&|$)/gi, function (_, __) {
        _id = __;
    })
    return _id;
}

module.exports = (function () {
    var active_id = get_idByHash();
    var navs = window.navs || {};
    var _this = this;
    var map = {};
    console.log("开始处理")
    navs.children = navs.children || [];
    for (var i = 0; i < navs.children.length; i++) {
        addObjToMap(navs.children[i]);
    }
    function addObjToMap(obj) {
        obj["isopen"] = obj["isopen"] || false;
        obj["isadd"] = obj["isadd"] || false;
        obj["active"] = active_id == obj["_id"];
        obj["edit_title"] = false;
        obj["value"] = "";
        var _id = obj["_id"];
        map[_id] = obj;
        if (!!obj["children"]) {
            addArrayToMap(obj["children"])
        }
    }

    function addArrayToMap(array) {
        for (var i = 0; i < array.length; i++) {
            addObjToMap(array[i]);
        }
    }

    var tmpid=active_id
    while (map[tmpid]) {
        map[tmpid].isopen = true;
        tmpid = map[tmpid].parent;
    }
    return {navs: navs, map: map};
})();