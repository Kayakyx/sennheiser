define(["jquery","jquery-cookie"],function($){
	console.log("cartRemind.js加载成功");


	//获取列表页传来的id  (作用域大点，其他函数也要用)
	var index = location.search.indexOf("id=");
	// alert(location.search);
	// alert(index);
	
	// alert(typeof id);
	index += 3;

	var id =Number(location.search.slice(index));
	// alert(id);



	function cartRemind(){

		$(function(){

			//获取cookie
			var cookieStr = $.cookie("goods");
			var goodsNum = 0;
			//cookie存在，遍历数组，找到对应id商品的数量(不存在数量为0)
			if(cookieStr){
				//转成数组
				var cookieArr = eval(cookieStr);

				for(var i = 0; i < cookieArr.length; i++){
					if(cookieArr[i].id == id){
						goodsNum = cookieArr[i].num;
					}
				}

			}

			$("#goodsNum").html(goodsNum);

			//设置  查看商品详情  按钮 请求的详情页面链接（把商品id传到detailPage.html）	

			$("#go-detail").attr("href", `detailPage.html?id=${id}`);


		});






	}

	return {
		cartRemind: cartRemind
	}

});