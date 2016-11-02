

define(["zeptoQuery","iscroll","fnBase"],function($,Scr,fnBase){


    var cartPage = {
        init:function () {

            var userID = window.sessionStorage.getItem("userID") || window.localStorage.getItem("userID");
            alert("用户id是："+userID);
            if(userID==null){
                window.location.hash = "login"
            }

        },
        clear:function () {
            alert("cart clear")
        }
    };

    return cartPage
    /*获取数据*/
   /*
    var myScroll = new  Scr("#cart-scroll",{
        scrollbars:true,/!*显示滚动条*!/
        shrinkScrollbars: 'scale',/!*弹性滚动条*!/
        fadeScrollbars: true,/!*自动隐藏*!/
        click:true
    });
    var oCartList = $("#cart-page .cart-list");
    var oTitNum = $("#cart-page .tit-num");
    var oTitSum = $("#cart-page .tit-sum");
    var timer = null;
    var cartPage ={
        init:function(){
            this.getData();
            this.bindEvent();
        },
        getData:function(){
            var that = this;
            $.get("http://datainfo.duapp.com/shopdata/getCar.php?callback=?",
                {"userID":fnBase.getUserId()},function(data){
                    console.log(data);

                    var str = "";
                    for(var i=0; i<data.length;i++){

                        str+='<li class="item" data-id="'+data[i].goodsID+'">' +
                                '<img src="'+data[i].goodsListImg+'"/>' +
                                '<div class="item-cont">' +
                                    '<p class="item-name ovfl-ellipsis2">'+data[i].goodsName+'</p>' +
                                    '<p class="item-price">￥'+data[i].price+'</p>' +
                                    '<div class="calc-num" >' +
                                        '<span>数量：</span>' +
                                        '<button class="button min"   >-</button>' +
                                        ' <input  type="text" class="item-num" value="'+data[i].number+'" readonly />' +
                                        '<button class="button plus">+</button>' +
                                    '</div>' +
                                '</div>' +
                                '<button class="item-delete iconfont">&#xe68d;</button>' +
                            '</li>'
                    }

                    oCartList.html(str);
                    that.upDate();
                    myScroll.refresh();
                })
        },
        upDate:function(){
            var  num = 0;
            var  sum = 0;
            oCartList.find(".item").each(function(){
                var itemNum = parseInt($(this).find(".item-num").val());
                var price = $(this).find(".item-price").html();

                var itemPrice = fnBase.accMul(itemNum,price.substring(1));

                num+=itemNum;
                sum = fnBase.accAdd(sum,itemPrice);
            });
            oTitNum.html("商品数量："+num);
            oTitSum.html("总金额（不含运费）：￥"+sum)

        },
        bindEvent:function(){
            var that = this;
            function submitNumber(ID,num){

                that.upDate(); //页面更新数据
                //timer
                clearTimeout(timer);
                timer = setTimeout(function(){
                    that.submitData(ID,num);
                },600);
            }
            oCartList.on('tap',"button",function(){
                var oP = $(this).parents(".item"); /!*共同的 父级li*!/
                var ID = oP.attr('data-id'); /!*商品的id*!/
                var num = oP.find(".item-num"); /!*数量的input*!/
                var numVal = parseInt(num.val()); /!*数量*!/

                if($(this).hasClass("item-delete")){
                    //删除
                    that.submitData(ID,0,function(){
                        /!*在页面中通过动画删除*!/
                        fnBase.itemRemove(oP,myScroll.refresh.bind(myScroll));
                        that.upDate();
                        alert("删除成功")
                    });

                }else  if($(this).hasClass("min")){
                    //减
                    if(numVal<=1) return;
                    num.val(numVal-1);
                    submitNumber(ID,numVal-1)


                } if($(this).hasClass("plus")){
                    //加
                    num.val(numVal+1);
                    submitNumber(ID,numVal+1)

                }

            })

        },
        submitData:function(goodsID,number,callBack){
            //fnBase.getUserId()
            $.get("http://datainfo.duapp.com/shopdata/updatecar.php",
                {"userID":fnBase.getUserId(),"goodsID":goodsID,"number":number},
                function(data){
                if(data==1){
                    alert("更新成功")
                    callBack && callBack();

                }else {
                    alert("更新失败")
                }
            })
        }


    };

    /!*初始化*!/
    cartPage.init()*/

});