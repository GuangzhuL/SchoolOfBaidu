// 添加绑定事件，兼容浏览器差异
function addEvent(element, event, handler) {
    if (element.addEventListener) {
        element.addEventListener(event, handler, false);
    }
    else if (element.attachEvent) {
        element.attachEvent("on" + event, handler)
    }
    else {
        element["on" + event] = handler;
    }
}

var ul = document.getElementById("ul");
var textarea = document.getElementsByTagName("textarea")[0];
var button = document.getElementsByTagName("button");
// 用于检测是否输入要求的数字
// var reg = /[^0-9a-zA-Z\u4e00-\u9fa5]+$/;
var reg = /[^0-9a-zA-Z\u4e00-\u9fa5]+/;

// 用于按下按钮之后清空input里面的值
function empty() {
    textarea.value = null;
}
var arr = new Array();
function insert() {
    var textValue = textarea.value;
    textValue.trim();
    //  首先利用split（正则表达式）可以取得是中文大小写字符的部分而其他忽略。但是,
    //  最后的输入的字符串的最后如果有空格会被捕抓到，所以需要利用filter来对空格进行过滤
    arr = textValue.split(reg).filter(function(e) {
        return e != "";
    });
    for (var i = 0; i < arr.length; i++) {
        var li = document.createElement("li");
        li.innerHTML = arr[i];
        ul.appendChild(li);    
    }
    empty();
}
function query() {
    var str = textarea.value.trim();
    ul.innerHTML = arr.map(function(d) {
        if (str != null && str.length > 0) {
            // 用span包裹着str去替换原元素的str部分
            d = d.replace(new RegExp(str, "g"), "<span class='select'>" +str+ "</span>");
        }
        // 用li标签将数组的每一个元素返回给ul.innerHTML
        return '<li>' +d+ '</li>';
    }).join("");
    // 上面的join函数是为了将数组转为字符串，以去除数组中的逗号

}
addEvent(button[0], "click", insert);
addEvent(button[1], "click", query);