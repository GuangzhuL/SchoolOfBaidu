var btns = document.getElementsByTagName("button");
var rootNode = document.getElementById("root");
var inputs = document.getElementsByTagName("input");
var link = document.getElementsByTagName("a");
var lock = false;
var selectedNode = null;
var speed = 500;
var flag = [];
var indexBF = 0;

//兼容浏览器
function addEvent(element, event, handler) {
    if (element.addEventListener) {
        element.addEventListener(event, handler, false);
    }
    else if (element.attachEvent) {
        element.attachEvent("on" + event, handler);
    }
    else {
        element["on" + event] = handler;
    }
}

//深度优先搜索
function traverseDF(node, nodeList) {
    //去除标签为a的元素，以免被选
    if(node && node.className !== "display") {
        nodeList.push(node);
        for(var i = 0; i < node.children.length; i++) {
            traverseDF(node.children[i], nodeList);
        }
    }
}

//添加结点
function addNode(selecedtNode) {
    var addText = inputs[1].value.trim();
    if (!selecedtNode) {
        alert("请选择一个结点");
        return;
    }
    if (!addText) {
        alert("请输入你要的添加的结点");
        return;
    }
    var newNode = document.createElement("div");
    newNode.innerHTML = addText + "<a class='display' href='javascript:;'>+</a>";
    selectedNode.appendChild(newNode);
    inputs[1].value = "";
    bindLink();
}

//删除结点
function delNode() {
    if (!selectedNode) {
        alert("请选择一个结点");
        return;
    }
    else {
        var parentNode = selectedNode.parentNode;
        parentNode.removeChild(selectedNode);
        selectedNode = null;
    }
}

//渲染事件
function traverseRender(nodeList, searchText) {
    //用于重置样式
    resetStyle();
    var i = 0;
    var len = nodeList.length;
    //这是为了先遍历给首个元素，方便后续定时器的去除样式，且用trim()去除值的前后的空格
    if (nodeList[i].firstChild.nodeValue.trim() == searchText) {
        blockParent(nodeList[i]);
        blockNextSibling(nodeList[i]);
        blockPreSibling(nodeList[i]);
        nodeList[i].className = "found";
        lock = false;
        inputs[0].value = "";
        //如果第一个就找到，那么停止执行函数，以免后续触发定时器
        return;
    }
    else {
        nodeList[i].className = "active";
        lock = true;
    }
    var timer = setInterval(function () {
        //这个要len-1，因为后面是i+1,注意逻辑关系
        if (i < len-1) {
            nodeList[i].className = "";
            if (nodeList[i+1].firstChild.nodeValue.trim() == searchText) {
                blockParent(nodeList[i+1]);
                blockNextSibling(nodeList[i+1]);
                blockPreSibling(nodeList[i+1]);
                nodeList[i+1].className = "found";
                clearInterval(timer);
                lock = false;
                inputs[0].value = "";
                return;
            }
            else {
                nodeList[i+1].className = "active";
                lock = true;
            }
            i++;
        }
        else {
            nodeList[i].className = "";
            clearInterval(timer);
            lock = false;
        }
    }, speed);
}

//判断该执行的事件
function traverse(traverseIndex) {
    var nodeList = [];
    switch (traverseIndex) {
        case 0:
            var searchText = inputs[0].value.trim();
            traverseDF(rootNode, nodeList);
            break;
        case 1:
            addNode(selectedNode);
            //让新加入来的元素可选
            selectNode();
            //让新加入来的扩展点可选
            bindLink();
            //结束函数，以免执行下面的traverseRender(nodeList, searchText)
            return;
        case 2:
            delNode();
            selectNode();
            bindLink();
            return;
    }
    traverseRender(nodeList, searchText);
}

//重置默认样式
function resetStyle() {
    var nodeList = [];
    traverseDF(rootNode, nodeList);
    for (var i = 0; i < nodeList.length; i++) {
        nodeList[i].className = "";
    }
}

//选择结点
function selectNode() {
    var nodeList = [];
    traverseDF(rootNode, nodeList);
    for (var i = 0; i < nodeList.length; i++) {
        (function(i) {
            addEvent(nodeList[i], "click", function(event) {
                var event = event || window.event;
                //取消冒泡，才能精准选择到结点
                event.stopPropagation();
                resetStyle();
                nodeList[i].className = "selected";
                selectedNode = nodeList[i];
            })
        }(i));
    }
}

//绑定按钮事件,注意闭包的使用
function init() {
    for (var i = 0; i < btns.length; i++) {
        (function (i) {
            addEvent(btns[i], "click", function () {
                if (lock == true) {
                    alert("我还在遍历中呢");
                }
                else {
                    traverse(i);
                }
            })
        }(i))
    }
}
 
//绑定展开的标志 
function bindLink() {
    for (var i = 0; i < link.length; i++) {
        console.log(link[i]);
         flag[i] = false;
         // flag[0] = true;
         (function (i) {
             addEvent(link[i], "click", function(event) {
                var event = event || window.event;
                //"+"为收缩状态，“-”为开展状态
                if (flag[i]) {
                    link[i].innerHTML = "-";
                    flag[i] = false;
                    displayNodes(link[i]);
                }
                else {
                    link[i].innerHTML = "+";
                    flag[i] = true;
                    displayNodes(link[i]);
                }
                event.stopPropagation();
             });
         }(i));
    }
}

//点击“+”和“-”,展开与收缩
function displayNodes(childNode, spread) {
    var parentNode = childNode.parentNode;
    var divs = parentNode.getElementsByTagName("div");
        for (var j = 0; j < divs.length; j++) {
            //经过计算后的样式可以避免因样式变化造成的问题
            if (window.getComputedStyle(divs[j], null)["display"] == "block") {
                divs[j].style.display = "none";
            }
            else {
                divs[j].style.display = "block";
            }
        }
}

//展现寻找结点的父元素
function blockParent(node) {
    if (node.parentNode == "rootNode" || !node.parentNode) {
        return;
    }
    else if (node.className != "display") {
        node.style.display = "block";
        blockParent(node.parentNode);
    }
}

//展现寻找结点的下一个兄弟元素
function blockNextSibling(node) {
    if (node) {
        node.style.display = "block";
        blockNextSibling(node.nextElementSibling);
    }
}

//展现寻找结点的上一个兄弟元素
function blockPreSibling(node) {
    if (node) {
        node.style.display = "block";
        blockPreSibling(node.previousElementSibling);
    }
}
init();
selectNode();
bindLink();

