
"use strict";
define(
    function (require)
    {
        var $ = require('jquery'),
            plugins = require('plugins'),
            mry = require('mryarbles'),
            Slider = require("./Slider"),
            Background = require("../Background"),
            DomEvent = require("../../events/DomEvent");


        var module = function(){
            console.log("HomeView");
            var slider = new Slider(".flexslider","header.main");
            var bg = new Background(["body","header.main"]);
            $("body").bind(DomEvent.RESIZE,mryarbles.delegate(this.onResize,this));
        };

        module.prototype.onResize = function(){
            console.log("HomeView.onResize");
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



        return module;
    }
);
