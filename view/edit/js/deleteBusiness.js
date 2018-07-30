/**
 * Created by cyl on 2018/7/29.
 */
var treeMap = require('./treeMap');
function del(_id, vaueInstance) {
    var map = vaueInstance.map;
    var page = map[_id];
    var pid = page.parent;
    var p_page = map[pid];


    $.ajax({
        url: "delete",
        type: "POST",
        data: ({_id: _id}),
        error: function () {
            alert("异常")
        },
        success: function (ret) {
            if (ret.code == 0) {
                if (p_page) {
                    p_page.children = p_page.children || []
                    var array_new = p_page.children.filter(function (ele) {
                        return ele != page;
                    })
                    if (array_new == null || array_new.length == 0) {
                        array_new = null;
                    }
                    p_page.children = array_new;
                    window.location.hash = "_id=" + p_page._id;
                }
                else {
                    window.location.hash = "";
                    window.location.reload();
                }
            }
            else {
                alert("删除失败" + ret.desc);
            }
        }
    })
}
module.exports = del;