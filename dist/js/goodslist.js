define(["jquery", "jquery-cookie"], function($){

	console.log("goodslist.js加载完成");

	function goodslist(){
		// alert("goodslist函数执行了");

		$(function(){
			$.ajax({
				url: 'data/goodslist.json',
				type: "GET",
				success: function(res){
					// alert(res);
					//将数据通过循环遍历，添加到页面上
					// var hotPanelTitle = "";
					var html = "";
					for(var i = 0; i < res.length; i++){

						// alert(res[i].price);

						html += `<li class="list-item"> 

				                    <section class="wrap-a">  
				                   		 <a href="detailPage.html?id=${res[i].id}">
					                        <div class="img-wrap">
					                        	<img  src="${res[i].img}" alt="">
					                        </div>
					                        <div class="text-wrap">
						                            <p class="name">${res[i].name}</p>
						                            <p class="tool">
						                                    <span class="price">￥<strong>${res[i].price}</strong></span>
						                                <span class="number">已售 <em class="num">${res[i].soldNum}</em> 件</span>
						                            </p>
				                           
					                        </div>
					                    </a>
			                            <div class="cart-box">
			                                <span class="add-cart" id="${res[i].id}"><i class="icon-cart"></i>加入购物车</span>
			                            </div>

				                    </section>

								</li>`;	






						
					}

					$("#goodslist").html(html);
					
				},
				error: function(msg){
					alert(msg);
				}
			})



			//事件委托，给异步加载的控件添加事件
			$("#goodslist").on("click", ".add-cart", function(){
				// alert("点击事件执行了");

				// ballMove(this);

				var id = this.id;
				//加入购物车 约定 goods=[{id:1,num:2},{id:2,num:1}]
				//1、判断是否是第一次添加
				var first = $.cookie("goods") == null ? true : false;
				if(first){
					//第一次添加，直接将cookie存储进去
					$.cookie("goods", `[{id:${id},num:1}]`, {
						// 过期时间
						expires: 7,
						//是否不编码
						// raw: true
						raw: true
					});
				}else{
					//2、判断之前是否添加过商品
					var cookieStr = $.cookie("goods");
					var arr = eval(cookieStr);  //eval(必须是外层是数组，元素是对象) 和 JSON.parse()
					var same = false; //假设没有添加过
					for(var i = 0; i < arr.length; i++){
						if(arr[i].id == id){
							//3、之前存储过数量+1
							arr[i].num++;
							same = true;
							break;
						}
					}
					if(!same){
						//4、没有相同的
						var obj = {id: id, num: 1};
						arr.push(obj);
					}
					$.cookie("goods", JSON.stringify(arr), {
						expires: 7,
						// raw: true
						raw: true
					});
				}
				sc_car();


				


				//打开 添加成功提醒界面，并将商品的id传出去。
				window.location.href=`shopCartRemind.html?id=${id}`;




			})

			//除了按钮点时要调用sc_car ,刚加载完页面也要调用一次
			sc_car();
			//购物车内商品数量
			function sc_car(){
				// alert("购物车数量函数执行了");

				var sc_str = $.cookie("goods");
				// alert(sc_str);
				if(sc_str){
					var sc_arr = eval(sc_str);
					// console.log(sc_arr);
					//用来计算cookie内商品总个数
					var unitSum = 0;
					// alert(sc_arr.length);
					for(var i = 0; i < sc_arr.length; i++){
						// alert(1);
						unitSum += sc_arr[i].num;
					}

					$("#user-car .numValue").html(unitSum);
					$("#user-car-product .all-price .num1").html(unitSum);

				}
			}

			//把用户添加的商品，添加到展示商品的html结果里
			function sc_msg(){
				$.ajax({
					url: "data/goodslist.json",
					type: "get",
					success: function(res){
						var sc_arr = eval($.cookie("goods"));

						var html = '';
						//用来计算商品的总价
						var total = 0;

						if(sc_arr){

							

							for(var i = 0; i < sc_arr.length; i++){



								html += `<li class="product-item">
											<div class="item-img"><a href=""><img src="${res[sc_arr[i].id].img}" alt=""></a></div>
											<div class="item-text">
												<p class="info"><a href=""><span class="type">${res[sc_arr[i].id].name}</span><span class="price">${res[sc_arr[i].id].price}</span></a></p>
												<a href="#" class="delete-btn">删除</a>
											</div>
										</li>`;
								// alert(res[sc_arr[i].id].price);
								var price = (res[sc_arr[i].id].price).substring(1);//提取字符串中的价格 json格式为 ￥200 形式
								// alert(price); 
								// 转成整形
								price = parseInt(price);//单价
								// alert(price);
								total += price * sc_arr[i].num; //单价乘以数量 等于一个商品的总价


							}
							//添加到html结构里
							$("#user-car-product").find(".product-list").html(html);

							$("#user-car-product .all-price .num2").html("￥" + total);//拼接个人民币符号￥

			
						}


						//判断商品是否全部删除了(goods,cookie为空的时候)
						
						if(sc_arr.length == 0){//全部删除了，就移除本站的goods，cookie。
							// alert("一个商品也没了");
											// 重设cookie
							$.cookie("goods", JSON.stringify(sc_arr), {
								expires: -1,//删除cookie

							});
							
						}



					},




					error: function(msg){
						alert(msg);
					}					


				})
			}



			//给删除键添加点击事件(移除商品)
			
			$("#user-car-product .product-list").on("click",".delete-btn",function(){
				// alert("点删除了");
				
				var oLi = $(this).parent().parent();//获取爷爷级的li标签

				//删除当前元素（商品）
				// $(oLi).remove();

				// alert(oLi.index());				
				//li的在父元素的下标，刚好等于cookie里数组元素的顺序

				var deleteIndex = oLi.index();//获取要删除的数组元素下标

				//获取cookie结构，并转换为数据结构
				var sc_arr = eval($.cookie("goods"));
				//删除对应下标位置的 cookie数组元素
				sc_arr.splice(deleteIndex, 1);


				// alert(JSON.stringify(sc_arr));

				// 重设cookie
				$.cookie("goods", JSON.stringify(sc_arr), {
					expires: 7,
					// raw: true
					raw: true
				});
					

				//调用函数重建购物车商品列表
				sc_msg();

				//重新将计算数量和总价
				sc_car();

				// $("#user-car-product").css("display", "none");	
				// $("#user-car-product").css("display", "block");	







			});




			//主页顶部购物车内容显示与隐藏

			$("#user-car").hover(function(){

				// alert("移入了");

				//获取显示框的状态
				var status = $("#user-car-product").css("display");	
				// alert(status);

				//如果展示框为不显示的状态时，采用鼠标移入的方式调用
				if( status == "none"){
					sc_msg();
				}



				
				//显示购物车的内容
				$("#user-car-product").css("display", "block");	

				//调用动态添加商品内容的函数


			}, function(){
				// alert("移出了");
				$("#user-car-product").css("display", "none");	


			});






		})




	}
/*

	//主页顶部购物车内容显示与隐藏

	function cartShow(){
		$("#user-car").hover(function(){
			// alert("移入了");
			
			//显示购物车的内容
			$("#user-car-product").css("display", "block");	

			//调用动态添加商品内容的函数

			sc_msg();

		}, function(){
			// alert("移出了");
			$("#user-car-product").css("display", "none");	

		});

	}

*/






	return {
		goodslist: goodslist,
		// cartShow: cartShow
	}

});