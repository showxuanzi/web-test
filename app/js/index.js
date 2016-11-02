/**
 * Created by hasee on 2016/10/19.
 */

/*
var module = (function(){
    var count = 0;
    var fn1 = function(){
        alert( count )
    };

    var fn2 = function(){
    };
    return {
        fn1: fn1,
        fn2: fn2
    }
})();

console.log(module.count);*/
//添加配置项
require.config({
    /*加载模块的别名*/
    paths:{
        "zepto":"lib/zepto.min",
        "iscroll":"lib/iscroll",
        "a":"a"
    },
    /*如果模块没有按照requirejs的规范定义，需要设置模块的出口*/
    shim:{
        "zepto":{
            exports:"Zepto"
        },
        "iscroll":{
            exports:"IScroll"
        },
        "a":{
            exports:"obj1"
        }
    }
});

/*加载依赖*/
require(["zepto","iscroll","a"],function ($,iScr,a) {
    console.log(a);

    var myScroll = new iScr(".scroll-wrap");
    var $scrollWrap = $(".page .scroll-wrap");
    var canLoad = false; //用来判断是加载更多还是刷新页面
    var pageNum = 0;//页码
    var hasData = true; //是否还是数据，用来判断是否可以加载更多
    $scrollWrap.on("touchmove",function () {
        console.log(myScroll.maxScrollY)
        console.log(myScroll.y)
        if(myScroll.maxScrollY-myScroll.y>60){
            //拖动范围大于60
            canLoad =  1;
            //canLoad =true;
        }
        if(myScroll.y>60){
            canLoad =  2;

            $(".load-text").html("松开刷新");
            $(".load-icon").addClass("animat")

        }
        if(myScroll.y>0&&myScroll.y<60){
            $(".load-icon").css("transform","scale(1,"+myScroll.y/60+")");
        }

    });
    $scrollWrap.on("touchend",function () {
        //判断是不是该加载数据
        console.log(canLoad);
        if(canLoad==1){
            console.log("加载更多");
            addData(++pageNum)

        }else if(canLoad==2) {
            hasData = true; //刷新的时候，第一次是有数据的
            console.log("刷新");
            $(".load-text").html("下拉刷新");
            $(".load-icon").removeClass("animat").css("transform","scale(1,0.1)");
            pageNum = 0;//页码归0
            addData(0)
        }
        canLoad =false//加载完以后变成false
    });

//第一次请求数据
    addData(0);


    function addData(page) {
        if(!hasData) return;//如果没有数据，不再jsonp请求数据了

        $("#loading").show();//加载数据的时候显示oading

        $.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",{
            "classID":"1","pageCode":page,"linenumber":5
        },function (data) {

            if(data==0){
                hasData = false;
                console.log("不能再加载数据，没有数据了")
            }
            console.log(data);
            var str = "";//商品内容

            for(var i=0;i<data.length;i++){
                str+=' <li class="product-item">' +
                    '<a class="pic" href="###">' +
                    '<img src="'+data[i].goodsListImg+'" />' +
                    '</a>' +
                    '<p class="p-name">衬衫</p>' +
                    '<p class="other">' +
                    '<em class="price">￥120.00</em>' +
                    '<span class="seller-num">销量：1000</span>' +
                    '</p>' +
                    '</li>'
            }

            //如果page是0，可以认为是刷新，
            if(page==0){
                $(".product-list").html(str)
            }else {
                $(".product-list").html($(".product-list").html()+str)//被内容放在列表里面
            }

            $("#loading").hide();//数据加载完成隐藏loading
            myScroll.refresh() //等页面高度发生改变时，重新计算滚动区域
        });
    }

});
