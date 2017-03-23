/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */

// 用于方便获取id元素
function $(id) {
	return document.getElementById(id);
}

// 检验输入的格式
var regCity = /^[\u4e00-\u9fa5a-zA-Z]+$/;
var regData = /^[0-9]+$/;

// 去除两边的空格
function trim(str) {
	return str.replace(/(^\s*)|(\s*$)/g, '');
}

var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city = $("aqi-city-input").value;
	var data = $("aqi-value-input").value;
	// 去除空格之后再与正则进行匹配
	if (!regCity.test(trim(city))) {
		alert("请输入正确的城市名称且中间不能有空格");
	}
	else if (!regData.test(trim(data))) {
		alert("空气质量指数必须为整数且中间不能有空格");
	}
	else {
		aqiData[city] = data; 
	}
	// 用于清除input中已经输入的数据
	$("aqi-city-input").value = "";
	$("aqi-value-input").value = "";
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var table = $("aqi-table");
	var thead = "<tr><td>城市</td><td>空气质量</td><td><button>操作</button></td>";
	// 这里的{"city"} 和{"data"}仅仅是代表字符串
	var tbody = "<tr><td>{city}</td><td>{data}</td><td><button>删除</button></td>";
	// 用e来代替{"city"}，用e的值data即aqiData[e]来代替{"data"};
	for (e in aqiData) {
		thead += tbody.replace("{city}", e).replace("{data}", aqiData[e]);
	}
	table.innerHTML = thead;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(event) {
  // do sth.

  //event是鼠标事件，.target是指点中的那个地方的节点
  var city = event.target.parentNode.parentNode.firstChild.innerHTML;
  //删除了值，属性的名字也会消失不显示
  delete aqiData[city];
  renderAqiList();   //要重新排一次，以达到删除的后果
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var addBtn = $("add-btn");
  addBtn.addEventListener("click", addBtnHandle);

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  var delBtn = $("aqi-table");
  delBtn.addEventListener("click", delBtnHandle);
}

init();