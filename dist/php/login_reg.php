<?php 
	//设置编码格式
	header("Content-type:text/html;charset=utf-8");
	/*
		总结：php链接数据的  天龙八部
	*/
	//1、链接数据库
	$link = mysql_connect("localhost", 'root', '123456');
	// var_dump($link)
	//2、判断链接是否成功
	if(!$link){
		echo "链接数据库失败";
		exit; //退出当前程序。
	}

	//3、设置字符集
	mysql_set_charset("utf8");

	//4、选择数据库
	mysql_select_db("sennheiser");

	//判断是登陆还是注册
	
	if($_GET['type'] == 'login'){
		//登录
		$username = $_POST['username'];
		$password = $_POST['password'];		
		//准备sql语句
		$sql = "SELECT * FROM users WHERE username='{$username}' AND password='{$password}';";

		//发送sql语句	
		$res = mysql_query($sql);
		//取出返回的数据
		$row = mysql_fetch_assoc($res);

		//查看数据库里是否有用户名
		if($row){
			echo "登录成功";
			exit;
		}else{
			echo "登录失败";
			exit;
		}

	}else{
		//注册
		$username = $_POST['username'];
		$password = $_POST['password'];
		$repassword = $_POST['repassword'];
		//判断两次密码是否一致
	
		if($password != $repassword){
			echo "两次密码不一致";
			exit;
		}
		//准备sql语句
		$sql = "SELECT * FROM users WHERE username='{$username}';";
	
		
		//发送sql语句	
		$res = mysql_query($sql);
		//取出返回的数据
		$row = mysql_fetch_assoc($res);
		//var_dump($row);
		if(!$row){
			//准备插入sql语句
			$sql = "INSERT INTO users(username,password) VALUES('{$username}','{$password}');";
			//发送sql语句
			$res = mysql_query($sql);
			if($res){
				echo "注册成功";
				//退出整个php程序
				exit;
			}else{
				echo "注册失败";
				exit;
			}

		}else{
			echo "用户名重复，注册失败";
			exit;
		}
	}	

	//8、关闭数据库
	mysql_close($link);
	
 ?>	