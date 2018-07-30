/**
 * Created by ghy on 2018/7/30.
 */
var createPage = function (_id, name, callback) {
    if (!_id || !name) {
        alert("创建参数异常")
        callback("参数异常")
    }
    $.ajax({
        url: "create",
        data: ({pid: _id, name: name}),
        type: "POST",
        error: function () {
            callback("网络异常")
        },
        success: function (data) {
            callback(null, data)
            // window.location.href = window.location.href.replace(/_id=.*/gi, "_id=" + data._id);
            // window.location.reload();
        }
    })
}
module.exports = createPage;