




$(function () {

    var $cartList = $("#cart-page .cart-list");
    var $allSum = $("#cart-page .all-sum");
    var $allNum = $("#cart-page .all-num");
    var userID = window.sessionStorage.getItem("userID") || window.localStorage.getItem("userID");
    var timer = null;


    $.getJSON("http://datainfo.duapp.com/shopdata/getCar.php?callback=?",{"userID":userID},function (data) {
        console.log(data);
        var  str = "";
        for(var i=0;i<data.length;i++){
            str+='<li class="cart-item" data-id="'+data[i].goodsID+'">' +
                    '<a class="fl" href="###"><img src="'+data[i].goodsListImg+'" /></a>' +
                    '<div class="fl item-info">' +
                        '<p class="p-name">'+data[i].goodsName+'</p>' +
                        '<p class="price">单价：<em>'+data[i].price+'</em></p>' +
                        '<div class="num-wrap">' +
                            '<a href="javascript:void (0);" class="num-btn minus">-</a>' +
                            '<input class="num-text" type="text" readonly value="'+data[i].number+'" />' +
                            '<a href="javascript:void (0);" class="num-btn plus">+</a>' +
                        '</div>' +
                    '</div>' +
                    ' <a  href="javascript:void (0);" class="fr delete">删除</a>' +
                '</li>'
        }

        $cartList.html(str);


        getSum()

    });



    $("#cart-page").on("click",".minus",function () {
        var $num = $(this).next();
        var num = parseInt($num.val())-1;
        $num.val(num<1?1:num);

        //获取总数量金额
        getSum()
    });
    $("#cart-page").on("click",".plus",function () {
        var $num = $(this).prev();
        var val = parseInt($num.val())+1;
        var oP = $(this).parents(".cart-item");
        var goodsID = oP.attr("data-id");
        $num.val(val);
        //获取总数量金额
        getSum();


        //需要做一个判断，如果点击停止再提交
        clearTimeout(timer);//先清除之前的提交事件
        //再延时执行本次的提交事件
        timer = setTimeout(function () {
            submitNum(goodsID,val)
        },500);

    });
    $("#cart-page").on("click",".delete",function () {
        var oP =$(this).parents(".cart-item");
        var goodsID = oP.attr("data-id");
        oP.remove();

        $.get("http://datainfo.duapp.com/shopdata/updatecar.php",{"userID":userID,"goodsID":goodsID,"number":0});
        //userID=wangzhengfeng&goodsID=5&number=2
    });
    
    
    function submitNum(goodsID,num) {
        $.get("http://datainfo.duapp.com/shopdata/updatecar.php",{"userID":userID,"goodsID":goodsID,"number":num},function () {

        });
    }
    //获取总金额，和数量
    function getSum() {
        var allNum = 0;
        var allSum = 0;
        $(".cart-item").each(function () {
            var price = $(this).find(".price em").html();
            var num = parseInt($(this).find(".num-text").val());
            allNum+=num;
            allSum+=num*price;
        });
        $allSum.html(allSum);
        $allNum.html(allNum)
    }
});
