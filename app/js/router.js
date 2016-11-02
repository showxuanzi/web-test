/**
 * Created by hasee on 2016/7/18.
 */

define(["zeptoQuery"],
    function($){

        var router = {
            defaultPage:"list",
            cache:[],
            viewWrap :$("#view"),
            stateStore:[],
            state:function(option){
                this.stateStore.push(option);
                return this
            },
            getSearch:function(){
                return window.location.hash.split("/")[1];
            },
            changeView:function(page,bDefault){
                var that = this;
                var newPage = that.viewWrap.find(".view-page").not(".view-now");
                var nowPage = that.viewWrap.find(".view-now");
                var len = this.cache.length;
                console.log(newPage)
                if(bDefault){
                    $.get(page.template,function(data){
                        nowPage.html(data);
                        //清除上一个页面里面的内容
                        len && that.cache[len-1].ctrl.clear();
                        //当前页面里面内容的初始化方法
                        page.ctrl.init();
                    })
                }else {
                    $.get(page.template,function(data){
                        nowPage.html(data);
                        len && that.cache[len-1].ctrl.clear();
                        page.ctrl.init();
                    })
                }
                this.cache.push(page)
            },
            stateWatch:function(){
                var that = this;

                /*当页面刷新的时候获取当前的hash*/
                var nowHash = window.location.hash.replace("#","");
                // var defaultPage = false;
                for(var i =0;i<this.stateStore.length;i++){
                    if(this.stateStore[i].url ===nowHash){
                        this.changeView(this.stateStore[i])
                        return
                    }else if(nowHash.indexOf("/")) {
                        var url = nowHash.split("/")[0];
                        if(this.stateStore[i].url.split("/")[0]===url){
                            this.changeView(this.stateStore[i])
                            return
                        }

                    }
                }
                this.changeView(this.defaultPage,true);


                /*  $(window).on("hashchange",function(){
                 /!*获取当前的hash*!/
                 /!*第一个加载页面的时候，会触发一次不正常的hashchange*!/
                 if(firstLoad){
                 /!*这个时候，不做页面切换*!/
                 firstLoad = false;
                 return;
                 }
                 var newHash = window.location.hash;

                 /!*获取当前页面和新的页面*!/
                 var oldPage = $(".page-show");//老页面
                 var pageShadow = oldPage.find(".page-shadow");//老页面里面的阴影
                 var newPage = $(newHash+"-page");//新页面

                 /!*动画准备工作*!/
                 oldPage.css({
                 "zIndex":2
                 });
                 pageShadow.css({
                 "display":"block"
                 });
                 newPage.css({
                 "left":"100%",
                 "display":"block",
                 "zIndex":3
                 });

                 /!* css过渡有bug， "display":"block"以后立即执行过渡，有时候会没有过渡的效果*!/
                 setTimeout(function(){{
                 newPage.animate({"left":0},400,"ease",function(){
                 //动画回调
                 newPage.addClass("page-show");
                 that.Manage[newHash.substring(1)+"Page"].init();
                 });
                 pageShadow.animate({opacity:1},400,"ease");
                 oldPage.animate({"left":"-100%"},500,"ease",function(){
                 //动画回调
                 that.Manage[nowHash.substring(1)+"Page"].clear();
                 nowHash = newHash;

                 oldPage.removeClass("page-show");
                 pageShadow.css({
                 "display":"none",
                 "opacity":"0"
                 });
                 })
                 }},50)


                 });*/
            },
            init:function(){
                var that = this;
                this.viewWrap.append('<div class="view-page view-now"><div class="page-shadow"></div></div><div class="view-page"><div class="page-shadow"></div></div><style> .page{display: block} #view, .view-page { position: absolute; top: 0; left: 0; bottom: 0; width: 100%;} .view-page{display: none} .view-now { display: block}</style>');

                for(var i =0;i<this.stateStore.length;i++) {
                    if (this.stateStore[i].url === this.defaultPage) {
                        this.defaultPage=this.stateStore[i]
                    }
                }

                that.stateWatch();
                $(window).on("hashchange",function(){
                    that.stateWatch()
                });


            }
        };



        return router
    });