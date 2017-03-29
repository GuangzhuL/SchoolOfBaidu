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
var reg = /^[1-9][0-9]$|100/;

// 用于按下按钮之后清空input里面的值
function empty() {
    input.value = null;
}
function leftUnshift() {
    if (reg.test(input.value)) {
        var li = document.createElement("li");
        li.style.height = input.value + "px";
        // li.innerHTML = input.value;
        var lis = ul.getElementsByTagName("li");
        if (lis.length < 59) {
            ul.insertBefore(li, ul.firstChild);            
        }
        else {
            alert ("输入的个数已超出上限");
        }
    }
    else {
        alert("请输入10到100以内的数字");
    }
    empty()
}
function rightPush() {
    if (reg.test(input.value)) {
        var li = document.createElement("li");
        li.style.height = input.value + "px";
        // li.innerHTML = input.value;
        var lis = ul.getElementsByTagName("li");
        if (lis.length < 59) {
            ul.appendChild(li);           
        }
        else {
            alert ("输入的个数已超出上限");
        }        
    }
    else {
        alert("请输入10到100以内的数字");
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
var arr = new Array();
function sort() {
    var lis = ul.getElementsByTagName("li");
    console.log(lis.length)
    for (var k = 0; k < lis.length; k++) {
        arr[k] = parseInt(lis[k].style.height); //取字符的前面数字部分
        arr[k] = Number(arr[k]); //贼关键，将转换到的数字强制成真正的数字，因为前面的数字只是字符串的比较，用于比较100
    }
    // 冒泡法，从小到大
    for (var i = 0; i < lis.length - 1; i++) {
        for (var j = 0; j < lis.length - i - 1; j++) {
            if (arr[j] > arr[j+1]) {
                var temp;
                temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }

}
function render() {
    sort();
    var lis = ul.getElementsByTagName("li");
    for (i = 0; i < lis.length; i++) {
        lis[i].style.height = arr[i] + "px";
    }
}
addEvent(button[0], "click", leftUnshift);
addEvent(button[1], "click", rightPush);
addEvent(button[2], "click", leftShift);
addEvent(button[3], "click", rightPop);
addEvent(button[4], "click", render);
ul.onmouseover = function () {
	var lis = ul.getElementsByTagName('li');
	for (var i in lis) {
		lis[i].index = i;
		lis[i].onclick = function () {
			ul.removeChild(ul.childNodes[this.index]);
		}
	}
}