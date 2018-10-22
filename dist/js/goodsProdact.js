define(["jquery", "jquery-cookie"], function($){

	console.log("goodsProdact.js加载完成");

	function goodsProdact(){


			$.ajax({
				url: 'data/goodsProdact.json',
				type: "GET",
				success: function(res){

					// console.log(res);
					// 将数据通过循环遍历，添加到页面上
					// liNum = res.length + 2;
					var html = ""; //记录最后的html结构

					var htmlBigBox = "";
					var htmlSmallBox = "";
					var htmlSlideLi = "";

					var liF = "";

					var liL = "";

					var htmlLi = "";

					for(var i = 0; i < res.length; i++){







						for(var j = 0; j < res[i].length; j++){
							// alert(res[i][j].type);
						
							// alert(res[i][j].img1);

							var imgNum = parseInt(res[i][j].imgNum);
							// alert(imgNum);
							
							// 判断不是第一对象
							if( j != 0){

								for(var k = 1; k <= imgNum; k++){

									//用来记录img几。
									var imgIndex = "img" + k;

									htmlSlideLi += `<li class="slide-item">
														<a href="detailPage.html?id=${res[i][j].id}"><img src="${res[i][j][imgIndex]}" alt=""></a>
													</li>`;


								}




								//拿到第一li和最后一个li
								if(imgNum > 1){
									liF = `<li class="slide-item">
												<a href="detailPage.html?id=${res[i][j].id}"><img src="${res[i][j].img1}" alt=""></a>
											</li>`;
									var imgLast = "img" + imgNum; 
									liL = `<li class="slide-item">
												<a href="detailPage.html?id=${res[i][j].id}"><img src="${res[i][j][imgLast]}" alt=""></a>
											</li>`;
									// alert(liL);

									// alert(liF);
									
									// 如果有第一个li和最后一个li 就拼接到 htmlSlideLi上
									htmlSlideLi = liL + htmlSlideLi + liF;




								}

								// alert(htmlSlideLi);



								//原来+=
								htmlSmallBox += `<li class="item">
													<div class="img-wrap">
														<!-- img视窗 -->
														<div class="slide-viewport">
															<ul class="slide">
															
																${htmlSlideLi}		
																
															</ul>
														</div>
														<a href="javascript:;" class="prev-btn"></a>
														<a href="javascript:;" class="next-btn"></a>
													</div>
													<div class="text-wrap">
														<a href="detailPage.html?id=${res[i][j].id}">
															<h4 class="name">${res[i][j].name}</h4>
															<p class="price">￥<strong>${res[i][j].price}</strong></p>
														</a>
													</div>
												</li>`;






								// console.log(htmlSmallBox);

								// alert(htmlSmallBox);

								// document.write(htmlSmallBox);



								// 下一次进去循环k之前清空
								htmlSlideLi = "";




							}//j！=0的括号


							// console.log(htmlSmallBox);
							
							// alert(htmlSmallBox);

							// htmlRight = htmlSmallBox;



							// j循环结束之前
							
							// htmlSmallBox = "";

						}//j循环括号


						// alert(htmlSmallBox);	//正确				









						html += `<div class="parts-panel public-panel-style public-parts-style" id="parts-panel">
										<div class="public-container">
											<h3 class="title">
												<a href="goodslist.html" class="more-btn">更多>></a>
												${res[i][0].type}
											</h3>
											
											<div class="product-wrap clearfloat">
												<div class="big-product-box">
													<a href="detailPage.html?id=${res[i][0].id}">
														<img src="${res[i][0].img1}" alt="">
														<div class="info-box">
															<h6 class="name"><span class="en">${res[i][0].nameEn}</span>  ${res[i][0].name}</h6>
															<p class="price">￥<strong>${res[i][0].price}</strong></p>
														</div>
													</a>
												</div>

												<div class="small-product-box">
													<ul class="small-product-list">

														${htmlSmallBox}
														

													</ul>
												</div>


											</div>
											
										</div>
									</div>`;



						htmlSmallBox = "";

						// console.log(htmlBigBox);

						// alert(html);

						// $("#goods-product").html(html);


						// console.log(html);
						// alert(html);

					}


					// console.log(html);

					//将内容输入到也页面

					$("#goods-product").html(html);


					//数据请求完毕后，动态dom节点已添加后，调用

					goodsSlideLeft();

					
				},
				error: function(msg){
					alert(msg);
				}
			})



	}


	//初始化ul的left值函数

	function goodsSlideLeft(){

		$(function(){

			var oSlideUl = $("#goods-product").find(".slide");

			// console.log(oSlideUl);
			
			// 遍历每Ul ，把里面li元素不等于1的left值变成 -200，让他显示第二张图片，第一张是用来过度切换的
			for(var i = 0; i < oSlideUl.size(); i++){

				var aSlideLi = oSlideUl.eq(i).find(".slide-item");
				// alert(aSlideLi.size());

				if(aSlideLi.size() != 1){

					//alert(aSlideLi.size())
					oSlideUl.eq(i).css("left", -200);

				}


			}




		});






	}








	return {
		goodsProdact: goodsProdact
	}

});