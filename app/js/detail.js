/**
 * Created by hasee on 2016/7/14.
 */

define(["zeptoQuery","swiper"],function($,Swiper){




    var mySwiper;
    var detailPage = {
        init:function () {

            var hash  = window.location.hash;
            var goodsID = hash.split("/")[1];
            window.$ =window.Zepto = $;

            $.get("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",{"goodsID":goodsID},function(data){
                var aImg = JSON.parse(data[0].imgsUrl);

                var str = "";
                for(var i=0; i<aImg.length;i++){
                    str+='<div class="swiper-slide"><img src="'+aImg[i]+'" /></div>'
                }


                $("#detail-page .swiper-wrapper").html(str);
                mySwiper = new Swiper('.swiper-container', {
                    pagination: '.self-pagination',
                    slidesPerView: '3',
                    loop:true
                });
            });

            $("#detail-page .add-cart").on("tap",function(){
                $.get("http://datainfo.duapp.com/shopdata/updatecar.php"
                    ,{userID:fnBase.getUserId(),goodsID:goodsID,number:1},
                    function(data){
                        if(data==1){
                            alert("添加成功")
                        }

                    })
            })
        },
        clear:function () {
            mySwiper.destroy();
            console.log("清除")
        }
    };
    return  detailPage
});


