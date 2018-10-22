//热卖推荐 数据加载

define(["jquery", "jquery-cookie"],function($){
	console.log("hotData.js加载完毕");
	function hotData(){
		$(function(){
			$.ajax({
				url: 'data/HOT.json',
				type: "GET",
				success: function(res){
					// alert(res);
					//将数据通过循环遍历，添加到页面上
					var hotPanelTitle = "";
					var html = "";
					for(var i = 0; i < res.length; i++){

						// alert(res[i].price);

						hotPanelTitle = res[i].type;

						html += `<li class="item">
									<a href="detailPage.html?id=${res[i].id}">
										<img src="${res[i].imgA}" class="img" alt="">
										<!-- 下边 -->
										<div class="info-box">
											<h6 class="name">${res[i].nameA}</h6>
											<p class="info">${res[i].infoA}</p>
										</div>
										<!-- 悬浮 -->
										<div class="suspension-box">
											<div class="img-wrap">
												<img src="${res[i].imgB}" alt="">
											</div>
											<div class="text-wrap">
												<p class="name">${res[i].nameB}</p>
												<p class="name">${res[i].infoB}</p>
												<p class="price">￥<strong>${res[i].price}</strong></p>
											</div>
										</div>
									</a>
								</li>`;							
						
					}

					$("#hot-panel h3").html(hotPanelTitle);

					$("#hot-list").html(html);
					
				},
				error: function(msg){
					alert(msg);
				}
			})

		})
	}	

	return {
		hotData: hotData
	}

});
