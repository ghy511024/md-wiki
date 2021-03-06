/**
 * Created by cyl on 2018/7/19.
 */
var tree = {
    root: {
        _id: 1,
        children: [
            {_id: 2, children: [3]}
        ]
    }
}
var array = [
    {_id: 1, parent: null},
    {_id: 2, parent: 1},
    {_id: 3, parent: 1},
    {_id: 4, parent: 2},
    {_id: 5, parent: 3},
    {_id: 6, parent: 3},
    {_id: 7, parent: 5},
]
var map = {}
for (var i = 0; i < array.length; i++) {
    array[i]["name"] = "nav";
    map[array[i]._id] = array[i];
}

var root = {
    _id: "root"
};
function addNode(node_id, parent_id) {
    var parent = map[parent_id] || root;
    parent.children = parent.children || [];
    parent.children.push(map[node_id]);
}
for (var i = 0; i < array.length; i++) {
    addNode(array[i]._id, array[i].parent);
}
console.log(JSON.stringify(root));

var m = {
    "_id": "root",
    "type": "page-nav",
    "children": [{
        "_id": "1532001794920",
        "name": "test",
        "type": "page-nav",
        "parent": "root",
        "children": [{
            "_id": "1532235168414",
            "name": "test1",
            "type": "page-nav",
            "parent": "1532001794920",
            "children": [{"_id": "1532235677251", "name": "test1_1", "type": "page-nav", "parent": "1532235168414"}]
        }],
        "active": true,
        "isopen": true
    }]
}