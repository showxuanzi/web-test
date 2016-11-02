/**
 * Created by hasee on 2016/7/18.
 */
require.config({
    paths:{
        "zeptoQuery":"lib/zepto.min",
        "iscroll":"lib/iscroll",
        "swiper":"lib/swiper.min",
        "fnBase":"lib/fnBase"
    },
    shim:{
        "iscroll":{
            exports:"IScroll"
        },
        "zeptoQuery":{
            exports:"Zepto"
        },
        "swiper":{
            exports:"Swiper"
        }
    }
});
require(["router","fnBase","list","detail","login","cart"],
    function(router,fnBase,listPage,detailPage,loginPage,cartPage){
        /*自定义弹框*/
        //fnBase.myalert();
       // fnBase.loginedJump();
        /*把所有的页面js对象放在一个壳子里面*/

        $(document).on("click",".go-cart",function () {
            if(window.sessionStorage.getItem("userID")){
                window.location.hash = "cart"
            }else {
                window.alert=function (str) {
                    console.log(str)
                };
                alert("请先登录")
                setTimeout(function () {
                    window.location.hash = "login"
                },300)
            }


        });

        router.Manage = {
            listPage:listPage,
            detailPage:detailPage,
            loginPage:loginPage,
            cartPage:cartPage
        };


        router.state({
            url:"list",
            template:"template/list.html",
            ctrl:listPage
        }).state({
            url:"detail/:pid",
            template:"template/detail.html",
            ctrl:detailPage
        }).state({
            url:"login",
            template:"template/login.html",
            ctrl:loginPage
        }).state({
            url:"cart",
            template:"template/cart.html",
            ctrl:cartPage
        });

        router.defaultPage="list";
        router.init();


});