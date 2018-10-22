console.log("加载成功");

/*
	管理我们index.html引入的所有模块
*/
require.config({
	paths: {
		"jquery": "jquery-1.11.3",
		"jquery-cookie": "jquery.cookie",

		//抛物线函数，不遵从AMD
		"parabola": "parabola",
		"index": "index",
		"slide": "slide",
		"hot" : "hot",
		"new_new" : "new",
		"productSlide" : "productSlide",
		"nav" : "nav",
		"goodsProdact" : "goodsProdact",
		"goodslist" : "goodslist"
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


require(['index', 'slide' , "hot" , "new_new", "productSlide" , "nav" , "goodsProdact", "goodslist"], function(index, slide, hot, new_new, productSlide, nav, goodsProdact, goodslist){
	// index.main();
	slide.slide();

	hot.hotData();

	new_new.newData();

	productSlide.productSlide();

	index.newsList();


	nav.navData();

	goodsProdact.goodsProdact();

	//展示顶部购物车
	goodslist.goodslist();


})