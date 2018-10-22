define(["jquery","jquery-cookie"],function($){
	console.log("clearing.js加载完成");


	function clearing(){

		// alert("执行clearing");

		$(function(){

			// alertAuto("弹窗测试");



			var cookieStr = $.cookie("goods");


			//判断cookie是否存在
			if(cookieStr){
				// alert("有商品");

				//调用加载购物车函数
				cartReload();


			}else{//不存在
				alertAuto("空空如也,3s后返回商品页");

				var timer = setTimeout(function(){
					window.location.href = "goodslist.html";
					clearTimeout(timer);
				},3000);
			}

			//数量加减功能，通过事件委托
			//数量增
			$("#tb").on("click",".add-product",function(){
				// alert("点击执行了");
				//找到对应input,并获取其值
				var inputVal = $(this).next().val();
				//获取商品id
				var oTr = $(this).parents("tr");
				var productID = oTr.attr("id");
				// alert(productID);
				inputVal++
				$(this).next().val(inputVal);

				//本商品单价
				
				var unitPri = $(this).parents("td").prev().html();
				// alert(unitPri);
				// 本商品总价
				var gross = parseInt(unitPri) * inputVal;

				//输出到页面本商品总价位置
				$(this).parents("td").next().html(gross);


				//调用重设cookie
				setCookie(productID, inputVal);

				//刷新购物车
				// cartReload();

				//计算全部商品价格的函数
				// computeTotal();

  				//复选框为为选中状态，不计算cookie内全部商品总价。
  				var oLabel = $(this).parents("tr").find("td:first-child label");
  				// console.log(oLabel);
  				// 判断是否是选中状态，是调用计算全部商品价格的函数
				if(oLabel.hasClass("check")){
					// computeTotal();
					//更改内容
					//获取选中商品的id
					var idArr = checkedID();
					// alert(idArr);
					//调用计算选中商品价格的函数
					reloadTotal(idArr);


				}

				

			});	
			//数量减
			$("#tb").on("click",".cut-product",function(){
				// alert("点击执行了");
				//找到对应input,并获取其值
				var inputVal = $(this).prev().val();
				//获取商品id
				var oTr = $(this).parents("tr");
				var productID = oTr.attr("id");

				inputVal--
				if(inputVal == 0){
					//通过自定义弹窗弹窗警告
					alertAuto("你确定删除吗？");
					
					//调用商品删除函数。传入要删除商品的id
					deleteProduct(productID);	

				}else{
					$(this).prev().val(inputVal);

					//本商品单价
					
					var unitPri = $(this).parents("td").prev().html();
					// alert(unitPri);
					// 本商品总价
					var gross = parseInt(unitPri) * inputVal;

					//输出到页面本商品总价位置
					$(this).parents("td").next().html(gross);





					//调用重设cookie
					setCookie(productID, inputVal);	



	  				//复选框为为选中状态，不计算cookie内全部商品总价。
	  				var oLabel = $(this).parents("tr").find("td:first-child label");
	  				// console.log(oLabel);
	  				// 判断是否是选中状态，是调用计算全部商品价格的函数
					if(oLabel.hasClass("check")){
						//计算全部商品价格的函数	

						// computeTotal();

						//获取选中商品的id
						var idArr = checkedID();
						// alert(idArr);
						//调用计算选中商品价格的函数
						reloadTotal(idArr);




					}


					

				}

			

			});	


			//商品删除  
			
			$("#tb").on("click",".delete",function(){
				// alert("点删除了");
				//获取要删除的商品ID
				var oTr = $(this).parents("tr");
				var productID = oTr.attr("id");
				// alert(productID);
				//调用自定义弹窗
				alertAuto("确定删除吗？");

				//调用商品删除函数。传入要删除商品的id
				deleteProduct(productID);


				
			});

			//清空购物车   按钮  事件

			$("#clear-all").click(function(){
				alertAuto("确定要清空购物车吗？");
				


				//判断弹窗点的 确定还是 删除
				//自定义弹窗添加点击事件
				//自定义弹窗 确认 与 取消
				
				$("#alert .alert-btn-a").unbind();//清除历史点击事件。
				//添加本次点击事件
				$("#alert .alert-btn-a").click(function(){

					$(".alert-bg").css("display", "none");		
					$("#alert").css("display", "none");	
					//恢复弹窗初始宽度，方便下次计算
					$("#alert").css("min-width",200);

					//获取点击按钮的id（为yes或no）判断点的 确认还是取消

					var alertID = this.id;

					if(alertID == "yes"){
						//删除cookie,既重设cookie过期时间为-1
						
						$.cookie("goods","",{
							expires: -1
						});

						// 刷新页面

						location.reload();

					};

				});











		

			});



			//确认结算 按钮点击事件
			
			$("#sure-btn").click(function(){

				alertAuto("网站维护中,尽请期待(⊙o⊙)哦！");

			});

			//批量删除 按钮 事件
			$("#batch-remove").click(function(){
				// alert("点击批量删除了");
				alertAuto("确定要从购物车删除吗？");
				//调用获取被选商品id的函数
				
				var idArr = checkedID();
				// alert(idArr);
				//调用批量删除函数
				batchRemove(idArr);




			});		






			//重设cookie函数

			function setCookie(id, num){
				// alert("执行了");
				var cookieStr = $.cookie("goods");
				var arr = eval(cookieStr);

				for(var i = 0; i < arr.length; i++){
					if(arr[i].id == id){
						// alert(arr[i].num);
						arr[i].num = num;
						// alert(arr[i].num);
						break;
					}
				}

				$.cookie("goods",JSON.stringify(arr),{
					//七天后过期
					expires: 7,
					//不编码
					raw: true
				});

			}


			// function deleteProduct(){

			// }








		});



		//购物车复选框点击事件
		//上边全选按钮		
		$("#checkAll01").click(function(){
			// alert("点击全选了");
			//获取复选框的class，class为label-check和check是，为选中状态，
			//为label-check是为未选中状态
			
			var claName = $(this).attr("class");
			// alert(claName);
			//判断是否选择状态
			if(claName == "label-check"){//如果为激活状态，变为为激活状态
				$(this).addClass("check");
				$("#checkAll02").addClass("check");
				//操作除了第一个tr后的td内label
				$("#tb tr").not("#first-tr").find("label").addClass("check");
				//重建购物车
				cartReload()				

			}else{
				$(this).removeClass("check");	
				$("#checkAll02").removeClass("check");
				$("#tb tr").not("#first-tr").find("label").removeClass("check");

				//商品总金额
				
				$("#PriceCount").html(0);

				$("#Price").html(0);



			}

		});
		//下边全选按钮
		
		$("#checkAll02").click(function(){
			// alert("点击全选了");
			//获取复选框的class，class为label-check和check是，为选中状态，
			//为label-check是为未选中状态
			
			var claName = $(this).attr("class");
			// alert(claName);
			//判断是否选择状态
			if(claName == "label-check"){//如果为激活状态，变为为激活状态
				$(this).addClass("check");
				$("#checkAll01").addClass("check");
				//操作除了第一个tr后的td内label
				$("#tb tr").not("#first-tr").find("label").addClass("check");

				// 重建购物车
				cartReload()				


			}else{
				$(this).removeClass("check");	
				$("#checkAll01").removeClass("check");
				$("#tb tr").not("#first-tr").find("label").removeClass("check");
				//商品总金额
				
				$("#PriceCount").html(0);

				$("#Price").html(0);

			}

		});


		//商品列表内 复选框
		//利用事件委托添加，动条添加的,除了第一个tr下边的label
		$("#tb").on("click", "tr:not(:first-child) label", function(){
			// alert("点击商品内复选框了");

			var claName = $(this).attr("class");
			if(claName == "label-check"){
				$(this).addClass("check");
				//调用获取商品id函数，并拿到返回值
				var idArr = checkedID();
				// alert(idArr);
				// console.log(idArr);
				
				//调用计算选中商品价格的函数
				reloadTotal(idArr);			



			}else{
				$(this).removeClass("check");

				//全选按钮关闭激活状态
				$("#checkAll01,#checkAll02").removeClass("check");

				// checkedID();
				var idArr = checkedID();
				// alert(idArr);	
				//调用计算选中商品价格的函数
				reloadTotal(idArr);							
			}
			
		});


		//获取所有选中商品的id
		function checkedID (){
			//用来存被选中商品id的数组
			var idArr = [];
			var aLabels =  $("#tb tr").not("#first-tr").find("label");

			//遍历
			for(var i = 0; i < aLabels.size(); i++){
				// alert(i);
				// alert(aLabels.eq(i).hasClass("check"));
				//判断商品是否被选中
				var isCheck = aLabels.eq(i).hasClass("check")
				if(isCheck){
					//找到被选中商品的id
					var id = aLabels.eq(i).parents("tr").attr("id");
					// alert(id);
					// alert(typeof id);
					idArr.push(id);
					
				}
			};

			// console.log(idArr);
			//返回具有选中商品id的数组
			return idArr;

		}

		//重新计算购物车内所有被选中商品总价函数(传入要计算的商品id数组)
		function reloadTotal(goodsArr){
			// alert("执行reloadTotal");
			var sumPrice = 0; //用来记录被选中商品的最终总价
			// 遍历数组	
			for(var i = 0; i < goodsArr.length; i++){
				// alert("执行goodsArr循环");


				var aTrs = $("#tb tr");
				for(var j = 0; j < aTrs.size(); j++){
					// alert("执行aTrs循环");

					//判断是否是被选中商品 对应 的 tr表行
					if(aTrs.eq(j).attr("id") == goodsArr[i]){
						//找到后，找到这个商品再页面中显示的总价格
						var aPrice = aTrs.eq(j).find(".a-price").html();
						// alert(aPrice);
						// alert(typeof aPrice);
						sumPrice += parseInt(aPrice);

						break;//跳出本次循环（内层）
						
					}

				}

			}

			// alert(sumPrice);	
			$("#PriceCount").html(sumPrice);
			$("#Price").html(sumPrice);



		}








	}

	//请求(或重新)购物车数据。
	function cartReload(){
		// alert("调用没");
		//获取cookie
		var cookieStr = $.cookie("goods");
		// 转成数据结构
		var cookieArr = eval(cookieStr);
		var cartHtml = "";//存储动态添加的html


		$.ajax({
			//请求有商品详情的json数据
			url: "data/goodslist.json",
			type: "get",
			success: function(res){

				var sumTotal = 0;//最终总价
				for(var i = 0; i < cookieArr.length; i++){
					// alert(cookieArr.length);

					//价格字符串处理成数字 （原格式为 ￥899.00）
					var price = res[cookieArr[i].id].price;
					// alert(price);
					var priNum = parseInt(price.substring(1));
					// alert(priNum);
					// 计算本商品的总价 单价*数量
					var total = priNum * cookieArr[i].num;

					sumTotal += total;

					// alert(total);


					cartHtml += `<tr id="${res[cookieArr[i].id].id}">
		                    		<td > 
		                    			<label class="label-check check" name="check"><i class="icon-check"></i></label>
		                    		</td>  
		                    		<td> 
		                    			<div class="cart-table-product ">  
		                    				<div class="cart-table-img">
		                    					<a href="detailPage.html?id=${res[cookieArr[i].id].id}">
		                    						<img src="${res[cookieArr[i].id].img}">
		                    					</a>   
		                    				</div>
		                    				<div class="cart-table-name">
		                    					<a href="detailPage.html?id=${res[cookieArr[i].id].id}">${res[cookieArr[i].id].name}</a>
		                    				</div>
		                    			</div>
		                    		</td>
			                    	<td class="price">${priNum}</td>
			                    	<td>
			                    		<div class="cart-table-number">

			                    			<span class="add-product">+</span>
			                    			<input value="${cookieArr[i].num}" disabled="disabled" type="text">
			                    			<span class="cut-product">-</span>
			                    			
			                    		</div>
			                    	</td>   
			                    	<td class="a-price">${total}</td> 
			                    	<td class="point">0</td> 
			                    	<td>
			                    		<a class="delete" href="javascript:void(0);" name="${res[cookieArr[i].id].id}"><i class="icon-delete"></i>删除</a>
			                    	</td>   
		                    	</tr>`;


				}

				//插入前先清除原有的节点对象。(清空所有的第一tr后所有的同级元素)
				
				$("#first-tr").nextAll().remove();


		        //插入到tbody的最后
				
				$("#tb").append(cartHtml);
				//商品总金额
				
				$("#PriceCount").html(sumTotal);

				$("#Price").html(sumTotal);


			},
			error: function(msg){
				alert(msg);
			}



		});


	}


	//计算cookie内商品总价格

	function computeTotal(){

		//获取cookie
		var cookieStr = $.cookie("goods");
		// 转成数据结构
		var cookieArr = eval(cookieStr);

		$.ajax({
			//请求有商品详情的json数据
			url: "data/goodslist.json",
			type: "get",
			success: function(res){



				var sumTotal = 0;//最终总价
				for(var i = 0; i < cookieArr.length; i++){
					// alert(cookieArr.length);

					//价格字符串处理成数字 （原格式为 ￥899.00）
					var price = res[cookieArr[i].id].price;
					// alert(price);
					var priNum = parseInt(price.substring(1));
					// alert(priNum);
					// 计算本商品的总价 单价*数量
					var total = priNum * cookieArr[i].num;

					sumTotal += total;
				}


				//商品总金额
				
				$("#PriceCount").html(sumTotal);

				$("#Price").html(sumTotal);




			},
			error: function(msg){
				alert(msg);
			}			
		});
	}












	//商品删除函数(传入商品的id即可删除)
	function deleteProduct(productID){


		//判断弹窗点的 确定还是 删除
		//自定义弹窗添加点击事件
		//自定义弹窗 确认 与 取消
		
		$("#alert .alert-btn-a").unbind();//清除历史点击事件。
		//添加本次点击事件
		$("#alert .alert-btn-a").click(function(){

			$(".alert-bg").css("display", "none");		
			$("#alert").css("display", "none");	
			//恢复弹窗初始宽度，方便下次计算
			$("#alert").css("min-width",200);

			//把点击按钮的id（为yes或no）

			var alertID = this.id;

			// alert(alertID);

			if(alertID == "yes"){
				// alert("自定义弹窗点的--确定");

				var deleteIndex = null;//用来存要删除商品在cookie里存储的下标

				//获取cookie结构，并转换为数据结构
				var sc_arr = eval($.cookie("goods"));

				for(var i = 0; i < sc_arr.length; i++){
					if(productID == sc_arr[i].id){
						deleteIndex = i;
						break;//跳出循环
					}
				}

				// alert(deleteIndex);

				//删除对应下标位置的 cookie数组元素
				sc_arr.splice(deleteIndex, 1);


				//重设cookie(如果一个商品都没有了，没有必要存cookie了，直接删除goods)
				if(sc_arr.length == 0){//删除
					$.cookie("goods", JSON.stringify(sc_arr), {
						expires: -1,

					});

					//清空所有的第一tr后所有的同级元素,使页面不展示一个商品
					
					$("#first-tr").nextAll().remove();	

					

					var timer1 = setTimeout(function(){
						alertAuto("空空如也,3s后返回商品页");
						clearTimeout(timer1);
					},1000);							

					var timer2 = setTimeout(function(){
						window.location.href = "goodslist.html";
						clearTimeout(timer2);
					},3000);


				}else{//重设
					$.cookie("goods", JSON.stringify(sc_arr), {
						expires: 7,

						raw: true
					});

					//重设完毕后，重新加载购物车列表
					cartReload();
				}

				
			}



		});




	}



	//删除传入id数组的对应商品
	function batchRemove (IDArr){




		//判断弹窗点的 确定还是 删除
		//自定义弹窗添加点击事件
		//自定义弹窗 确认 与 取消
		
		$("#alert .alert-btn-a").unbind();//清除历史点击事件。
		//添加本次点击事件
		$("#alert .alert-btn-a").click(function(){

			$(".alert-bg").css("display", "none");		
			$("#alert").css("display", "none");	
			//恢复弹窗初始宽度，方便下次计算
			$("#alert").css("min-width",200);

			//把点击按钮的id（为yes或no）

			var alertID = this.id;

			// alert(alertID);

			if(alertID == "yes"){
				// alert("自定义弹窗点的--确定");

				for(var k = 0; k < IDArr.length; k++){





					var deleteIndex = null;//用来存要删除商品在cookie里存储的下标

					//获取cookie结构，并转换为数据结构
					var sc_arr = eval($.cookie("goods"));

					for(var i = 0; i < sc_arr.length; i++){
						if(IDArr[k] == sc_arr[i].id){
							deleteIndex = i;
							break;//跳出循环
						}
					}

					// alert(deleteIndex);

					//删除对应下标位置的 cookie数组元素
					sc_arr.splice(deleteIndex, 1);


					//重设cookie(如果一个商品都没有了，没有必要存cookie了，直接删除goods)
					if(sc_arr.length == 0){//删除
						$.cookie("goods", JSON.stringify(sc_arr), {
							expires: -1,

						});

						//清空所有的第一tr后所有的同级元素,使页面不展示一个商品
						
						$("#first-tr").nextAll().remove();	

						

						var timer1 = setTimeout(function(){
							alertAuto("空空如也,3s后返回商品页");
							clearTimeout(timer1);
						},1000);							

						var timer2 = setTimeout(function(){
							window.location.href = "goodslist.html";
							clearTimeout(timer2);
						},3000);


					}else{//重设
						$.cookie("goods", JSON.stringify(sc_arr), {
							expires: 7,

							raw: true
						});

						//重设完毕后，重新加载购物车列表
						cartReload();
					}

















				}

				
			}



		});










	}









	// var alertID = null;

	//弹窗函数(自适应宽度)
	function alertAuto(str){


		// alert("调用了");
		//获取默认宽度
		var txtWidth =parseInt($("#alert .txt").css("min-width"));
		// alert(txtWidth);

		//设置文本内容
		 $("#alert .txt").html(str);

		//显示弹窗
		$(".alert-bg").css("display", "block");
		
		$("#alert").css("display", "block");

		//计算新宽度（display为 none的时候，获取不到元素的宽度，所以显示再设置宽度）				 
		 var newTxtWidth = $("#alert .txt").width();
		 // alert(newTxtWidth);
		//变化量
		var change = newTxtWidth - txtWidth;	

		// alert(change);	

		// 把变化量添加给父元素（弹窗总宽度）

		var alertWidth = parseInt($("#alert").css("width")) + change;			

		// alert(alertWidth);

		//弹窗的宽度随内容的增加而增宽
		// alert($("#alert"));
		// 重设宽度
		$("#alert").css("min-width",alertWidth);


		//弹窗关闭事件
		//点击右上角X隐藏
		$("#alert .close").click(function(){
			// alert(1);
			$(".alert-bg").css("display", "none");		
			$("#alert").css("display", "none");	
			//恢复弹窗初始宽度，方便下次计算
			$("#alert").css("min-width",200);

		});

		//确定关闭
		$("#alert .alert-btn-a").click(function(){
			$(".alert-bg").css("display", "none");		
			$("#alert").css("display", "none");	
			//恢复弹窗初始宽度，方便下次计算
			$("#alert").css("min-width",200);
		});




	}


	//




















	return {
		clearing : clearing
	}


});