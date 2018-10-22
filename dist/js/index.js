
define(["jquery", "jquery-cookie"], function($){
	console.log("index.js加载");
	function newsList(){

			$.ajax({
				url: 'data/NewsList.json',
				type: "GET",
				success: function(res){
					// console.log(res);
					//将数据通过循环遍历，添加到页面上
					var html = "";
					var mutNum = 0;//用来记录是否变换html结构
					for(var i = 0; i < res.length; i++){

						if(mutNum == 4){
							mutNum = 0;
						}

						if(mutNum == 0 || mutNum == 1){
							html += `<li>
					                    <div class="img-wrap">
					                        <a href="">
					                            <img src="${res[i].img}" alt="">
					                            <div class="bg bg1"></div>
					                        </a>
					                    </div>
					                    <div class="text-wrap">
					                        <div class="text-inner">
					                            <p class="name"><a href="">${res[i].name}</a> </p>
					                            <p class="time">${res[i].time}</p>
					                            <p class="text">
					                                ${res[i].text}
					                            </p>
					                            <p class="more"><a href=""> more >></a></p>
					                        </div>
					                    </div>
					                </li>`;

					        mutNum ++;

						}else if (mutNum == 2 || mutNum == 3){
							html += `<li>
					                    <div class="text-wrap">
					                        <div class="text-inner">
					                            <p class="name"><a href="">${res[i].name}</a> </p>
					                            <p class="time">${res[i].tiem}</p>
					                            <p class="text">
					                                ${res[i].text} 
					                            </p>
					                            <p class="more"><a href=""> more >></a></p>
					                    	</div>
					                    </div>
					                    <div class="img-wrap">
					                        <a href="" style="right: 0">
					                            <img src="${res[i].img}" alt="">
					                            <div class="bg bg2"></div>
					                        </a>
					                    </div>
					                </li> `;

					        mutNum ++;

						}

					}

					$("#newsList").html(html);
					
				},
				error: function(msg){
					alert(msg);
				}
			})

	}

	//给ul添加事件委托
	//移入
	$("#newsList").on("mouseover", "li", function(){
		// alert(1);
		$(this).find(".name").css("color", "#1e96d4");
		$(this).find(".bg1").css("background", "url(images/index-news-bg-default.png),url(images/index-news-bg.png)");
		$(this).find(".bg2").css("background", "url(images/index-news-bg-default-r.png),url(images/index-news-bg-r.png)");


	});
	//移除
	$("#newsList").on("mouseout", "li", function(){
		$(this).find(".name").css("color", "#333333");
		$(this).find(".bg1").css("background", "url(images/index-news-bg-default.png)");
		$(this).find(".bg2").css("background", "url(images/index-news-bg-default-r.png)");
	});


	//主页顶部购物车内容显示与隐藏
/*
	function cartShow(){
		$("#user-car").hover(function(){
			// alert("移入了");
			
			//显示购物车的内容
			$("#user-car-product").css("display", "block");	



		}, function(){
			// alert("移出了");
			$("#user-car-product").css("display", "none");	

		});

	}

*/




	return {
		newsList: newsList,
		// cartShow: cartShow
	}
})