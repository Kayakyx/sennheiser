console.log("加载成功");

/*
	管理我们index.html引入的所有模块
*/
require.config({
	paths: {
		"jquery": "jquery-1.11.3",
		"jquery-cookie": "jquery.cookie",

		//抛物线函数，不遵从AMD
		// "index": "index",
		"nav" : "nav",
		"goodslist" : "goodslist",
		"clearing": "clearing"

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


require(['clearing'], function(clearing){


	// 顶部商品展示
	// goodslist.cartShow();

	clearing.clearing();

})