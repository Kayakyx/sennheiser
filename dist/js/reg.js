define(["jquery"], function($){
	console.log("reg.js加载完毕");

	//登录注册

	function regLogin(){



		$(function(){

			// alert(Boolean(""));

			var yzm = testCodeWithStr(6);
			$("#yzm-code").html(yzm);

			//点击更换验证码

			$("#yzm-code").click(function(){
				yzm = testCodeWithStr(6);
				$("#yzm-code").html(yzm);

			});


			// 注册页面用户输入格式验证

			$("#register").click(function(){


				//获取用户输入的值
				var phoneNum = $("#txtCellPhone").val();

				//用户输入的验证码
				var userYzm = $("#txtYXYZM").val();
				//第一次输入的密码
				var psw1 = $("#psw").val();
				//第二次用户输入的密码
				var psw2 = $("#repassword").val();

				if(!/^[1-3]\d{10}$/.test(phoneNum)){
					// alert("手机格式不正确");	
					//自定义弹窗
					alertAuto("手机格式不正确");

					
				}else if(userYzm.toLowerCase() != yzm.toLowerCase()){//都转成小写
					// alert("验证码错误");

					//自定义弹窗
					alertAuto("验证码错误");

					//失败刷新验证码
					yzm = testCodeWithStr(6);
					$("#yzm-code").html(yzm);

				}else if(!(psw1 & psw2)){
					// alert("密码不能为空");
					//自定义弹窗
					alertAuto("密码不能为空");
	

				}else if(!/^\w{6,18}$/.test(psw1)){//判断密码格式是否正确
					// alert("密码由6~18位字母、数字、下划线组成");
					
					//自定义弹窗
					alertAuto("密码由6~18位字母、数字、下划线组成");

				}else if(psw1 != psw2){//判断两次输入的是否一致
					// alert("两次输入的密码不一致");
	
					//自定义弹窗
					alertAuto("两次输入的密码不一致");



				}else{//格式正确传入后台
					regSend();
				}




			});

			//注册数据发送函数
			function regSend(){
				var str = `username=${$("#txtCellPhone").val()}&password=${$("#psw").val()}&repassword=${$("#repassword").val()}`;
				// alert(str);
				//登录
				$.ajax({
					url: "php/login_reg.php?type=register",
					type: "POST",
					data: str,
					success: function(res){
						alertAuto(res);
					},
					error: function(msg){
						// alert(msg);
					}
				});


			}

			//用户登录验证
			$("#login").click(function(){
				// alert("登录按钮");
				var username = $("#username").val();				
				var password = $("#password").val();				
				var txtYXYZM = $("#txtYXYZM").val();				

				/*alert(txtYXYZM.toLowerCase());
				alert(yzm.toLowerCase());*/
				if(!username){
					alertAuto("用户名不能为空");

				}
				else if(txtYXYZM.toLowerCase() != yzm.toLowerCase()){
					alertAuto("验证码不正确");

				}else{
					loginSend();
				}	


				//更新验证码
				yzm = testCodeWithStr(6);
				$("#yzm-code").html(yzm);


			});			






			//登录数据发送函数
			function loginSend(){
				var str = `username=${$("#username").val()}&password=${$("#password").val()}`;
				// alert(str);
				//登录
				$.ajax({
					url: "php/login_reg.php?type=login",
					type: "POST",
					data: str,
					success: function(res){
						// alert(res);

						if(res == "登录成功"){
							alertAuto("登录成功");
							//3s后返回上一个页面
							var timer = setTimeout(function(){
								history.back();
								clearTimeout(timer);
							}, 3000);
						}else{
							alertAuto("无效的用户名或密码");
						}



					},
					error: function(msg){
						// alert(msg);
					}
				});

			}



			//弹窗函数(自适应宽度)
			function alertAuto(str){

				// alert("调用了");
				//获取默认宽度
				var txtWidth =parseInt($("#alert .txt").css("min-width"));
				// alert(txtWidth);

				//设置文本内容
				 $("#alert .txt").html(str);

				//显示弹窗
				$(".alert-bg").css("display", "block");
				
				$("#alert").css("display", "block");

				//计算新宽度（display为 none的时候，获取不到元素的宽度，所以显示再设置宽度）				 
				 var newTxtWidth = $("#alert .txt").width();
				 // alert(newTxtWidth);
				//变化量
				var change = newTxtWidth - txtWidth;	

				// alert(change);	

				// 把变化量添加给父元素（弹窗总宽度）

				var alertWidth = parseInt($("#alert").css("width")) + change;			

				// alert(alertWidth);

				//弹窗的宽度随内容的增加而增宽
				// alert($("#alert"));
				// 重设宽度
				$("#alert").css("min-width",alertWidth);


				//弹窗关闭事件
				//点击右上角X隐藏
				$("#alert .close").click(function(){
					// alert(1);
					$(".alert-bg").css("display", "none");		
					$("#alert").css("display", "none");	
					//恢复弹窗初始宽度，方便下次计算
					$("#alert").css("min-width",200);

				});
				//点击确认隐藏
				$("#alert .alert-btn-a").click(function(){
					$(".alert-bg").css("display", "none");		
					$("#alert").css("display", "none");	
					//恢复弹窗初始宽度，方便下次计算
					$("#alert").css("min-width",200);				
				});


			}








/*
			//立即登录
			
			$("#login").click(function(){
				// alert("点登陆了");
				// var str = `username=${$('name=username')[0].value}&password=${$('name=password')[0].value}`
				var str = `username=${$("#username").val()}&password=${$("#password").val()}`;
				// alert(str);
				//登录
				$.ajax({
					url: "php/login_reg.php?type=login",
					type: "POST",
					data: str,
					success: function(res){
						// alert(res);

						if(res == "登录成功"){
							history.back();
						}



					},
					error: function(msg){
						// alert(msg);
					}
				});


			});
		

			//注册
			$("#register").click(function(){
				// alert("点登陆了");
				var str = `username=${$("#txtCellPhone").val()}&password=${$("#psw").val()}&repassword=${$("#repassword").val()}`;
				// alert(str);
				//登录
				$.ajax({
					url: "php/login_reg.php?type=register",
					type: "POST",
					data: str,
					success: function(res){
						alert(res);
					},
					error: function(msg){
						// alert(msg);
					}
				});


			});
		
*/



		});


		//随机n位有大小写英文和数组的字符串(验证码)
		function testCodeWithStr(n){
			var arr = [];
			for(var i = 0; i < n; i++){
				var num = parseInt(Math.random() * 100);
				if(num >= 0 && num <= 9){
					arr.push(num);
				}else if(num >= 65 && num <= 90){
					var str = String.fromCharCode(num);
					arr.push(str);
				}else if(num >= 17 && num <= 42){
					var str = String.fromCharCode(num + 80);
					arr.push(str);
				}else{
					//随机出来没有用的数字，i--让他多循环一次。
					i--;
				}
			}
			return arr.join("");
		}



		






	}


	return {
		regLogin: regLogin
	}


});