/**
 * Created by ghy on 2018/8/6.
 */

var tree = [{
    _id: 1,
    parent: null,
    children: [
        {
            _id: 2, parent: 1,
            children: [{_id: 4, parent: 2}]
        },
        {
            _id: 3,
            parent: 1,
            children: [{_id: 5, parent: 3}]
        }]
}]

function parse(arr) {
    var result = [];
    parseArray(arr);
    function parseObj(obj) {
        var parent = obj["parent"];
        var _id = obj["_id"];
        var tmp = {_id: _id};
        parent && (tmp["parent"] = parent);
        result.push(tmp);
        if (obj["children"]) {
            parseArray(obj["children"])
        }
    }
    function parseArray(array) {
        for (var i = 0; i < array.length; i++) {
            parseObj(array[i]);
        }
    }
    return result;
}
console.log(JSON.stringify(parse(tree)));
