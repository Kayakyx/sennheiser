define(["jquery", "jquery-cookie"], function($){

	console.log("nav.js加载完成");
	function navData(){


			$.ajax({
				url: 'data/nav.json',
				type: "GET",
				success: function(res){
					// alert(res);
					//将数据通过循环遍历，添加到页面上
					// liNum = res.length + 2;
					var html = "";
					var htmlLi = "";
					for(var i = 0; i < res.length; i++){
						//同时动态设置li的width百分比
						// html += `<li style="width: ${1 / (res.length + 2) * 100}%"><a href="#"><img src="${res[i]}"" alt="广告" /></a></li>`;
						var navNum = parseInt(res[i].navNum);

						// 判断数据中是否有下拉菜单
						if(res[i].select == "1"){
							//alert("you")
							

							for(var j = 1; j <= navNum; j++){
								var navIndex = "nav" + j;
								//alert(navIndex);
								// alert(res[i].nav1)
								// alert(res[i][navIndex]);
								/*用res[i].navIndex 的形式动态拿不到 json数据里的 nav1 属性 和 nav2 属性，这种方式写，
								它会去json数据里面 找 navIndex属性。
								可以用res[i][navIndex]  的形式动态拿到 json数据里的 nav1 属性 和 nav2 属性,因为在对象里. 点可以 换成 []中括号
								*/
								htmlLi += `<li class="item"><a href="">${res[i][navIndex]}</a></li>`;
							}
							// console.log(htmlLi);
							//alert(navNum)
							
							// alert(res[i].img1);
							// alert(res[i].img4)
							html += `<li class="nav-li">
										<a href="">${res[i].type}<i class="icon-arrow"></i></a>
										<div class="sub-nav-box"> 
											<div class="public-container"> 
												<div class="left-list">
													<ul class="ul-list">
														${htmlLi}
														<li class="more"><a class="more-btn" href="goodslist.html"><span class="btn-text">浏览全部</span><i class="icon-arrow-next"></i></a></li>
													</ul>
												</div>
												<div class="right-banner">
													<ul class="ul-list">
														<li class="item"><a href="">
															<img src="${res[i].img1}" alt="">
															<p class="info">${res[i].info1}</p>
															</a>

														</li>
														<li class="item"><a href="">
															<img src="${res[i].img2}" alt="">
															<p class="info">${res[i].info2}</p>
															</a>

														</li>
														<li class="item"><a href="">
															<img src="${res[i].img3}" alt="">
															<p class="info">${res[i].info3}</p>
															</a>

														</li>
														<li class="more"><a href="">
															<img src="${res[i].img4}" alt="">
															<p class="info">${res[i].info4}</p>
															</a>

														</li>
													</ul>
												</div>
											</div>					
										</div>
									</li>`;

							//htmlLi 插入到 html中后，要清空方便下一次记录
							htmlLi = "";


						}else{
							//alert("wu")
							//没有下拉列表和导航条箭头的html
							
							html += `<li class="nav-li">
										<a href="">${res[i].type}</a>
									</li>`;							

						}
					
						
					}

					// alert(html);
					$("#public-nav").html(html);

					
				},
				error: function(msg){
					alert(msg);
				}
			})



	}

	//导航选项卡
	function navTab(){

		// var onNavLi = 0;//记录上一滑过的.nav-li的下标

		//利用事件委托添加
		$("#public-nav").on("mouseenter", ".nav-li", function(){

			// onNavLi = $(this).index();

			// alert($(this).index());

			// $("#public-nav").find(".nav-li").eq($(this).index()).css("display", "block");
			// alert( $("#public-nav").find(".nav-li").eq(1));
			//alert( $("#public-nav").find(".nav-li").eq($(this).index()).html());
			
					// // 导航条字体颜色和箭头变化
			$("#public-nav").find(".nav-li").eq($(this).index()).find(">a").css("color", "#0085bf");

			$("#public-nav").find(".nav-li").eq($(this).index()).find(">a>.icon-arrow").css("transform", "rotate(-180deg)");

			//找到对应下标的下拉菜单盒子

			var thisNav = $("#public-nav").find(".nav-li").eq($(this).index()).find(".sub-nav-box");

			thisNav.stop().animate({height: 340});


		});

		$("#public-nav").on("mouseleave", ".nav-li", function(){

			$("#public-nav").find(".nav-li").eq($(this).index()).find(">a").css("color", "#494949");

			$("#public-nav").find(".nav-li").eq($(this).index()).find(">a>.icon-arrow").css("transform", "rotate(0deg)");

			
			
			var thisNav = $("#public-nav").find(".nav-li").eq($(this).index()).find(".sub-nav-box");
	
			thisNav.stop().animate({height: 0});

		});


	}

	navTab();

	return {
		navData: navData
	}

});