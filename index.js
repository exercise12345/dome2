/**
 *先清除浏览器缓存
 *清空localStorage
 */
function clear () {
	localStorage.clear();
	load();
}

/**  
 * 处理插入框输入内容
 * 存入缓存中
 */
var title = document.getElementById("title");
title.onchange=function(){
  if (title.value == "") {
    alert("输入内容不能为空")
  } else {
    // 将输入数据保存到浏览器缓存中
    var data = loadStorageData();
    var todo = { "title": title.value, "done": false };
    data.push(todo);
    //保存数据
		localStorage.setItem("todo",JSON.stringify(data));
  }
  showList();
  title.value = '';
}

/**
 * 数据获取缓存数据
 */
function loadStorageData () {
  var collection = localStorage.getItem("todo");
  return (collection != null) ? JSON.parse(collection) : [];
}

/**
 * 数据展示函数
 */
function showList () {
  var todolist = document.querySelector(".todolist");
  var donelist = document.querySelector(".donelist");
  var span=document.querySelectorAll(".show span")
  //获取本地数据
  var data = loadStorageData();
  //遍历本地数据生成对应标签
  //定义初始标签数量
  let todoCount = 0;
  let doneCount = 0;
  //定义标签字符串内容
  let todoString = "";
  let doneString = "";
  for (var i = data.length - 1; i >= 0; i--) {
    
    if (data[i].done) {
      //根据done值  为ture时生成已经完成内容
      doneString += 
      `<li draggable='true'>
        <input type = 'checkbox' onchange = 'updateData(`+ i + `,false)' checked ='checked' /> 
        <p id=`+i+` ondblclick='editTodo(`+ i + `)'>` + data[i].title + `</p>
        <a href='javascript:removeTodo(`+ i + `)'>-</a>
      </li>`;
      doneCount++;
    }
    else {
      //为false时生成正在进行
      todoString += 
      `<li draggable='true'>
        <input type='checkbox' onchange='updateData(` + i +` ,true)' />
        <p id='`+i+`' ondblclick='editTodo(` + i + `)'> `+ data[i].title +` </p>
        <a href='javascript:removeTodo( `+ i +` )'>-</a>
      </li>`;
      todoCount++;
    }
  }
  span[0].innerHTML=todoCount;
  todolist.innerHTML=todoString;
  span[1].innerHTML=doneCount;
  donelist.innerHTML=doneString;
}

/**更新列表数据
 * 点击前面按钮提交代码
 * 修改缓存中数据done的状态
 */
function updateData(i,value){
  var data = loadStorageData();
	data[i].done = value;
	localStorage.setItem("todo",JSON.stringify(data));
	showList();
}
/**
 * 删除选中列表数据
 * @param {传递索引}} i 
 */
function removeTodo(i){
	var data=loadStorageData();
	var todo=data.splice(i,1)[0];
	localStorage.setItem("todo",JSON.stringify(data));
	showList();
}

/**
 * 修改第几个事件内容
 * @param {传递索引} i 
 */
function editTodo (i) {
  var p = document.getElementById(i);
  title = p.innerText;
  p.innerHTML=""
  console.log(title)
  p.innerHTML = "<input  value='" + title + "' />";
  var input = document.getElementsByTagName("input")[i];
}
showList();