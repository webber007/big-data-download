/*
 * 功能：大文件excel下载
 * Author: 王炜
 * 时间：2021-06-30
 * 用法：
 	bigDataDown.downExcel("./test.php");

 	test.php，接收$_GET['page']并返回当前页json数据
 	
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

 */
;(function(window){
	const _down = {
	'totalPage':1,
	'currentPage':1,
	'downAoa':[],
	'url':'',
	'downExcel': function(url){
		let div = document.getElementById('loading');
		if(!div){
			div = document.createElement("div");
		}
		div.id = "loading";
		div.innerHTML = '<DIV STYLE="BORDER: buttonhighlight 1px outset; FONT-SIZE: 14px; Z-INDEX:4; FONT-FAMILY: Tahoma; POSITION: absolute; BACKGROUND-COLOR: #fff;WIDTH: 350px;left:50%;top:10%;margin-left:-175px; CURSOR: default" ID="divProgressDialog" onselectstart="window.event.returnValue=false;">   <DIV STYLE="PADDING: 8px; FONT-WEIGHT: bolder; COLOR:#FFF;BORDER-BOTTOM: white 2px groove; BACKGROUND-COLOR: #409EFF">      导出数据   </DIV>   <DIV STYLE="PADDING: 5px">      正在生成数据，请等待.....   </DIV>   <DIV STYLE="PADDING: 5px">      这个过程可能需要几分钟   </DIV>   <DIV STYLE="PADDING: 5px">         <DIV ID="divProgressOuter" STYLE="BORDER: 1px solid threedshadow;WIDTH: 336px; HEIGHT: 25px">            <DIV ID="divProgressInner" STYLE="COLOR: white; TEXT-ALIGN:center; BACKGROUND-COLOR: GREEN; MARGIN: 0px; WIDTH: 0px; HEIGHT:25px;"></DIV>         </DIV>   </DIV>   <DIV STYLE="BORDER-TOP: white 2px groove; PADDING-BOTTOM: 5px; PADDING-TOP: 3px;BACKGROUND-COLOR: buttonface; TEXT-ALIGN: center;margin-top: 7px;">         <INPUT STYLE="FONT-FAMILY: Tahoma; FONT-SIZE: 14px;" TYPE="button" ID="btnCancel" onclick="stopLongProcess();" VALUE="取 消">   </DIV></DIV><!-- 结束下载 --><!-- BEGIN FAKE MODAL DIV--><DIV ID="divModal"   STYLE="BACKGROUND-COLOR: white; FILTER: alpha(opacity=75); LEFT: 0px; POSITION: absolute; TOP: 0px; Z-INDEX: 3"   onclick="window.event.cancelBubble=true; window.event.returnValue=false;"></DIV>';
		  
		let _that = this;
		_that.url = url.indexOf("?")>-1?url+'&page=':url+'?page=';
		window.document.body.appendChild(div);
 
		_that.AjaxJson(_that.url + _that.currentPage).then(function(data){

			document.getElementById('divProgressInner').style.width=(1/data.total_page)*336+'px';
			if(data.hasOwnProperty('header')){
				_that.downAoa.push(data.header);
			}

			if(!data.hasOwnProperty('total_page')){
				data.total_page = 1;
			}

			if(!data.hasOwnProperty('data')){
				data.data = data;
				return;
			}

			for(let i in data.data){
				let _arr = [];
				for(let j in data.data[i]){
					_arr.push(data.data[i][j]);
				}
				_that.downAoa.push(_arr);
			}

			_that.totalPage = data.total_page;
			if(_that.totalPage>1){
				_that.currentPage+=1;
				_that.doWork();
			}else{
				_that.dataToExcel();
			}
		});
	}
	,'dataToExcel':function(){
		this.openDownloadDialog(this.sheet2blob(XLSX.utils.aoa_to_sheet(this.downAoa)), '001.xlsx');
		let _div = document.getElementById('loading');
		_div.parentNode.removeChild(_div);
	}
	,'doWork':function(){
		var _that = this;
		   
		_that.AjaxJson(_that.url + _that.currentPage).then(function(data){
			_that.currentPage+=1;
			console.log(_that.currentPage);

			if(_that.currentPage>_that.totalPage){
				_that.dataToExcel();
				return;
			}

			document.getElementById('divProgressInner').style.width=(_that.currentPage/_that.totalPage)*336+'px';
			 
			for(let i in data.data){
				let _arr = [];
				for(let j in data.data[i]){
					_arr.push(data.data[i][j]);
				}
				_that.downAoa.push(_arr);
			}

			_that.doWork();
		});
	}
	,'AjaxJson':function(url){
		return new Promise((resolve, reject)=>{
		    if(window.XMLHttpRequest){
		       	var xhr = new XMLHttpRequest();
		    }else{
		        var xhr = new ActiveXObject("Microsoft.XMLHTTP");
		    } 

	    	xhr.open('GET', url, true);
	    	xhr.send();
	    	xhr.onreadystatechange = function(){
	    		if(xhr.readyState == 4){
			        if(xhr.status==200){
			        	let oJson = (new Function('return ' + xhr.responseText))();
			            resolve(oJson);
			        }else{
			        	reject();
			        }
			    }
	    	}
		});
	}

	/**
	 * 通用的打开下载对话框方法，没有测试过具体兼容性
	 * @param url 下载地址，也可以是一个blob对象，必选
	 * @param saveName 保存文件名，可选
	 */
	,'openDownloadDialog':function(url, saveName)
	{
		if(typeof url == 'object' && url instanceof Blob)
		{
			url = URL.createObjectURL(url); // 创建blob地址
		}
		let aLink = document.createElement('a');
		aLink.href = url;
		aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
		let event;
		if(window.MouseEvent) event = new MouseEvent('click');
		else
		{
			event = document.createEvent('MouseEvents');
			event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		}
		aLink.dispatchEvent(event);
	}

	// 将一个sheet转成最终的excel文件的blob对象，然后利用URL.createObjectURL下载
	,'sheet2blob':function(sheet, sheetName) {
		sheetName = sheetName || 'sheet1';
		let workbook = {
			SheetNames: [sheetName],
			Sheets: {}
		};
		workbook.Sheets[sheetName] = sheet;
		// 生成excel的配置项
		let wopts = {
			bookType: 'xlsx', // 要生成的文件类型
			bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
			type: 'binary'
		};
		let wbout = XLSX.write(workbook, wopts);
		let blob = new Blob([s2ab(wbout)], {type:"application/octet-stream"});
		// 字符串转ArrayBuffer
		function s2ab(s) {
			let buf = new ArrayBuffer(s.length);
			let view = new Uint8Array(buf);
			for (let i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
			return buf;
		}
		return blob;
		} 
	};
	window.bigDataDown = _down;
})(window);