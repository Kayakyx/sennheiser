//轮播数据请求
define(["jquery", "jquery-cookie"], function($){
	console.log("slide.js加载");

	function slide(){
		// $(function(){
			$.ajax({
				url: 'data/slide.json',
				type: "GET",
				success: function(res){
					// alert(res);
					//将数据通过循环遍历，添加到页面上
					// liNum = res.length + 2;
					var html = "";
					var liF = "";//用来记录第一张请求的图片信息。
					var liL = "";//用来记录最后一张请求的图片信息。
					for(var i = 0; i < res.length; i++){

						//同时动态设置li的width百分比
						html += `<li style="width: ${1 / (res.length + 2) * 100}%"><a href="detailPage.html?id=${res[i].id}"><img src="${res[i].img}"" alt="广告" /></a></li>`;

						if(i == 0){
							liF = html;
						}else if(i == res.length - 1){
							liL = `<li style="width: ${1 / (res.length + 2) * 100}%"><a href="detailPage.html?id=${res[i].id}"><img src="${res[i].img}"" alt="广告" /></a></li>`;
						}
						
					}

					// html += li1;
					html = liL + html + liF;
					// alert(html);
					$("#play ul").html(html);

					//数据加载完毕后调用轮播特效函数
					slidePlay();
					
				},
				error: function(msg){
					alert(msg);
				}
			})

		// })
	}

	//轮播效果
	function slidePlay(){
		console.log("这里是循环滚动代码");
			$(function(){

				var oBtnL = $("#play").find(".prev-btn");
				var oBtnR = $("#play").find(".next-btn");

				var oUl = $("#play").find("ul");

				var aLis = oUl.find("li");

				/*alert(aLis.length);
				alert(aLis.size());*/

				//js方式获取ul（用来设置百分比）jq不能
				
				var oUlJs = document.getElementById('play-ul');


				oUlJs.style.width = `${aLis.size() * 100}%`;

				//设置iNow，代表当前显示图片的下标
				var iNow = 0;
				var timer = null;

				//获取浏览器可视区域宽度
				var windowWidth = $(window).width();

				//页面改变重设windowWidth
				$(window).resize(function(){
					windowWidth = $(window).width();
					// alert(windowWidth);

				});

// 新

				resetTab(); //初始化,让他显示第一张图片

				oBtnL.click(function(){
					iNow--;
					// document.title = iNow;

					tab();

					return false;
				});

				oBtnR.click(function(){

					iNow++;
					// document.title= iNow;
					tab();

					return false;
				});


				//添加自动滚动
				timer = setInterval(timerInner, 2000);


				//鼠标移入 移出
				$("#play").hover(function(){//移入清楚计时器
					clearInterval(timer);
				}, function(){//移除重开计时器
					timer = setInterval(timerInner, 2000);
				})



				function timerInner(){
					iNow++;
					// document.title = iNow;
					tab();
				}

				//点击切换图片
				function tab(){


					//2、切换图片
					oUl.stop().animate({
						left: -windowWidth * iNow
					}, 500, function(){
						if(iNow == aLis.size() - 1){
							oUl.css("left", -windowWidth);
							iNow = 1;
						}else if(iNow == 0){
							//计算意义上（html结构中是倒数第二张）最后一张图片ul 要偏移的距离
							var offset = -windowWidth * (aLis.size() -2);
							//动画结束后迅速切到意义上的最后一张图片
							oUl.css("left", offset);
							iNow = aLis.size() - 2;//7
						}
					});
				}
				//初始化轮播动画，移动一次图片让它显示 html结构中是第二张图片
				function resetTab(){
					oUl.stop().animate({
						left: -windowWidth
					}, 0, function(){
						iNow++;
					});
				}



			})

	}


	return {
		slide: slide
	}
})

