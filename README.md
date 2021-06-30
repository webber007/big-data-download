# big-data-download
A plug-in for downloading big Excel data.

### 适用场景
当你需要从网页上点击下载 下载一堆很大的数据 并以excel的形式下载，插件会自动的以分页形式去请求后端数据

### 使用方法
1. 引入第三方插件 xlsx.mini.min.0.17.0.js
1. 引入 big-data-down.1.0.0.js
1. 在您的下载按钮上绑定点击事件
 bigDataDown.downExcel("./test.php");
1. test.php是您后端返回json格式数据的后端接口
 test.php，接收插件自动加上的GET参数page, 请用后端语言如:php $_GET['page']并返回该页json数据
 	
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
