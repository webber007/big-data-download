!function(e){const t={totalPage:1,currentPage:1,downAoa:[],url:"",downName:"",isCancel:!1,downExcel:function(t,n){this.downName=n;let o=document.getElementById("loading");o||(o=document.createElement("div")),o.id="loading",o.innerHTML='<DIV STYLE="BORDER: buttonhighlight 1px outset; FONT-SIZE: 14px; Z-INDEX:4; FONT-FAMILY: Tahoma; POSITION: absolute; BACKGROUND-COLOR: #fff;WIDTH: 350px;left:50%;top:10%;margin-left:-175px; CURSOR: default" ID="divProgressDialog" onselectstart="root.event.returnValue=false;"><DIV STYLE="PADDING: 8px; FONT-WEIGHT: bolder; COLOR:#FFF;BORDER-BOTTOM: white 2px groove; BACKGROUND-COLOR: #409EFF">      导出数据</DIV><DIV STYLE="PADDING: 5px">      正在生成数据，请等待.....</DIV><DIV STYLE="PADDING: 5px">      这个过程可能需要几分钟</DIV><DIV STYLE="PADDING: 5px"><DIV ID="divProgressOuter" STYLE="BORDER: 1px solid threedshadow;WIDTH: 336px; HEIGHT: 25px"><DIV ID="divProgressInner" STYLE="COLOR: white; TEXT-ALIGN:center; BACKGROUND-COLOR: GREEN; MARGIN: 0px; WIDTH: 0px; HEIGHT:25px;"></DIV></DIV></DIV><DIV STYLE="BORDER-TOP: white 2px groove; PADDING-BOTTOM: 5px; PADDING-TOP: 3px;BACKGROUND-COLOR: buttonface; TEXT-ALIGN: center;margin-top: 7px;"><INPUT STYLE="FONT-FAMILY: Tahoma; FONT-SIZE: 14px;" TYPE="button" ID="btnCancel" onclick="bigDataDown.stopProcess();" VALUE="取 消"></DIV></DIV>';let a=this;a.url=t.indexOf("?")>-1?t+"&page=":t+"?page=",e.document.body.appendChild(o),a.AjaxJson(a.url+a.currentPage).then((function(e){if(document.getElementById("divProgressInner").style.width=1/e.total_page*336+"px",e.hasOwnProperty("header")&&a.downAoa.push(e.header),e.hasOwnProperty("total_page")||(e.total_page=1),e.hasOwnProperty("data")){for(let t in e.data){let n=[];for(let o in e.data[t])n.push(e.data[t][o]);a.downAoa.push(n)}a.totalPage=e.total_page,a.totalPage>1?(a.currentPage+=1,a.doWork()):a.dataToExcel()}else e.data=e}))},stopProcess:function(){this.isCancel=!0},getTimeName:function(){let e=new Date;return e.getYear()+e.getMonth()+e.getHours()+e.getMinutes()+e.getSeconds()},dataToExcel:function(){let e=""==this.downName?this.getTimeName():this.downName;this.openDownloadDialog(this.sheet2blob(XLSX.utils.aoa_to_sheet(this.downAoa)),e+".xlsx");let t=document.getElementById("loading");t.parentNode.removeChild(t)},doWork:function(){var e=this;e.AjaxJson(e.url+e.currentPage).then((function(t){if(e.currentPage+=1,e.isCancel){let e=document.getElementById("loading");return e.parentNode.removeChild(e),!1}if(e.currentPage>e.totalPage)e.dataToExcel();else{document.getElementById("divProgressInner").style.width=e.currentPage/e.totalPage*336+"px";for(let n in t.data){let o=[];for(let e in t.data[n])o.push(t.data[n][e]);e.downAoa.push(o)}e.doWork()}}))},AjaxJson:function(t){return new Promise(((n,o)=>{if(e.XMLHttpRequest)var a=new XMLHttpRequest;else a=new ActiveXObject("Microsoft.XMLHTTP");a.open("GET",t,!0),a.send(),a.onreadystatechange=function(){if(4==a.readyState)if(200==a.status){let e=new Function("return "+a.responseText)();n(e)}else o()}}))},openDownloadDialog:function(t,n){"object"==typeof t&&t instanceof Blob&&(t=URL.createObjectURL(t));let o,a=document.createElement("a");a.href=t,a.download=n||"",e.MouseEvent?o=new MouseEvent("click"):(o=document.createEvent("MouseEvents"),o.initMouseEvent("click",!0,!1,window,0,0,0,0,0,!1,!1,!1,!1,0,null)),a.dispatchEvent(o)},sheet2blob:function(e,t){let n={SheetNames:[t=t||"sheet1"],Sheets:{}};n.Sheets[t]=e;let o=XLSX.write(n,{bookType:"xlsx",bookSST:!1,type:"binary"});return new Blob([function(e){let t=new ArrayBuffer(e.length),n=new Uint8Array(t);for(let t=0;t!=e.length;++t)n[t]=255&e.charCodeAt(t);return t}(o)],{type:"application/octet-stream"})}};e.bigDataDown=t}(window);