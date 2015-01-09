"use strict";
define(
    function (require)
    {

        var $ = require('jquery'),
            plugins = require('plugins'),
            mry = require('mryarbles'),
            Preloader = require("../../http/Preloader"),
            Slider = require("./Slider"),
            Background = require("../Background"),
            DomEvent = require("../../events/DomEvent"),
            PreloaderEvent = require("../../events/PreloaderEvent"),
            PageView = require("../PageView"),
            tweenmax = require("tweenmax");


        var module = function(options){
            console.log("HomeView");

            if(options === undefined){
                options = {};
            }

            PageView.call(this,options);
            var slider = new Slider(".flexslider","header.main");
            var bg = new Background(["body","header.main"]);
            $("body").bind(PreloaderEvent.COMPLETE, mryarbles.delegate(this.onPreloadComplete,this));
            var preloader = new Preloader();
        };

        mryarbles.extend(module,PageView);

        module.prototype.onPreloadComplete = function(){
            console.log("HomeView.onPreloadComplete");
            this.openPage();
        }

        module.prototype.onImageLoaded = function(e){
            console.log("HomeView.onImageLoaded");
            console.dir(e);
        }

        module.prototype.onResize = function(){
            //console.log("HomeView.onResize");
            module.parent.onResize();
            var slider = $(".flexslider");
            var header = $("header.main");
            var h = $(window).height() - header.height(),
                minH = 500;

            if(h < minH) {
                h = minH;
            }

            slider.height(h);
            slider.find(".slides li").height(h);
        }

        module.prototype.openPage = function(){
            console.log("HomeView.openPage");
            module.parent.openPage();
            //TweenLite.to($(this.options.container),2, {marginTop:0,opacity:1});
            $(this.options.container).find(".home-content").removeClass("closed");
        }

        return module;
    }
);
