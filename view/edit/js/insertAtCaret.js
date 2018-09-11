/**
 * textarea 光标指定位置插入数据
 */
module.exports = function (el, myValue) {
    var $t = el;
    if (document.selection) {
        $t.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
        $t.focus();
    } else if ($t.selectionStart || $t.selectionStart == '0') {
        var startPos = $t.selectionStart;
        var endPos = $t.selectionEnd;
        var scrollTop = $t.scrollTop;
        $t.value = $t.value.substring(0, startPos) + myValue + $t.value.substring(endPos, $t.value.length);
        $t.focus();
        $t.selectionStart = startPos + myValue.length;
        $t.selectionEnd = startPos + myValue.length;
        $t.scrollTop = scrollTop;
    } else {
        $t.value += myValue;
        $t.focus();
    }
}