define(["jquery"],function($){
	function productSlide(){
		console.log("productSlide.js加载");

		$(function(){

			var thisUl = null;	// 用来拿到当前按钮对应的ul

			var aLis = null;	//用来记录li的个数

			var timer = null;



			// 事件委托移入/移出事件（显示或隐藏切换箭头）

			$("#goods-product").on("mouseenter", ".small-product-list>.item", function(){

				var aLi = $(this).find(".slide-viewport .slide .slide-item");

				// console.log(aLis);

				// alert(aLi.size());

				//如果只有一个li（一张图片在一个li里），不显示左右切换按钮。
				
				if(aLi.size() > 1){
				// 	// 拿到当前按钮对应的ul,并设置显示
					$(this).find(".prev-btn, .next-btn").css("display", "block");
				}





			}).on("mouseleave", ".small-product-list>.item" , function(){

				$(this).find(".prev-btn, .next-btn").css("display", "none");
			});			








			// 事件委托点击事件
			$("#goods-product").on("click", ".prev-btn", function(){
				// alert(1);
				// alert($(this));
				// console.log($(this).prev().html());

				// this.iNow++;
				// 拿到当前按钮对应的ul
				thisUl = $(this).prev().find(".slide");

				aLis = thisUl.find(".slide-item");


				tabUp(thisUl);

			});

			$("#goods-product").on("click", ".next-btn", function(){
				// alert(1);
				// alert($(this));
				// console.log($(this).prev().html());
				
				// 拿到当前按钮对应的ul
				thisUl = $(this).prev().prev().find(".slide");

				aLis = thisUl.find(".slide-item");


				tabDown(thisUl);

			});


/*			图片的放置位置

			最后一张
			第一张
			第二张
			。。。。

			最后一张
			第一张*/






			//点击切换图片(下一张函数)
			function tabDown(oUl){

				// alert(oUl.css("left"));
				//当前ul的left值
				var curLeft = parseInt(oUl.css("left"));

				// alert(curLeft);
				//计算下一张的Left值
				curLeft = curLeft - 200;

				//2、切换图片
				oUl.stop().animate({
					left: curLeft
				}, 500, function(){
					//判断是否到达最后一张图片，迅速切换到第二张
					if(curLeft - 200 == aLis.size() * -200){
						// alert("到最后一张了");

						//切回第二张（意义上的第一张）
						oUl.css("left", -200);

					}


				});
			}


			//点击切换图片(上一张函数)
			function tabUp(oUl){

				// alert(oUl.css("left"));
				//当前ul的left值
				var curLeft = parseInt(oUl.css("left"));

				// alert(curLeft);
				//计算下一张的Left值
				curLeft = curLeft + 200;

				//2、切换图片
				oUl.stop().animate({
					left: curLeft
				}, 500, function(){
					//判断是否到达第一张图片，迅速切换到倒数第二张
					if(curLeft == 0){
						// alert("到第一张了");

						// 计算当前运动ul显示倒数第二张的Left值
						var leftPenult = (aLis.size() - 2) * -200;
						//切回倒数第二张
						// oUl.css("left", -200);
						oUl.css("left", leftPenult); 
						

					}


				});
			}




		})


	}

	return {
		productSlide: productSlide
	}
});