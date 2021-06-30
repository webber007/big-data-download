<?php 
//$page = isset($_GET['page'])?(int)$_GET['page']:1;
//根据获取到的page返回该页数据给前端
//$start = ($page-1)*$limit;
//$limit = 1000;
//$sql = "select name,age,birth from user limit $start,$limit";

//表头
sleep(1);
$arr['header']=array('姓名', '年龄', '生日');
$arr['total_page'] = 10;
$arr['data'] = array(
	array('name'=>"张三",'age'=>20,'birth'=>'2001-05-01'),
	array('name'=>"李四",'age'=>21,'birth'=>'2000-05-01'),
	array('王五', 23, '1999-10-01')
);
echo json_encode($arr);