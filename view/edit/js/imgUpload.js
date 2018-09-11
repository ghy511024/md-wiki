/**
 * Created by ghy on 2018/9/5.
 */
const show_host = 'http://pic1.58cdn.com.cn';
const show_path = '/fangfe/wiki/';
const up_host = 'http://upload.58cdn.com.cn/json';
module.exports = function (base64_str, callback) {
    var base64_new_str = base64_str.replace(/data.*;base64,/, "")
    $.ajax({
        type: "POST",
        url: up_host + "?rand=" + Math.random(),
        data: JSON.stringify({
            "Pic-Data": base64_new_str,
            "Pic-Size": "0 * 0",
            "Pic-Encoding": "base64",
            "Pic-Path": show_path
        }),
        dataType: "text",
        contentType: "text/plain",
        success: function (data) {
            if (typeof callback == "function") {
                callback(show_host + show_path + data);
            }
        }
    });
}