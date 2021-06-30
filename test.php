<?php 
$page = $_GET['page'];
$arr['total_page'] = 10;
$arr['header']=array('a','b','c');
$arr['data'] = array(
	array('name'=>"张三",'age'=>11,'date'=>22,'ord'=>33),
	array('name'=>"李三2",'age'=>111,'date'=>222,'ord'=>333),
	array("李三3",111,222,333)
);
echo json_encode($arr);