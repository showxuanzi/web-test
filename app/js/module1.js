/**
 * Created by hasee on 2016/7/11.
 */
define(function () {
    var str ="1615";
    return {
        show:function () {
            alert(str)
        },
        fnSet:function (newStr) {
            str = newStr
        }
    }
});