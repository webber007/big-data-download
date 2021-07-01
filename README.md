# big-data-download
A plug-in for downloading big Excel data.

### 适用场景
当你需要从网页上点击下载一堆很大的数据，可能会由于数据太大或者后端组织数据时间长，出现超时问题，
本插件会自动的以分页形式循环去请求你的后端数据，并将多页请求的数据在前端合并下载，同时实时显示进度。

### 使用方法
1. 引入第三方插件 xlsx.mini.min.0.17.0.js
1. 引入 big-data-down.1.0.x.js
1. 在您的下载按钮上绑定点击事件
 bigDataDown.downExcel("./test.php");
1. 插件会自动加上Get参数 page=1 2 ...循环请求test.php，您需要在后端根据page值返回该页的json格式数据，格式如下	
```
{
	//总页数,选填
	"total_page":10,
	//表头,  选填
	"header":["a","b","c"],
	//数据
	"data":[
 	{"name":"\u5f20\u4e09","age":11,"date":22,"ord":33},
 	{"name":"\u674e\u4e092","age":111,"date":222,"ord":333}
	] 
}
```

