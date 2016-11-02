require.config({
    paths:{
        "zepto":'lib/zepto.min'
    },
    shim:{
        'zepto':{
            exports:"Zepto"
        }
    }
});
//zepto == 'lib/zepto.min';
//zepto => (Zepto==$)  通过exports暴露出来的对象

require(["zepto"],function($){

    var userID = window.sessionStorage.getItem("userID")||window.localStorage.getItem("userID");
    if(!userID){
        alert("请先登录");
        window.location.href = "login.html"

    }else {

        $.get("http://datainfo.duapp.com/shopdata/getuser.php?callback=?",
            {"userID":userID},
            function(data){
                console.log(data)

            })
    }




});
//m1 == (Zepto==$)  //通过一个形参接受exports暴露出来的对象