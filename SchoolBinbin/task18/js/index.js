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
var input = document.getElementsByTagName("input")[0];
var button = document.getElementsByTagName("button");
// 用于检测是否输入要求的数字
var reg = /^[0-9]+$/;

// 用于按下按钮之后清空input里面的值
function empty() {
    input.value = null;
}
function leftUnshift() {
    if (reg.test(input.value)) {
        var li = document.createElement("li");
        li.innerHTML = input.value;
        ul.insertBefore(li, ul.firstChild);
    }
    else {
        alert("请输入数字");
    }
    empty()
}
function rightPush() {
    if (reg.test(input.value)) {
        var li = document.createElement("li");
        li.innerHTML = input.value;
        ul.appendChild(li);
    }
    else {
        alert("请输入数字");
    }  
    empty()
}
function leftShift() {
    alert(ul.firstChild.innerHTML);
    ul.removeChild(ul.firstChild);   
    empty();
}
function rightPop() {
    alert(ul.lastChild.innerHTML);
    ul.removeChild(ul.lastChild); 
    empty();
}
addEvent(button[0], "click", leftUnshift);
addEvent(button[1], "click", rightPush);
addEvent(button[2], "click", leftShift);
addEvent(button[3], "click", rightPop);
ul.onmouseover = function () {
	var li = ul.getElementsByTagName('li');
	for (var i in li) {
		li[i].index = i;
		li[i].onclick = function () {
			ul.removeChild(ul.childNodes[this.index]);
		}
	}
}