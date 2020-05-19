// 进度条

var runner=function(num){
	var i=0;
	setRunner=setInterval(function(){
		i++;
		if(i<num){
			if(i<20){
				$(".progress-bar .runner").removeClass().addClass("runner colyb");
			}
			if(i<40 && i>20){
				$(".progress-bar .runner").removeClass().addClass("runner colzd");
			}
			if(i<60 && i>40){
				$(".progress-bar .runner").removeClass().addClass("runner collh");
			}
			if(i<80 && i>60){
				$(".progress-bar .runner").removeClass().addClass("runner colyx");
			}
			if(i>80){
				$(".progress-bar .runner").removeClass().addClass("runner coljh");
			}
			$(".progress-bar .runner").stop(false,false).css({
				width: i+"%",
			});
		}else{
			clearInterval(setRunner);//清除进度条定时器
		}
	},40);
}

// 柱状图
var histogram=function(num1,num2,num3,num4,num5){
	$(".histogram li:eq(0) em").stop(false,false).animate({
		height: num1+"%",
	},1000);
	$(".histogram li:eq(1) em").stop(false,false).animate({
		height: num2+"%",
	},1000);
	$(".histogram li:eq(2) em").stop(false,false).animate({
		height: num3+"%",
	},1000);
	$(".histogram li:eq(3) em").stop(false,false).animate({
		height: num4+"%",
	},1000);
	$(".histogram li:eq(4) em").stop(false,false).animate({
		height: num5+"%",
	},1000);
}
// 半圆图
var semicircle=function(){
	var rotate=180;
	rotateset=setInterval(function(){
		if(rotate<360){
			rotate++;
			$(".semicircle").css({
				transform: "rotate("+rotate+"deg)",
			});
		}else{
			$(".chart-semicircle-box .chart-title").animate({
				opacity: 1,
			},1000);
			clearInterval(rotateset);
		}
	},10);
}

$(document).ready(function(){
	$(".chart-semicircle .semicircle").each(function(){
		var semicircleWidth=$(this).width();
		$(this).height(semicircleWidth/2);
	});

	$(".client-list li").each(function(){
		if($(this).hasClass('cur')){
			var num=$(this).attr("num").split(",");
			var data=$(this).find('i').text();
			histogram(num[0],num[1],num[2],num[3],num[4]);//初始柱状图数据传入
			runner(data/10);//初始进度条数据传入
			semicircle();// 半圆触发
		}
	});

	// 模糊查询数据传入
	var emarray=[];
	$(".client-list li em").each(function() {
		var emText = $(this).text();
		emarray.splice(0,0,emText);
	});
	for(var i=0;i<emarray.length;i++){
		$(".sel-prompt").append(" <span>"+emarray[i]+"</span>");
	}

});
window.onresize = function(){
	$(".chart-semicircle .semicircle").each(function(){
		var semicircleWidth=$(this).width();
		$(this).height(semicircleWidth/2);
	});
}

// 点击切换数据
$(".client-list .list li").click(function(){
	var liIndex=$(this).addClass('cur').siblings('li').removeClass('cur');
	var data=$(this).find('i').text();
	var num=$(this).attr("num").split(",");
	$(".exponent em").text(data);
	// for(var i=0;i<5;i++){
	// 	histogram(num[i]);
	// }
	histogram(num[0],num[1],num[2],num[3],num[4]);
	clearInterval(rotateset);//清除半圆定时器
	clearInterval(setRunner);//清除进度条定时器
	semicircle();
	$(".chart-semicircle-box .chart-title").css("opacity",0);
	runner(data/10);
});

// 模糊查询
$(".search input").keyup(function(){
	$(".sel-prompt span").css('display', 'none');
	for (var i = 0; i < $(".sel-prompt span").length; i++) {  
        //模糊匹配，将所有匹配项显示  
		var spanText=$(".sel-prompt span").eq(i).html();
		var valueText=$(".search input").val();
		var patt1 = new RegExp(valueText);
        if (patt1.test(spanText)){
            $(".sel-prompt span").eq(i).css('display', 'block');  
        }
    } 

	if($(this).val()!=""){
		$(".sel-prompt").show();
	}else{
		$(".sel-prompt").hide();
	}
});

// 模糊查询点击
$(".sel-prompt").on("click","span",function(){
	var spanText=$(this).html();
	$(".search input").val(spanText);
	$(this).parents(".sel-prompt").hide();
	$(".client-list .list li em").each(function(){
		var listTextEm=$(this).html();
		var valueText=$(".search input").val();
		if(listTextEm==valueText){
			$this=$(this).parents("li");
			$this.addClass('cur').siblings('li').removeClass('cur');
			$this.click();
			var position=$this.position().top;
			$("mCSB_1_dragger_vertical").mCustomScrollbar("scrollTo",$this);
		}
	});
});
