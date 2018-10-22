//商品详情页 数据加载

define(["jquery", "jquery-cookie"],function($){
	console.log("detail.js加载完毕");


	//获取列表页传来的id  (作用域大点，其他函数也要用)
	var index = location.search.indexOf("id=");
	// alert(location.search);
	// alert(index);
	
	// alert(typeof id);
	index += 3;

	var id =Number(location.search.slice(index));
	// alert(id);

	
	function detailData(){
		$(function(){
/*
			//获取列表页传来的id
			var index = location.search.indexOf("id=");
			// alert(location.search);
			// alert(index);
			
			// alert(typeof id);
			index += 3;

			var id = location.search.slice(index);
			// alert(id);

*/
			$.ajax({
				url: 'data/detail.json',
				type: "GET",
				success: function(res){
					// alert(res);
					//将数据通过循环遍历，添加到页面上
					var slideHtml = "";
					var detailHtml = "";
					var likeHtml = "";
					for(var i = 0; i < res.length; i++){
						// 找到对应商品的id
						if(res[i][0].id == id){
							// alert(res[i][0].id);
							//小轮播
							var count = 1;//用来记录第一张图
							for( key in res[i][1]){
								// alert(res[i][1][key]);	
								slideHtml += `<li class="slide-li"><img src="${res[i][1][key]}" alt=""></li>`;		
							
								if(count > 0){
									// 初始化 放大镜
									$("#zoom #small-box>img").attr("src", res[i][1][key]);

									$("#zoom #big-box>img").attr("src", res[i][1][key]);

									count --;									
								}


							}

							//商品详情大图
							for( key in res[i][2]){
								detailHtml += `<img src="${res[i][2][key]}" alt="">`;


							}
							//猜你喜欢
							for( key in res[i][3]){
								likeHtml += `<li class="like-item">
													<a href="">
														<div class="img-num">
															<img src="${res[i][3][key]}" alt="">
															<p class="price">￥<strong>799</strong></p>
														</div>
														<p class="name">Sennheiser CX 6.00BT 蓝牙入耳式耳机</p>
													</a>
												</li>`;	
							}


							






						}
			
						
					}

					$("#slide-ul").html(slideHtml);

					$("#deatil-body").html(detailHtml);

					$("#like-ul").html(likeHtml);





					//展示图片小于等于四张，不现实切换按钮
					
					var liNum = $("#slide-ul").find("li").size();
					if(liNum <= 4){
						$("#slide-up-btn").css("display", "none");
						$("#slide-down-btn").css("display", "none");
					}


					//调用切换函数（动态添加完成后调用）
					slideTab();





				},
				error: function(msg){
					alert(msg);
				}
			})





		})
	}	

	//动态设置a链接的href，有对应商品的id去请求shopCartRemind.html。

	function setAhref(){
		$(function(){
			// alert("执行了吗");
			$("#add-cart-btn").attr("href", `shopCartRemind.html?id=${id}`);
		});
	}

	


	//放大镜效果
	function zoom(){
		// alert(1);
		
		$(function(){


			// $(document).click(function(){
			// 	alert($(document).scrollTop());
			// });


			//移入移出

			$("#mark").hover(function(){
				// alert(1);
				$("#float-box").css("display", "block");
				$("#big-box").css("display", "block");
			},function(){
				// alert(2);
				$("#float-box").css("display", "none");
				$("#big-box").css("display", "none");
			})



			//鼠标移动事件

			$("#mark").mousemove(function(ev){
				// alert("移动了鼠标")
	
	
				//滚出高度
				var scrollHeight = $(document).scrollTop();		
					

				// 获取浮动在小图片上盒子的宽度
				var floatBoxWidth =  $("#float-box").outerWidth();
				var floatBoxHeight =  $("#float-box").outerHeight();
				// alert(floatBoxWidth);
	


				// 计算浮动在小图片上的元素的left值和top值，得计算 中间位置（鼠标一值在浮动元素的中间）
				var left = ev.clientX - $(this).offset().left - floatBoxWidth / 2;
				var top = ev.clientY + scrollHeight - $(this).offset().top - floatBoxHeight / 2;

				// document.title = left +","+ top;
				// document.title = $(this).offset().top;
				// document.title = ev.clientY;





				//限制出界
				// left最大值
				leftMax = $(this).outerWidth() - floatBoxWidth;
				// top最大值
				topMax = $(this).outerHeight() - floatBoxHeight;
				if(left < 0){ 
					left = 0;
				}else if(left > leftMax){
					left = leftMax;
				}

				if(top < 0){
					top = 0;
				}else if(top > topMax){
					top = topMax;
				}

				// document.title = left +","+ top;


				// 设置left和top值

				$("#float-box").css("left", left);
				$("#float-box").css("top", top);


				//计算百分比，等比例移动大图片

				var percentX = left / leftMax;
				var percentY = top / topMax;


				//计算大图img最大宽度、高度
				
				var bigImgLeftMax = $("#big-box img").outerWidth() - $("#big-box").outerWidth();
				var bigImgTopMax = $("#big-box img").outerHeight() - $("#big-box").outerHeight();



				//设置大图img的left值和top值（反向，值是负的）

				var bigImgLeft = -percentX * bigImgLeftMax;
				var bigImgTop = -percentY * bigImgTopMax; 


				$("#big-box img").css("left", bigImgLeft);
				$("#big-box img").css("top", bigImgTop);



			});


		});



	}

//放大镜图片动态切换效果

	function zoomImgTab(){

		$(function(){

			$("#slide-ul").on("mouseenter", "li", function(){
				// alert(1);
								
				// alert($(this).index());
				// 获取图片的src属性
				var imgSrc = $(this).find("img").attr("src");

				// alert(imgSrc);
				//把获取的src给展示图片，和放大镜用
				$("#zoom #small-box>img").attr("src", imgSrc);

				$("#zoom #big-box>img").attr("src", imgSrc);

			});




		});


	}

	//预览图切换函数
	function slideTab(){

		$(function(){

			// 获取slide-ul下的所有li标签

			var aLis = $("#slide-ul").find("li");
			//上一张
			$("#slide-up-btn").click(function(){
				// alert(aLis.size());
				// alert("点我了");
				// 获取当前ul的left值
				var curLeft = parseInt($("#slide-ul").css("left"));
				// alert(curLeft);
				var absCurleft = Math.abs(curLeft);
				//判断是否到边,到边后切换left=0；
				if(curLeft == 0){
					// alert("到边了");
					// 可视区域有四张图
					curLeft = (aLis.size() - 4) * -120;
					
				}else{
					curLeft += 120;
				}



/*
				// 计算下一张left值
				curLeft -= 120;*/

				// alert(curLeft);
				$("#slide-ul").stop().animate({
					left: curLeft
				}, 500);

			});

			//下一张
			$("#slide-down-btn").click(function(){
				// alert("点我了");
				// 获取当前ul的left值
				var curLeft = parseInt($("#slide-ul").css("left"));
				// alert(curLeft);
				var absCurleft = Math.abs(curLeft);
				//判断是否到边,到边后切换left=0；
				if(absCurleft + 4 * 120  == aLis.size() * 120){
					// alert("到边了");
					curLeft = 0;
					
				}else{
					curLeft -= 120;
				}



/*
				// 计算下一张left值
				curLeft -= 120;*/

				// alert(curLeft);
				$("#slide-ul").stop().animate({
					left: curLeft
				}, 500);

			});




		});


	}
	//调用切换函数
	// slideTab();




	//有关加入购物车

	function addCart(){

		// alert(id);

		// alert("addCart");
		
		//商品数量增加
		
		$("#add-btn").click(function(){
			var inputValue =  $("#num-input").attr("value");
			// alert(++inputValue);
			inputValue++;
			$("#num-input").attr("value", inputValue);
		});


		//减少

		$("#cut-btn").click(function(){
			var inputValue =  $("#num-input").attr("value");
			// alert(++inputValue);
			inputValue--;

			if(inputValue <= 1){
				inputValue = 1;
			}
			$("#num-input").attr("value", inputValue);
		});


		//加入购物车按钮事件
		
		$("#add-cart-btn").click(function(){
			// alert("加入购物车按钮");
			var inputValue =Number($("#num-input").attr("value"));
			// alert(typeof inputValue);
			// alert(inputValue);
			//1、判断是否是第一次添加
			var first = $.cookie("goods") == null ? true : false;
			// alert(typeof id);
			// alert(first);
			if(first){
				//第一次添加，直接将cookie存储进去
				$.cookie("goods", `[{id:${id},num:${inputValue}}]`, {
					// 过期时间
					expires: 7,
					//是否不编码
					// raw: true
					raw: true
				});
			}else{
				//如果添加过cookie
				var cookieStr = $.cookie("goods");
				var arr = eval(cookieStr);
				var same = false;
				for(var i = 0; i < arr.length; i++){
					if(arr[i].id == id){
						// alert(arr[i].num);
						arr[i].num = inputValue;

						same = true;

						break;
					}
				}
				//cookie里没有相同的商品	
				if(!same){
					var obj = {id: id, num: inputValue};

					arr.push(obj);
				}
			


				//重写cookie
				
				$.cookie("goods", JSON.stringify(arr), {
					expires: 7,
					// raw: true
					raw: true					
				});

			}




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

			sc_car();



		});









	}





	return {
		detailData: detailData,
		zoom: zoom,
		zoomImgTab: zoomImgTab,
		addCart: addCart,
		setAhref: setAhref	
	}

});
