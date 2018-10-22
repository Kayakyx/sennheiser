console.log("加载成功");

/*
	管理我们index.html引入的所有模块
*/
require.config({
	paths: {
		"jquery": "jquery-1.11.3",
		"jquery-cookie": "jquery.cookie",

		//抛物线函数，不遵从AMD
		"index": "index",
		"nav" : "nav",
		"detail" : "detail",

	},
	//设置模块之间的依赖关系
	shim: {
		"jquery-cookie": ["jquery"],
		// "slide": ["index"],
		/*
			定义不遵从AMD规范的js文件
		*/
		"parabola": {
			exports: "_"
		}
	}
})


require(['index', "nav" ,"detail" ,"goodslist"], function(index, nav ,detail, goodslist){

	index.newsList();

	nav.navData();
	//详情页获取数据
	detail.detailData();

	//放大镜效果
	detail.zoom();
	detail.zoomImgTab();

	//详情页加入购物车
	detail.addCart();

	//设置 加入购物车 按钮的链接

	detail.setAhref();

	//顶部购物车
	goodslist.goodslist();

})