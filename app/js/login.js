

define(["zeptoQuery","fnBase"],function($,fnBase){



    var loginPage = {
        init:function () {
            var oUsername = $("#login-page .username");
            var oPassword = $("#login-page .password");
            var oLoginBtn = $("#login-page .red-btn");
            var oRemember = $("#login-page .remember");

            $("#chh").on("tap",function(){
                console.log(1)
            })

            //判断是否有中文
            oPassword.on("keyup",function(){
                $(this).val($(this).val().replace(/[\u4e00-\u9fa5]/g,''));
            });

            /*登录*/
            oLoginBtn.on("tap",function(){
                var name = oUsername.val();
                var passwrod = oPassword.val();
                console.log(name)
                console.log(passwrod)
                if(name.length<5){
                    /*用户名错误*/
                    alert("用户名格式不正确");
                    return;
                }

                if(passwrod.length<5){
                    /*密码错误*/
                    alert("请输入正确的密码")
                    return;
                }


                alert("验证通过");

                /*ajax请求*/
                //status=login&userID=sunhaiqing&password=123456
                $.get("http://datainfo.duapp.com/shopdata/userinfo.php",
                    {"status":"login","userID":name,"password":passwrod},function(data){
                        console.log(data)
                        if(data==2){
                            alert("用户名密码不相符")
                        }else if(data==0){
                            alert("用户名不存在")
                        }else {
                            /*判断是否要记住密码*/
                            if(oRemember.hasClass("selected")){
                                /*需要记住密码，下次自动登录*/
                                window.localStorage.setItem("userID",name)
                            }else {
                                window.localStorage.setItem("userID","");
                                window.sessionStorage.setItem("userID",name)
                            }
                            alert("登录成功");
                            window.location.hash = "list"
                        }
                    })


            });

            /*是否显示密码*/
            $("#login-page .select-wrap").on("tap",function(){

                $(this).toggleClass("selected");

                if($(this).hasClass("show-password")){

                    if($(this).hasClass("selected")){
                        //oPassword.prop("type","text")
                        oPassword.attr("type","text")
                    }else {
                        // oPassword.prop("type","password")
                        oPassword.attr("type","password")
                    }
                }
            })
        },
        clear:function () {
            console.log("登录页面清除")
        }
    };
    return loginPage
});
//m1 == (Zepto==$)  //通过一个形参接受exports暴露出来的对象

